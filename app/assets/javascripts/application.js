//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {
// script.js
document.addEventListener('DOMContentLoaded', function () {
  const searchButton = document.getElementById('searchButton');
  if (searchButton) {
    searchButton.addEventListener('click', handleSearch);
  }
});

function handleSearch() {
  const searchTerm = document.getElementById('search-cases').value.trim();
  const currentUrl = window.location.href;

  // Update the URL with the new search term
  const updatedUrl = updateQueryStringParameter(currentUrl, 'search', searchTerm);

  // Redirect to the updated URL
  window.location.href = updatedUrl;
}

function updateQueryStringParameter(uri, key, value) {
  const re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  const separator = uri.indexOf('?') !== -1 ? "&" : "?";

  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  } else {
    return uri + separator + key + "=" + value;
  }
}
})
