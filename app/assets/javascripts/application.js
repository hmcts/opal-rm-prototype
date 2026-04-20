//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

// Patch GOVUKPrototypeComponents.initAll so that every autocomplete element
// gets showAllValues enabled before accessible-autocomplete enhances it.
// This module runs synchronously after govuk-prototype-components.min.js has
// set up GOVUKPrototypeComponents but before documentReady callbacks fire.
if (window.GOVUKPrototypeComponents && window.GOVUKPrototypeComponents.initAll) {
  const _originalInitAll = window.GOVUKPrototypeComponents.initAll.bind(window.GOVUKPrototypeComponents)
  window.GOVUKPrototypeComponents.initAll = function () {
    document.querySelectorAll('[data-module="autocomplete"]').forEach(function (el) {
      el.setAttribute('data-show-all-values', 'true')
    })
    _originalInitAll()
  }
}

window.GOVUKPrototypeKit.documentReady(() => {
})
