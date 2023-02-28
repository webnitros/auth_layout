AuthModal.Provider = Object.assign({
    name: 'Provider',
    service: '',
    callbacks: {
        interrogate: authModalConfig.callbacksObjectTemplate(),
    },
    init: function () {
        $(document).on('click', '.auth_btn_social', function (e) {
            e.preventDefault()
            $(this).addClass('disabled')
            var url = $(this).attr('href')
            var title = $(this).attr('title')

            AuthModal.Provider.openWindow(url)
            AuthModal.Spinner.show()

            // Запрещаем скрывать сниппет
            AuthModal.Spinner.disableHide = true

            AuthModal.Provider.service = title
            AuthModal.Provider.circle(title)

        })
    },

    // Опрачиваем сервис на авторизацию
    // если авторизация пройдена, то выполняем действия согласно полученым инструкциям
    circle: function () {
        AuthModal.sendData = {
            $form: null,
            action: 'auth/interrogate',
            formData: {
                service: AuthModal.Provider.service
            }
        }
        AuthModal.controller()
    },

    // Опрачиваем сервис на авторизацию
    // если авторизация пройдена, то выполняем действия согласно полученым инструкциям
    interrogate: function () {
        $('.auth_error').remove()

        this.ajaxFail('interrogate', function (response) {
            if (response.status === 302) {
                setTimeout(function () {
                    AuthModal.Provider.circle()
                }, 1000)
            } else {
                AuthModal.Spinner.disableHide = false
                AuthModal.Spinner.hide()
                var $text = $('<div class="auth_error">' + response.responseJSON.message + '</div>')
                $('.auth_error').remove()
                $('#auth_input_phone_code .auth_buttons').after($text)
            }
        })

        // ответ
        this.ajaxSuccess('interrogate', function (response) {

            AuthModal.Spinner.disableHide = false
            AuthModal.Spinner.hide()
            AuthModal.Forward.show('in_login')

        }, true)

    },

    openWindow: function (url) {
        window.open(url, authModalConfig.siteName, 'height=650,width=600')
    },
}, AuthModal.Action)
