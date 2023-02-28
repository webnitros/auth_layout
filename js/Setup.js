
AuthModal.setup = function () {
    // selectors & $objects
    this.actionName = 'auth_action'
    this.action = ':submit[name=' + this.actionName + ']'
    this.form = '.auth_form'
    this.$doc = $(document)

    this.sendData = {
        $form: null,
        action: null,
        formData: null
    }

    this.timeout = 300
}

