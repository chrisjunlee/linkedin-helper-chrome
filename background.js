var opts = {
  'alertOnExtract': true,
  'alertOnExtractSize': '24px',
  'alertOnExtractDuration': 1,
}

chrome.commands.onCommand.addListener(function(command) {
  if (command === "extract_segment") {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: App
      }); 
    });
  }
});

const App = () => {
  function alertExtract(msg) {
    var alertElement = document.createElement("div")
    alertElement.style.fontSize = "1.5em"
    alertElement.style.fontFamily = "Monaco";
    alertElement.style.fontStyle = "normal";
    alertElement.style.fontWeight = "normal";
    alertElement.style.boxShadow = "0px 0px 16px 0px #CBCBCB";
    alertElement.style.border = "1px solid #D9D900";
    alertElement.style.zIndex = "100000001";
    alertElement.style.textAlign = "center";
    alertElement.style.color = "#444444";
    alertElement.style.backgroundColor = "#BEE5B0";
    alertElement.style.position = "fixed";
    alertElement.style.borderRadius = ".25em";
    alertElement.innerHTML = msg;
    alertElement.style.boxSizing = "content-box";
    alertElement.style.height = "2em";
    alertElement.style.lineHeight = "2em";
    alertElement.style.width = "fit-content";
    alertElement.style.padding = "0px";
    alertElement.style.margin = "0px";
    alertElement.style.top = "50px";
    alertElement.style.left = "50px";

    let notif = document.body.appendChild(alertElement);

    var duration = 3 * 1000;
    setTimeout(() => fade(notif, duration), 0)
  }

  function fade(el, speed) {
    var timer;
    if (el.style) {
      el.style.opacity = "1";
    }
    timer = setInterval(function () {
      el.style.opacity = parseFloat(el.style.opacity) - 0.02;
      if (el.style.opacity <= 0) {
        clearInterval(timer);
        document.body.removeChild(el);
      }
    }, speed);
  }

  function extractPosting() {
    let date = new Date()
    const dateString = date.toLocaleDateString('en-us', {month:'numeric', day:'2-digit', year: "2-digit"})

    var jobTitle = document.querySelector('h1.jobs-unified-top-card__job-title').textContent.trim()
    var companyName = document.querySelector('div.jobs-unified-top-card__primary-description a.app-aware-link').text
    var url = window.location.href.split("?").shift();

    var extractedText = [dateString, companyName, jobTitle, url].join('\t');

    console.log(companyName, jobTitle, url)

    navigator.clipboard.writeText(extractedText)
      .then(function() {
        console.log("URL segment copied:", extractedText)
        console.log('extractedText', extractedText)

        alertExtract(extractedText.replace(/\t/g, '&nbsp;'))
      })
      .catch(function(error) {
        console.error("Failed to copy URL segment to clipboard:", error);
      });
  }

  chrome.runtime.onMessage.addListener((msg) => {
    console.log(msg.text);
    });

    extractPosting()
}


