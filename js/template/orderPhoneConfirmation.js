/**
 * Подтверждение номера телефона на странице оформления заказа
 * - на input накладывается маска
 * - если номер телефона найден в базе то предлагаем пользователю пройти авторизацияю
 */
AuthModal.orderPhoneConfirmation = {
    run: function () {

        $(document).on('click', '.auth_confirm_phone', function (e) {
            e.preventDefault()

            AuthModal.Forward.reloadCancelOne()
            AuthModal.Modal.run('phone_code', {
                phone: AuthModal.input.get(),
            })

        })

        if ($('#msOrder').length > 0) {

            // Наложение макси для телефона
            AuthModal.Mask.impose('#msOrder input[name=phone]', {
                mask: '999 999 9999',
                placeholder: '_',
                showMaskOnHover: false,
                showMaskOnFocus: false,
                onBeforePaste: function (pastedValue, opts) {
                    console.log(pastedValue)
                    AuthModal.input.set(pastedValue)
                    return AuthModal.input.get(false)
                },
                onBeforeMask: function (value, opts) {
                    AuthModal.input.set(value)
                    return AuthModal.input.get(false)
                }
            }, function () {

                var phone = AuthModal.input.get()
                if (phone) {
                    AuthModal.sendData = {
                        action: 'auth/phone/check',
                        formData: {
                            phone: phone
                        }
                    }

                    // Если нормер подтвержден, предлагаем пользовалю подтвердить номер телефона
                    AuthModal.Callbacks.add('Phone.check.response.success', 'check_phone', function (response) {
                        if (response.numberExists) {

                            AuthModal.orderPhoneConfirmation.confirmMessage()
                            /* AuthModal.Modal.run('phone_code', {
                                 phone: phone
                             })*/
                        }
                    })

                    // Отправляем код на номер телефона после того как загрузилось модельное окно
                    AuthModal.Callbacks.add('Auth.modal.response.success', 'send_code_phone', function (response) {
                        $('#auth_input_phone_code').submit()
                    })

                    AuthModal.controller()
                }

            })
        }
    },
    confirmMessage: function () {

        var $link = $('<small><a href="#" class="auth_confirm_phone">войти на сайт</a></small>')

        $('#msOrder input[name=phone]').after($link)
    }
}
