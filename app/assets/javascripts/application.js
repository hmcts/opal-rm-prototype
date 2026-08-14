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

  document.querySelectorAll('[data-module="rm-route-guard"]').forEach(function ($form) {
    var isSubmitting = false
    var isLeavingAfterConfirmation = false
    var isDirty = $form.getAttribute('data-route-guard-active') === 'true'
    var leaveMessage = 'Warning: Are you sure you want to leave this page? Any information you entered will be lost.'

    function getFormSnapshot () {
      return Array.prototype.slice.call($form.elements)
        .filter(function ($field) {
          return $field.name && !$field.disabled && $field.type !== 'hidden'
        })
        .map(function ($field) {
          if ($field.type === 'checkbox' || $field.type === 'radio') {
            return $field.name + ':' + $field.value + ':' + $field.checked
          }

          return $field.name + ':' + $field.value
        })
        .join('|')
    }

    var initialSnapshot = getFormSnapshot()

    function updateDirtyState () {
      isDirty = $form.getAttribute('data-route-guard-active') === 'true' ||
        getFormSnapshot() !== initialSnapshot
    }

    $form.addEventListener('input', updateDirtyState)
    $form.addEventListener('change', updateDirtyState)
    $form.addEventListener('submit', function () {
      isSubmitting = true
    })

    var guardedLinks = Array.prototype.slice.call($form.querySelectorAll('a[href]'))

    if ($form.id) {
      guardedLinks = guardedLinks.concat(
        Array.prototype.slice.call(
          document.querySelectorAll('[data-route-guard-link="' + $form.id + '"]')
        )
      )
    }

    guardedLinks.forEach(function ($link) {
      $link.addEventListener('click', function (event) {
        updateDirtyState()

        if (!isDirty) {
          return
        }

        if (!window.confirm(leaveMessage)) {
          event.preventDefault()
          return
        }

        isLeavingAfterConfirmation = true
      })
    })

    window.addEventListener('beforeunload', function (event) {
      updateDirtyState()

      if (!isDirty || isSubmitting || isLeavingAfterConfirmation) {
        return undefined
      }

      event.preventDefault()
      event.returnValue = leaveMessage
      return leaveMessage
    })
  })

  document.querySelectorAll('[data-module="rm-hearing-date-check"]').forEach(function ($inset) {
    var inputId = $inset.getAttribute('data-date-input-id')
    var $dateInput = inputId && document.getElementById(inputId)

    if (!$dateInput) {
      return
    }

    function parseDate (value) {
      var match = String(value || '').trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)

      if (!match) {
        return null
      }

      var day = Number(match[1])
      var month = Number(match[2])
      var year = Number(match[3])
      var date = new Date(year, month - 1, day)

      if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
        return null
      }

      return date
    }

    function updateHearingDateInset () {
      var hearingDate = parseDate($dateInput.value)
      var today = new Date()

      today.setHours(0, 0, 0, 0)
      $inset.hidden = !hearingDate || hearingDate >= today
    }

    $dateInput.addEventListener('input', updateHearingDateInset)
    $dateInput.addEventListener('change', updateHearingDateInset)
    updateHearingDateInset()
  })

  document.querySelectorAll('[data-suppress-show-all-sections="true"]').forEach(function ($accordion) {
    var $showAllControls = $accordion.querySelector('.govuk-accordion__controls')

    if ($showAllControls) {
      $showAllControls.remove()
    }
  })
})
