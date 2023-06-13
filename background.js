var opts = {
  'alertOnExtract': true,
  'alertOnExtractSize': '16px',
  'alertOnExtractDuration': .8,
}

chrome.commands.onCommand.addListener(function(command) {
  if (command === "extract_segment") {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: extractPosting
      }); 
    });
  }
});

function extractPosting() {
  var jobTitle = document.querySelector('h1.jobs-unified-top-card__job-title').textContent.trim()
  var companyName = document.querySelector('span.jobs-unified-top-card__company-name').innerText.trim()
  var url = window.location.href.split("?").shift();

  var extractedText = [companyName, jobTitle, url].join('\t');

  console.log(companyName, jobTitle, url)

  navigator.clipboard.writeText(extractedText)
    .then(function() {
      console.log("URL segment copied:", extractedText)

      // alertExtract();
    })
    .catch(function(error) {
      console.error("Failed to copy URL segment to clipboard:", error);
    });
}

chrome.runtime.onMessage.addListener((msg) => {
  console.log(msg.text);
  });


function alertExtract() {
  var alertElement;

  if (opts.alertOnExtract) {
    alertElement =  document.createElement('div');
    alertElement.style.fontSize = opts.alertOnExtractSize;
    alertElement.style.fontFamily = 'Monaco';
    alertElement.style.fontStyle = 'normal';
    alertElement.style.fontWeight = 'normal';
    alertElement.style.boxShadow = '0px 0px 16px 0px #CBCBCB';
    alertElement.style.border = '1px solid #D9D900';
    alertElement.style.zIndex = '100000001';
    alertElement.style.textAlign = 'center';
    alertElement.style.color = '#444444';
    alertElement.style.backgroundColor = '#FFFF5C';
    alertElement.style.position = 'fixed';
    alertElement.style.borderRadius = '.25em';
    alertElement.innerHTML = "Auto Copied";
    alertElement.style.boxSizing = 'content-box';
    alertElement.style.height = '2em';
    alertElement.style.lineHeight = '2em';
    alertElement.style.width = '7em';
    alertElement.style.padding = '0px';
    alertElement.style.margin = '0px';
    alertElement.style.top = '50px';
    alertElement.style.left = '50px';
  }

  document.body.appendChild(alertElement);

  var duration = parseFloat(opts.alertOnExtractDuration) * 1000;
  console.log("Fade duration: " + duration);

  sleep(duration).then(() => {
    fade(el, 5);
  });
}

function fade(el, speed) {
  var timer;
  if (el.style) {
    el.style.opacity = '1';
  }
  timer = setInterval(function () {
    el.style.opacity = parseFloat(el.style.opacity) - .02;
    if (el.style.opacity <= 0) {
      clearInterval(timer);
      document.body.removeChild(el);
    }
  },
    speed);
}