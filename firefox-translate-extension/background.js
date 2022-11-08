const APPLICABLE_PROTOCOLS = ["http:", "https:"];
const TITLE_APPLY = "Contrast Translation";
/*
Execute Script
Update the page action's title and icon to reflect its state.
*/
function execSript(tab) {
  browser.tabs.executeScript({file: 'scripts/content.js'});
}

/*
Returns true only if the URL's protocol is in APPLICABLE_PROTOCOLS.
Argument url must be a valid URL string.
*/
function protocolIsApplicable(url) {
  const protocol = (new URL(url)).protocol;
  return APPLICABLE_PROTOCOLS.includes(protocol);
}

/*
Initialize the page action: set icon and title, then show.
Only operates on tabs whose URL's protocol is applicable.
*/
function initializePageAction(tab) {
  if (protocolIsApplicable(tab.url)) {
    browser.pageAction.setIcon({tabId: tab.id, path: "images/transfer.svg"});
    browser.pageAction.setTitle({tabId: tab.id, title: TITLE_APPLY});
    browser.pageAction.show(tab.id);
  }
}

/*
When first loaded, initialize the page action for all tabs.
*/
let gettingAllTabs = browser.tabs.query({});
gettingAllTabs.then((tabs) => {
  for (let tab of tabs) {
    initializePageAction(tab);
  }
});

/*
Each time a tab is updated, reset the page action for that tab.
*/
browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  initializePageAction(tab);
});

/*
execute script when the page action is clicked.
*/
browser.pageAction.onClicked.addListener(execSript);