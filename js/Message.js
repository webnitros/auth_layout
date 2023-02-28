/**
 * Общие функции
 */
AuthModal.Message = {
    /**
     * Выход с сайта
     */
    selector: '.auth_message',
    success: function (message) {
        this.add(message, 'auth_success')
    },
    error: function (message) {
        this.add(message, 'auth_error')
    },
    add: function (message, cls) {

        var $Form = $('.auth_form_active')

        var msg = $('<div class="auth_message"/>')
        msg.html(message).addClass(cls)

        $Form.find('.auth_buttons').after(msg)

        this.show()
    },
    hide: function () {
        $(this.selector).remove()
    },
    show: function () {
        $(this.selector).show()
    }
}
