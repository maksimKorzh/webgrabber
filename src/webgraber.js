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
  }
});

function onWindowLoad() {
  chrome.tabs.executeScript(null, {
    file: "scrape.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      $('#source').text('There was an error injecting script : \n' + chrome.runtime.lastError.message);
    }
  });

}

