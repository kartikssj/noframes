
export interface Config {
    list: string[];
    isBlacklist: boolean;
}

export async function updateConfig (config: Config): Promise<void> {
  return chrome.storage.sync.set(config);
};

export async function getConfig (): Promise<Config> {
  return chrome.storage.sync.get(["list", "isBlacklist"]).then((data) => ({
    list: data.list || [],
    isBlacklist: data.isBlacklist || false,
  }));
};