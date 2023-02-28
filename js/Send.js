AuthModal.send = function (data, callbacks, userCallbacks) {
    var runCallback = function (callback, bind) {
        if (typeof callback == 'function') {
            return callback.apply(bind, Array.prototype.slice.call(arguments, 2))
        } else if (typeof callback == 'object') {
            for (var i in callback) {
                if (callback.hasOwnProperty(i)) {
                    var response = callback[i].apply(bind, Array.prototype.slice.call(arguments, 2))
                    if (response === false) {
                        return false
                    }
                }
            }
        }
        return true
    }

    // set context
    if ($.isArray(data)) {
        data.push({
            name: 'ctx',
            value: authModalConfig.ctx
        })
    } else if ($.isPlainObject(data)) {
        data.ctx = authModalConfig.ctx
    } else if (typeof data == 'string') {
        data += '&ctx=' + authModalConfig.ctx
    }

    // set action url
    var url = '/api/' + AuthModal.sendData.action

    // set request method
    var formMethod = (AuthModal.sendData.$form)
        ? AuthModal.sendData.$form.attr('method')
        : false
    var method = (formMethod)
        ? formMethod
        : 'post'

    AuthModal.Form.disable()
    AuthModal.Message.hide()

    // callback before
    if (runCallback(callbacks.before) === false || runCallback(userCallbacks.before) === false) {
        return
    }
    // send
    var xhr = function (callbacks, userCallbacks) {
        return $[method](url, data, function (response) {
            runCallback(callbacks.response.success, AuthModal, response)
            runCallback(userCallbacks.response.success, AuthModal, response)
        }, 'json').done(function () {
            runCallback(callbacks.ajax.done, AuthModal, xhr)
            runCallback(userCallbacks.ajax.done, AuthModal, xhr)
        }).fail(function (response) {

            if (response.responseJSON) {
                var json = response.responseJSON
                if (json.data) {
                    AuthModal.input.handleErrors(json.data)
                }
            }

            runCallback(callbacks.ajax.fail, AuthModal, xhr)
            runCallback(userCallbacks.ajax.fail, AuthModal, xhr)
        }).always(function () {
            AuthModal.Form.enable()
            runCallback(callbacks.ajax.always, AuthModal, xhr)
            runCallback(userCallbacks.ajax.always, AuthModal, xhr)
        })
    }(callbacks, userCallbacks)
}
