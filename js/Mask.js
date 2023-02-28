AuthModal.Mask = {
    initialize: function () {

        // Наложение макси для телефона
        AuthModal.Mask.impose('.auth_input', {
            mask: '999 999 9999',
            placeholder: '_',
            showMaskOnHover: false,
            showMaskOnFocus: false,
            onBeforePaste: function (pastedValue, opts) {
                AuthModal.input.set(pastedValue)
                return AuthModal.input.get(false)
            },
            onBeforeMask: function (value, opts) {
                AuthModal.input.set(value)
                return AuthModal.input.get(false)
            }
        }, function () {
            $('.auth_input').addClass('auth_mask_init')
        })

        // Наложение макси для кода
        AuthModal.Mask.impose('.auth_input_code', {
            placeholder: '_',
            mask: '9 9 9 9',
            clearMaskOnLostFocus: false
        }, function () {
            $('.auth_input_code').addClass('auth_mask_init')
        })

    },
    destroy: function (selector, callback) {
        // Разработать уничтожение маски при смене кода страны
    },
    impose: function (selector, options, callback) {
        console.log(selector)
        if (typeof (jQuery().inputmask) == 'undefined') {
            this.lib(selector, options, callback)
        } else {
            this.handle(selector, options, callback)
        }
    },
    handle: function (selector, options, callback) {
        options = Object.assign({}, options)
        $(selector).inputmask(options)
        if (typeof callback === 'function') {
            callback()
        }
    },
    lib: function (selector, options, callback) {

        $.getScript(authModalConfig.jsUrl + 'lib/jquery.inputmask.min.js', function () {
            AuthModal.Mask.handle(selector, options, callback)
        })
    }
}
