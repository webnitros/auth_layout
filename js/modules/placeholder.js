AuthModal.Placeholder = {

    init: function () {

        /**
         * При фокусе в форму убираем поднимаем плейсхолдер
         */

        $(document).on('focus', '.auth input', function () {
            $(this).closest('.auth_block_inputs_phone_outer').addClass('auth_focus')
        })

        /**
         * При выходе из фокуса
         */

        $(document).on('blur', '.auth input', function () {
            var val = $(this).val()

            if (val === '') {
                $('.auth_block_inputs_phone_outer').removeClass('auth_focus')
            }
        })


        /**
         * Ввод данные в форму
         */
        $(document).on('keyup', '.auth input', function () {
            var $placeholder = $(this).closest('.auth_block_inputs_phone_outer_row').find('.auth_input_placeholder')
            var val = $(this).val()
            if (val !== '') {
                $placeholder.addClass('auth_input_placeholder_focus')
            } else {
                $placeholder.removeClass('auth_input_placeholder_focus')
            }
        })
    }
}
