AuthModal.Modal = {
    init: false,
    data: null,
    initialize: function () {

        $(document).on('click', '.auth_modal', function (e) {
            if (e.target) {
                var $content = e.target.closest('.auth_modal-content')
                if (!$content) {
                    AuthModal.Modal.hide()
                }
            }
        })

        $(document).on('click', '.auth_modal-close', function (e) {
            e.preventDefault()

            AuthModal.Modal.hide()
        })

        /**
         * Запускает модеьное окно
         */
        $(document).on('click', '.auth_model-btn', function (e) {
            e.preventDefault()
            AuthModal.Modal.run('phone_code')
        })

        /**
         * Запускает модеьное окно с указаной формой
         */
        $(document).on('click', '.auth_modal_run', function (e) {
            e.preventDefault()
            var forward = $(this).data('form') || 'phone_code'
            AuthModal.Modal.data = $(this).data()
            AuthModal.Modal.run(forward)
        })
    },
    run: function (formId, params) {

        AuthModal.Modal.hide()
        AuthModal.Spinner.show()

        if (!this.init) {
            this.init = true
            this.initialize()
        }

        if (!jQuery().modal) {
            AuthModal.Modal.Lib()
        }
        var formData = {
            form_key: formId
        }
        if (params) {
            Object.keys(params).map(function (field, index) {
                formData[field] = params[field]
            })
        }

        AuthModal.sendData = {
            action: 'auth/modal',
            formData: formData
        }
        AuthModal.controller()

    },
    update: function (response) {

        $('.auth_modal').remove()
        $('.auth_modal-backdrop').remove()

        $('body').append(response.modal)
        AuthModal.Modal.show()
        // Маски для телефонов всегда провешиваются занова
        AuthModal.Mask.initialize()
    },
    show: function () {

        $('body').addClass('auth_modal-open')

        $('#auth_modal').addClass('auth_modal-open')

        $('#auth_modal').addClass('show')

        //$('#auth_modal').modal('show')

        $('body').append($('<div class="auth_modal-backdrop">'))

        AuthModal.ViewPort.update()
    },
    hide: function () {
        $('body').removeClass('auth_modal-open')
        $('#auth_modal').remove()
        $('.auth_modal-backdrop').remove()

        AuthModal.ViewPort.return()
    },
    Lib: function (callback) {
        $.getScript(authModalConfig.jsUrl + 'lib/jquery.modal.js', function () {

        })
    }
}

AuthModal.Modal.initialize()
