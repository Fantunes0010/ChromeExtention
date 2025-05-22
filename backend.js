 const banned = "chatgpt.com";

chrome.webNavigation.onCommitted.addListener(details => {
    if (details.url.includes(banned)) {
        chrome.tabs.update(details.tabId, { url: chrome.runtime.getURL("index.html") });
    }
}, { url: [{schemes: ["http", "https"]}] });


async function getCurrTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);

    
    const url = tab.url;

    if (url.includes(banned)) {
        return {
            redirectUrl: chrome.runtime.getURL("index.html")
        };
    }

    return { url }; 
}





