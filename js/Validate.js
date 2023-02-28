AuthModal.Validate = {
    field: function (field) {
        var error = false
        switch (field) {
            case 'phone':
                if (!AuthModal.input.validate()) {
                    error = 'Номер телефона указан не верно'
                }
                break
            case 'email':
                if (!AuthModal.input.validate()) {
                    error = 'Номер телефона указан не верно'
                }
                break
            default:
                break
        }
        if (error !== false) {
            AuthModal.Error.add(field, error)
            return false
        } else {
            AuthModal.Error.clear()
            return true
        }
    },
}
