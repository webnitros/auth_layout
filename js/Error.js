/**
 * Контроль ошибок
 * @type {{add: AuthModal.Error.add, clear: AuthModal.Error.clear, animated: AuthModal.Error.animated}}
 */
AuthModal.Error = {
    add: function (field, error) {

        var $field = $('input[name=' + field + ']')
        var $inputs = $field.closest('.auth_block_inputs_phone')

        $inputs.find('.auth_block_error').remove()

        var $outer = $field.closest('.auth_block_inputs_phone_outer')
        $outer.addClass('auth_error')

        var $error = $('<div class="auth_block_error">')
        var $p = $('<p class="auth_error">').html(error)
        $error.append($p)

        $inputs.append($error)
        AuthModal.Error.animated.call($outer)
    },
    clear: function () {
        $('.auth_block_inputs_phone_outer').removeClass('auth_error')
        $('.auth_block_error').remove()
    },
    animated: function () {
        $(this).addClass('shake')
        setTimeout(function () {
            $('.shake').removeClass('shake')
        }, 300)
    }
}
