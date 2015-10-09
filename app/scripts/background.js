'use strict';

// Enable chromereload by uncommenting this line:
// import './lib/livereload';

chrome.runtime.onInstalled.addListener(function(details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status !== 'loading') return

  chrome.tabs.executeScript(tabId, {
    file: 'scripts/content_script.js',
    runAt: 'document_end'
  }, function(res) {
    if (chrome.runtime.lastError || // don't continue if error (i.e. page isn't in permission list)
      res[0]) { // value of `injected` above: don't inject twice
      return;
    }
  })
})