import React, { useEffect, useRef, useState } from "react";
import "./Root.css";
import { getConfig, updateConfig } from "../services/config";
import { getBadge } from "../services/badge";

export const Root: React.FC = () => {
  const [list, setList] = useState<string[]>([]);
  const [isBlacklist, setIsBlacklist] = useState(false);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLInputElement>(null);
  const add = () => {
    if (ref.current && ref.current.value) {
      const updated = [...list, ref.current.value];
      setList(updated);
      updateConfig({list: updated, isBlacklist});
      ref.current.value = "";
    }
  };
  const toggle = () => {
    setIsBlacklist(!isBlacklist);
    updateConfig({list, isBlacklist: !isBlacklist});
  };
  const remove = (elem: string) => {
    const updated = list.filter((item) => item !== elem);
    setList(updated);
    updateConfig({list: updated, isBlacklist});
  };
  useEffect(() => {
    getConfig().then((data) => {
      if (data.list) {
        setList(data.list);
      }
      if (data.isBlacklist) {
        setIsBlacklist(data.isBlacklist);
      }
    });
    chrome.tabs.query({active: true, currentWindow: true}).then(tabs => {
      if (tabs[0]) {
        getBadge(tabs[0].id).then((count) => setCount(count));
      }
    });
  }, []);
  const msg = isBlacklist 
    ? "Iframes will be removed only from URLs matching these patterns." 
    : "Iframes will not be removed from URLs matching these patterns.";
  return (
    <div className="container">
      <div className="title">NoFrames</div>
      <div className="subtitle">Removed {count} iframes on this page.</div>
      <div className="whitelist">
        <div className="header">
          <div className="title">URL patterns</div>
          <div className="toggle" onClick={toggle}>
            {isBlacklist ? (
              <>
                <div className="label">Blacklist</div>
                <div className="icon" />
              </>
            ) : (
              <>
                <div className="icon" />
                <div className="label">Whitelist</div>
              </>
            )}
          </div>
        </div>
        <div className="subtitle">{msg}</div>
        {list.map((item, index) => (
          <div className="item-container" key={"" + index}>
            <div className="item">
              <div className="name">{item}</div>
              <div className="icon" onClick={() => remove(item)}>X</div>
            </div>
          </div>
        ))}
        <div className="footer">
          <input type="text" ref={ref} />
          <button onClick={add}>Add</button>
        </div>
      </div>
    </div>
  );
};
