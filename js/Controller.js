AuthModal.controller = function () {
    var self = this
    switch (self.sendData.action) {
        case 'auth/phone/code':
            AuthModal.Phone.code()
            break
        case 'auth/phone/confirmation':
            AuthModal.Phone.confirmation()
            break
        case 'auth/phone/check':
            AuthModal.Phone.check()
            break
        case 'auth/logout':
            AuthModal.Auth.logout()
            break

        case 'auth/email/login':
            AuthModal.Email.login()
            break
        case 'auth/email/password/reset':
            AuthModal.Email.passwordReset()
            break
        case 'auth/modal':
            AuthModal.Auth.modal()
            break

        case 'auth/settings/profile':
            AuthModal.Settings.profile()
            break
        case 'auth/settings/password':
            AuthModal.Settings.password()
            break
        case 'auth/settings/phone/change':
            AuthModal.Settings.phone_change()
            break
        case 'auth/interrogate': // Процедура опроса бэкенда на предмет авторизации
            AuthModal.Provider.interrogate()
            break
        case 'auth/service/subscribe': // Процедура опроса бэкенда на предмет авторизации
            AuthModal.NotificationInStock.subscribe()
            break

        default:
            console.log('Error not found action: ' + self.sendData.action)
            return
    }
}
