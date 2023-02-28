/**
 * Общие функции
 */
AuthModal.Auth = Object.assign({
    name: 'Auth',
    callbacks: {
        logout: authModalConfig.callbacksObjectTemplate(),
        modal: authModalConfig.callbacksObjectTemplate(),
        changePassword: authModalConfig.callbacksObjectTemplate(),
    },
    /**
     * Выход с сайта
     */
    logout: function () {
        // ответ
        this.ajaxSuccess('logout', function (response) {
            if (response.reload) {
                AuthModal.Forward.reload()
            }
        }, true)
    },
    /**
     * Выход с сайта
     */
    modal: function () {
        // ответ
        this.ajaxSuccess('modal', function (response) {
            AuthModal.Modal.update(response)
        }, true)
    },
    /**
     * Смена пароля
     */
    changePassword: function () {
        // ответ
        this.ajaxSuccess('changePassword', function (response) {

        }, true)
    }
}, AuthModal.Action)

AuthModal.Settings = Object.assign({
    name: 'Settings',
    callbacks: {
        profile: authModalConfig.callbacksObjectTemplate(),
        password: authModalConfig.callbacksObjectTemplate(),
        phone_change: authModalConfig.callbacksObjectTemplate(),
    },
    /**
     * Выход с сайта
     */
    profile: function () {

        // ответ
        /* this.ajaxSuccess('profile', function (response) {
             if (response.reload) {
                 AuthModal.Forward.reload()
             }
         }, true)*/
    },
    /**
     * Выход с сайта
     */
    password: function () {

        /* this.ajaxFail('password', function (response) {

             if (response.responseJSON && response.responseJSON.message) {

                 var $text = $('<div class="auth_error">' + response.responseJSON.message + '</div>')

                 $('#auth_input_change_password .auth_buttons').after($text)
             }
         })*/

        this.ajaxSuccess('password', function (response) {
            if (response.forward) {
                AuthModal.Forward.show(response.forward)
            }
        }, true)

    },
    /**
     * Смена номера телефона
     */
    phone_change: function () {

        this.ajaxFail('phone_change', function (response) {
            if (response.responseJSON && response.responseJSON.timer) {
                AuthModal.Timer.start(response.responseJSON.timer)
            }
        })

        this.ajaxSuccess('phone_change', function (response) {

            AuthModal.Forward.show('phone_confirmation')

            if (response.text) {
                $('#auth_phone_code_text').html(response.text)
            }

            // Запускаем таймер после получения кода
            AuthModal.Timer.start()

        }, true)

    },

}, AuthModal.Action)

AuthModal.Phone = Object.assign({
    name: 'Phone',
    callbacks: {
        code: authModalConfig.callbacksObjectTemplate(),
        confirmation: authModalConfig.callbacksObjectTemplate(),
        check: authModalConfig.callbacksObjectTemplate(),
    },

    /**
     * Отправка кода на телефонный номер
     */
    code: function () {

        if (!AuthModal.Validate.field('phone')) {
            return false
        }

        this.ajaxFail('code', function (response) {

            if (response.responseJSON && response.responseJSON.timer) {
                AuthModal.Timer.start(response.responseJSON.timer)
            }
        })

        // ответ
        this.ajaxSuccess('code', function (response) {

            if (response.reload) {
                AuthModal.Forward.reload()
            }

            AuthModal.Forward.show('phone_confirmation')

            if (response.text) {
                $('#auth_phone_code_text').html(response.text)
            }

            // Запускаем таймер после получения кода
            AuthModal.Timer.start()

        }, true)

    },

    /*
     * Подтверждение код
     */
    confirmation: function () {

        // ответ
        this.ajaxSuccess('confirmation', function (response) {
            if (response.reload) {
                AuthModal.Forward.reload()
            } else if (response.forward) {
                AuthModal.Forward.show(response.forward)
            } else {
                AuthModal.Forward.show('in_login')
            }

        }, true)

    },

    /*
     * Проверка телефона
     */
    check: function () {
        AuthModal.send(AuthModal.sendData.formData, AuthModal.Phone.callbacks.check, AuthModal.Callbacks.Phone.check)
    },

}, AuthModal.Action)

AuthModal.Email = Object.assign({
    name: 'Email',
    callbacks: {
        login: authModalConfig.callbacksObjectTemplate(),
        passwordReset: authModalConfig.callbacksObjectTemplate(),
    },
    /*
    * Вход по Email адресу
    */
    login: function () {

        // ответ
        this.ajaxSuccess('login', function (response) {
            if (response.reload) {
                AuthModal.Forward.reload()
            }
            AuthModal.Forward.show('in_login')
        }, true)

    },

    /**
     * Сброс пароля
     */
    passwordReset: function () {

        // Выполняем запрос и показываем форму с email
        this.ajaxSuccess('passwordReset', function (response) {
            var email = $('input[name=email_reset]').val()
            $('input[name=email]').val(email)
            AuthModal.Forward.show('email_login')

            $('.auth_form')
            AuthModal.Message.success('Пароль успешно отправлен на ваш email адрес.')

        }, true)

    },

}, AuthModal.Action)
