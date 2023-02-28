authModalConfig.callbacksObjectTemplate = function () {
    return {
        // return false to prevent send data
        before: [],
        response: {
            success: [],
            error: []
        },
        ajax: {
            done: [],
            fail: [],
            always: []
        }
    }
}

AuthModal.Callbacks = authModalConfig.Callbacks = {
    Auth: {
        logout: authModalConfig.callbacksObjectTemplate(),
        modal: authModalConfig.callbacksObjectTemplate(),
    },
    Settings: {
        profile: authModalConfig.callbacksObjectTemplate(),
        password: authModalConfig.callbacksObjectTemplate(),
        phone_change: authModalConfig.callbacksObjectTemplate(),
    },
    Phone: {
        code: authModalConfig.callbacksObjectTemplate(),
        confirmation: authModalConfig.callbacksObjectTemplate(),
        check: authModalConfig.callbacksObjectTemplate(),
    },
    Email: {
        login: authModalConfig.callbacksObjectTemplate(),
        passwordReset: authModalConfig.callbacksObjectTemplate(),
    },
    Provider: {
        interrogate: authModalConfig.callbacksObjectTemplate(),
    },
    NotificationInStock: {
        subscribe: authModalConfig.callbacksObjectTemplate(),
    },
}

AuthModal.Callbacks.add = function (path, name, func) {
    if (typeof func != 'function') {
        return false
    }
    path = path.split('.')
    var obj = AuthModal.Callbacks
    for (var i = 0; i < path.length; i++) {
        if (obj[path[i]] == undefined) {
            return false
        }
        obj = obj[path[i]]
    }
    if (typeof obj != 'object') {
        obj = [obj]
    }
    if (name != undefined) {
        obj[name] = func
    } else {
        obj.push(func)
    }
    return true
}

AuthModal.Callbacks.remove = function (path, name) {
    path = path.split('.')
    var obj = AuthModal.Callbacks
    for (var i = 0; i < path.length; i++) {
        if (obj[path[i]] == undefined) {
            return false
        }
        obj = obj[path[i]]
    }
    if (obj[name] != undefined) {
        delete obj[name]
        return true
    }
    return false
}
