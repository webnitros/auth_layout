AuthModal.NotificationInStock = Object.assign({
    name: 'NotificationInStock',
    callbacks: {
        subscribe: authModalConfig.callbacksObjectTemplate(),
    },

    // Опрачиваем сервис на авторизацию
    // если авторизация пройдена, то выполняем действия согласно полученым инструкциям
    subscribe: function () {

        if (AuthModal.Modal.data) {
            Object.keys(AuthModal.Modal.data).map(function (field, index) {
                AuthModal.sendData.formData.push({
                    name: field,
                    value: AuthModal.Modal.data[field],
                })
            })
        }
        $('.auth_error').remove()

        this.ajaxFail('subscribe', function (response) {
            if (response.status !== 200) {
                var $text = $('<div class="auth_error">' + response.responseJSON.message + '</div>')
                $('.auth_error').remove()
                $('#auth_input_notification_in_stock .auth_buttons').after($text)
            } else {
                if (response.responseJSON) {
                    if (response.responseJSON.forward) {
                        AuthModal.Forward.show(response.responseJSON.forward)
                    }
                }
            }

        })

        // ответ
        this.ajaxSuccess('subscribe', function (response) {
            AuthModal.Modal.data = null
            AuthModal.Forward.show('notification_in_stock_success')
        }, true)

    },

}, AuthModal.Action)
