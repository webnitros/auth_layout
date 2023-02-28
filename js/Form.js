/**
 * Управление формой
 * @type {{disable: AuthModal.Form.disable, enable: AuthModal.Form.enable}}
 */
AuthModal.Form = {
    disable: function () {
        AuthModal.Error.clear()

        AuthModal.Spinner.show()

        if (AuthModal.sendData.$form) {
            AuthModal.sendData.$form.addClass('auth_loading')
            var $button = AuthModal.sendData.$form.find('button[type="submit"]')
            $button.prop('disabled', true)
            AuthModal.sendData.$form.find('input').prop('disabled', true)
        }
    },
    enable: function () {

        AuthModal.Spinner.hide()

        if (AuthModal.sendData.$form) {
            AuthModal.sendData.$form.removeClass('auth_loading')
            var $button = AuthModal.sendData.$form.find('button[type="submit"]')
            $button.prop('disabled', false)
            AuthModal.sendData.$form.find('input').prop('disabled', false)
        }
    }
}
