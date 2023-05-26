chrome.commands.onCommand.addListener(function(command) {
  if (command === "extract_segment") {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: extractPosting
      });
    });
  }
});

function extractPosting() {
  var jobTitle = document.querySelector('h1.jobs-unified-top-card__job-title').textContent;
  var companyName = document.querySelector('span.jobs-unified-top-card__company-name').innerText
  var url = window.location.href.split("?").shift();


  var extractedText = [companyName, jobTitle, url].join("\t");

  console.log(extractedText);

  navigator.clipboard.writeText(extractedText)
    .then(function() {
      console.log("URL segment copied to clipboard.");
    })
    .catch(function(error) {
      console.error("Failed to copy URL segment to clipboard:", error);
    });
}
