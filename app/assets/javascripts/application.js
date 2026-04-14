//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {
  const applicationFoundPanels = document.querySelectorAll('[data-application-found-panel]')

  applicationFoundPanels.forEach((panel) => {
    const titleElement = panel.querySelector('[data-application-found-title]')
    const inputId = panel.dataset.applicationInputId || 'application-code'
    const inputTextId = panel.dataset.applicationInputTextId || inputId

    if (!titleElement) {
      return
    }

    let lookup = {}

    try {
      lookup = JSON.parse(panel.dataset.applicationLookup || '{}')
    } catch (error) {
      lookup = {}
    }

    let boundElements = []

    const getElements = () => ({
      autocompleteInputElement: document.querySelector(`#${inputTextId}`),
      autocompleteSelectElement:
        document.querySelector(`#${inputId}-select`) ||
        document.querySelector(`select[name="${inputId}"]`)
    })

    const syncApplicationFoundPanel = () => {
      const { autocompleteInputElement, autocompleteSelectElement } = getElements()
      const selectedValue = String(autocompleteSelectElement?.value || '').trim().toUpperCase()
      const enteredText = String(autocompleteInputElement?.value || '').trim()
      const matchedCode = (selectedValue || enteredText.split(' - ')[0] || '')
        .trim()
        .toUpperCase()
      const matchedTitle = lookup[matchedCode]

      if (matchedTitle) {
        titleElement.textContent = matchedTitle
        panel.classList.remove('govuk-!-display-none')
      } else {
        titleElement.textContent = ''
        panel.classList.add('govuk-!-display-none')
      }
    }

    const bindListeners = () => {
      const { autocompleteInputElement, autocompleteSelectElement } = getElements()
      const nextBoundElements = [autocompleteSelectElement, autocompleteInputElement].filter(Boolean)

      if (
        nextBoundElements.length === boundElements.length &&
        nextBoundElements.every((element, index) => element === boundElements[index])
      ) {
        return
      }

      boundElements = nextBoundElements

      boundElements.forEach((element) => {
        element.addEventListener('change', syncApplicationFoundPanel)
        element.addEventListener('input', syncApplicationFoundPanel)
        element.addEventListener('blur', syncApplicationFoundPanel)
      })
    }

    panel.classList.add('govuk-!-display-none')

    bindListeners()
    window.setTimeout(() => {
      bindListeners()
    }, 200)
    window.setTimeout(() => {
      bindListeners()
    }, 800)
  })
})
