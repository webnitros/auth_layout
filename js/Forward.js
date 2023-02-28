/**
 * Переключение форма
 * @type {{reload: AuthModal.Forward.reload, forward: ((function(): (boolean|undefined))|*), show: AuthModal.Forward.show}}
 */
AuthModal.Forward = {
    formId: null,
    show: function (formId, copy) {
        this.formId = formId

        AuthModal.Message.hide()

        AuthModal.Error.clear()

        $('#auth_modal .auth_form').hide()

        // Переключение на форму
        var $form = $('[data-form-id="' + formId + '"]')

        if ($form.length === 0) {
            console.error('form not found ' + formId)
            return false
        }

        $('.auth_form_active').removeClass('auth_form_active')

        $form.show()
        $form.addClass('auth_form_active')

        var $inputFocus = $form.find('input[autofocus]')
        if ($inputFocus.length > 0) {
            $inputFocus.focus()

            if (copy) {
                var $Copy = $('input[name="' + copy + '"]')
                if ($Copy.length > 0) {
                    // Копируем значение из поля и вставляем его в форму
                    $inputFocus.val($Copy.val())
                }
            }
        }

    },
    toggle: function () {

        var copy = $(this).data('copy')

        AuthModal.Forward.show($(this).data('form'), copy)
    },

    reload: function () {
        // Перезагружаем страницу после авторизации

        if (this.reload_cancel_one) {
            this.reload_cancel_one = false
        } else {
            window.location.reload()
        }
    },

    reload_cancel_one: false,
    reloadCancelOne: function () {
        // Отменить один раз перезагрузку страницы
        this.reload_cancel_one = true
    }
}
