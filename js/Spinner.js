/**
 * Общие функции
 */
AuthModal.Spinner = {
    selector: '.auth_spinners',
    disableHide: false,
    get: function () {
        return $(this.selector)
    },
    has: function () {
        return this.get().length > 0
    },
    hide: function () {
        if (!this.disableHide) {
            this.get().removeClass('auth_loading')
        }
    },
    show: function () {
        if (!this.has()) {
            this.reg()
        }
        this.get().addClass('auth_loading')
    },
    reg: function () {
        var main = $('<div class="auth_spinners"><div class="auth_spinners_content"><div class="auth_spinner"></div><div class="auth_spinner"></div><div class="auth_spinner"></div><div class="auth_spinner"></div></div></div>')
        $('body').append(main)
    }
}
