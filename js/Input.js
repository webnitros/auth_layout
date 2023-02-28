AuthModal.input = {
    value: null,
    auth_code: null,
    country_code: authModalConfig.country_code,
    init: function () {

        // Проверяем заполняемость полей
        $('.auth_input_no_mask').each(
            function (index, element) {
                var val = $(this).val()
                if (val !== '') {
                    $(this).closest('.auth_block_inputs_phone_outer_row').find('.auth_input_placeholder').addClass('auth_input_placeholder_focus')
                }
            }
        )

    },
    set: function (val) {
        val = this.parse(val)
        if (isNaN(val) || val === undefined) {
            val = null
        }

        this.value = val
        this.placeholderToggle()

        $('input[name="auth_phone"]').val(this.get())

        var format = this.get() || ''

        if (format) {
            $('#auth_phone').text(format)
        }

    },
    setValue: function (val) {
        this.set(val)
        // Запись телефона в маску
        var selector = document.querySelector('.auth_input')
        if (selector) {
            selector.inputmask.setValue(this.get(false))
        }
    },
    is: function () {
        if (this.value) {
            return true
        }
        return false
    },
    setAuthCode: function () {

        var code = $(this).val()
        code = code.replace(/[^0-9]/g, '')

        if (code.length !== 4) {
            return false
        }

        if (AuthModal.input.auth_code === code) {
            return true
        }

        AuthModal.input.auth_code = code

        $('input[name=auth_code]').val(code)

        $('#auth_input_code').submit()

    },
    get: function (addSelect) {
        var value = this.value
        if (!value) {
            return value
        }
        return addSelect !== false ? AuthModal.input.country_code + value : value
    },
    validate: function () {
        var val = this.get()
        if (!val) {
            return false
        }
        if (val.length !== 11) {
            return false
        }
        return true
    },
    parse: function (value) {
        if (!value) {
            return value
        }

        value = value.replace(/[^0-9]/g, '')
        value = parseInt(value)
        if (isNaN(value) || value === undefined) {
            return null
        }
        value = value.toString()
        if (value.length === 11) {
            if (value[0] === '8' || value[0] === AuthModal.input.country_code) {
                value = value.slice(1)
            }
        }
        return value
    },
    placeholderToggle: function () {
        if (this.is()) {
            this.placeholderHide()
        } else {
            this.placeholderShow()
        }
    },
    placeholderHide: function () {
        $('.auth_input_placeholder_toggle').hide()
    },
    placeholderShow: function () {
        $('.auth_input_placeholder_toggle').show()
    },
    handleErrors: function (data) {

        for (var field in data) {
            if (data.hasOwnProperty(field)) {
                var text = data[field]
                AuthModal.Error.add(field, text)
            }
        }

    }
}
