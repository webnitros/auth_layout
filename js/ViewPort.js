AuthModal.ViewPort = {
    change: false,
    current: null,
    param: 'width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no',
    update: function () {
        if (!AuthModal.ViewPort.change) {
            AuthModal.ViewPort.change = true
            var viewport = this.get()

            if (viewport && !AuthModal.ViewPort.current) {
                // Записивыем эксзепляр
                AuthModal.ViewPort.current = viewport
            }

            this.get().remove()
            this.addHead(this.create())

        }
    },
    get: function () {
        return $('meta[name=viewport]')
    },
    return: function () {
        if (AuthModal.ViewPort.change) {
            AuthModal.ViewPort.change = false
            this.get().remove()
            if (AuthModal.ViewPort.current) {
                this.addHead(AuthModal.ViewPort.current)
            } else {
                this.get().remove()
            }
        }
    },
    create: function () {
        return $('<meta name="viewport" content="' + AuthModal.ViewPort.param + '">')
    },
    addHead: function (viewport) {
        $('head').append(viewport)
    }
}
