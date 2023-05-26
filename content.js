(function() {
  function unselectCheckboxes() {
  // Get all the labels on the page
  var labels = document.querySelectorAll('label[for="follow-company-checkbox"]');

  // Loop through each label and find associated checkboxes
  labels.forEach(function(label) {
    var checkboxId = label.getAttribute('for');
    var checkbox = document.getElementById(checkboxId);

    // Unselect the checkbox if it exists
    if (checkbox) {
      checkbox.checked = false;
    }
  });
  }

  // Attach the unselectCheckboxes function to the click event of the document
  document.addEventListener('click', unselectCheckboxes);
})();