window.onload = onWindowLoad;

window.addEventListener('load', function load(event) {
  $('#copy').on('click', (event)=> {
    document.getElementById('source').select();
    document.execCommand('copy');
  });
});

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    $('#source').text(request.source);
    attempt++
  }
});

async function getTabId() {
  let queryOptions = { active: true, currentWindow: true };
  let tabs = await chrome.tabs.query(queryOptions);
  return tabs[0].id;
}

async function onWindowLoad() {
  var tabId = await getTabId()
  chrome.scripting.executeScript({
    target: {tabId: tabId, allFrames: true},
    files: ['scrape.js'],
  });
}
