AuthModal.initialize = function () {


    AuthModal.setup()

    AuthModal.input.init()

    AuthModal.Placeholder.init()

    AuthModal.ajaxProgress = false

    AuthModal.$doc.ajaxStart(function () {
        AuthModal.ajaxProgress = true
    })
        .ajaxStop(function () {
            AuthModal.ajaxProgress = false
        })
        .on('submit', AuthModal.form, function (e) {
            e.preventDefault()
            var $form = $(this)
            var action = $form.find(AuthModal.action).val()

            if (action) {
                var formData = $form.serializeArray()
                formData.push({
                    name: AuthModal.actionName,
                    value: action
                })
                AuthModal.sendData = {
                    $form: $form,
                    action: action,
                    formData: formData
                }
                AuthModal.controller()
            }
        })

    $(document).on('click', AuthModal.form + ' button[type=submit]', function (e) {
        e.preventDefault()
        $(this).closest('form').submit()
    })

    // Демонстрация ввода в ручную
    $(document).on('keyup', '.auth_input', function () {
        AuthModal.input.set($(this).val())
    })

    function delay (callback, ms) {
        var timer = 0
        return function () {
            var context = this, args = arguments
            clearTimeout(timer)
            timer = setTimeout(function () {
                callback.apply(context, args)
            }, ms || 0)
        }
    }

    $(document).on('keyup', '.auth_input_code', delay(AuthModal.input.setAuthCode, 300))

    /**
     * Вернет к смене телефона
     */
    $(document).on('click', '.auth_forward', function (e) {
        e.preventDefault()
        AuthModal.Forward.toggle.call(this)
        AuthModal.Timer.resendCode()
    })
    /**
     * Вернет к смене телефона
     */
    $(document).on('click', '.auth_logout', function (e) {
        e.preventDefault()

        AuthModal.Forward.toggle.call(this)

    })

    /**
     * Вернет к смене телефона
     */
    $(document).on('click', '.auth_login', function (e) {
        e.preventDefault()
        AuthModal.Forward.toggle.call(this)
    })


    /**
     * Вернет к смене телефона
     */
    $(document).on('click', '.auth_resend_code', function (e) {
        e.preventDefault()
        AuthModal.Timer.resendCode()
    })

    AuthModal.Provider.init()

}

$(document).ready(function ($) {
    AuthModal.initialize()
})

