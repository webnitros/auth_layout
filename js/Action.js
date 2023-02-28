AuthModal.Action = {
    ajaxSuccess: function (name, callback, send) {
        // Помещаем событие
        this.callbacks[name].response.success = callback
        this.ajax.call(this, name, send)
    },

    ajaxFail: function (name, callback, send) {
        this.callbacks[name].ajax.fail = callback
        this.ajax.call(this, name, send)
    },

    ajaxAlways: function (name, callback, send) {
        this.callbacks[name].ajax.always = callback
        this.ajax.call(this, name, send)
    },

    ajax: function (name, send) {
        // Если вызываем другое событие
        if (send === true) {
            this.ajaxSend(name, AuthModal.Callbacks[this.name][name])
        }
    },

    ajaxSend: function (name, callback) {
        AuthModal.send(AuthModal.sendData.formData, this.callbacks[name], callback)
    },

}
