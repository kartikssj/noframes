
export async function getBadge (tabId?: number): Promise<number> {
    return chrome.action.getBadgeText({tabId}).then((text) => {
        const count = parseInt(text);
        return isNaN(count) ? 0 : count;
    });
};

export async function setBadge (tabId: number, count: number): Promise<void> {
    return chrome.action.setBadgeText({tabId, text: count.toString()});
}
