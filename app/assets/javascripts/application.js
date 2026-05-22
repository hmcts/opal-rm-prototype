window.GOVUKPrototypeKit.documentReady(() => {
  document.querySelectorAll('[data-module="rm-aliases"]').forEach(function ($aliases) {
    var $list = $aliases.querySelector('[data-alias-list]')
    var $count = $aliases.querySelector('[data-alias-count]')
    var $add = $aliases.querySelector('[data-alias-add]')
    var prefix = $aliases.getAttribute('data-alias-prefix')

    if (!$list || !$count || !$add || !prefix) {
      return
    }

    function getItems () {
      return Array.prototype.slice.call($list.querySelectorAll('[data-alias-item]'))
    }

    function updateInput ($input, aliasNumber) {
      var field = $input.getAttribute('data-alias-field')
      var id = prefix + '-alias-' + aliasNumber + '-' + field
      var $label = $input.closest('.govuk-form-group').querySelector('label')

      $input.id = id
      $input.name = id

      if ($label) {
        $label.setAttribute('for', id)
      }
    }

    function renumberAliases () {
      var items = getItems()
      var showRemoveLinks = items.length > 1

      $count.value = items.length

      items.forEach(function ($item, index) {
        var aliasNumber = index + 1
        var $heading = $item.querySelector('[data-alias-heading]')
        var $removeWrapper = $item.querySelector('[data-alias-remove-wrapper]')

        if ($heading) {
          $heading.textContent = 'Alias ' + aliasNumber
        }

        $item.querySelectorAll('[data-alias-field]').forEach(function ($input) {
          updateInput($input, aliasNumber)
        })

        if ($removeWrapper) {
          $removeWrapper.hidden = !showRemoveLinks
        }
      })
    }

    $add.addEventListener('click', function () {
      var $firstAlias = getItems()[0]
      var $newAlias = $firstAlias.cloneNode(true)

      $newAlias.querySelectorAll('[data-alias-field]').forEach(function ($input) {
        $input.value = ''
      })

      $list.appendChild($newAlias)
      renumberAliases()

      var $firstInput = $newAlias.querySelector('[data-alias-field]')
      if ($firstInput) {
        $firstInput.focus()
      }
    })

    $list.addEventListener('click', function (event) {
      var $remove = event.target.closest('[data-alias-remove]')

      if (!$remove) {
        return
      }

      event.preventDefault()

      var items = getItems()
      var $item = $remove.closest('[data-alias-item]')
      var itemIndex = items.indexOf($item)

      if (!$item || items.length === 1) {
        return
      }

      $item.remove()
      renumberAliases()

      var remainingItems = getItems()
      var $focusItem = remainingItems[Math.min(itemIndex, remainingItems.length - 1)]
      var $focusInput = $focusItem && $focusItem.querySelector('[data-alias-field]')

      if ($focusInput) {
        $focusInput.focus()
      }
    })

    renumberAliases()
  })

  document.querySelectorAll('[data-module="rm-toggle-details-summary"]').forEach(function ($details) {
    var $summaryText = $details.querySelector('.govuk-details__summary-text')
    var openText = $details.getAttribute('data-open-text')
    var closedText = $details.getAttribute('data-closed-text')

    if (!$summaryText || !openText || !closedText) {
      return
    }

    function updateSummaryText () {
      $summaryText.textContent = $details.open ? openText : closedText
    }

    $details.addEventListener('toggle', updateSummaryText)
    updateSummaryText()
  })
})
