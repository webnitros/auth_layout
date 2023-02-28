const {series, task, src, dest, watch} = require('gulp')
var header = require('gulp-header')
var footer = require('gulp-footer')

const uglify = require('gulp-uglify'),
    concat = require('gulp-concat')

const log = require('fancy-log')

const dist = './assets/components/auth/js/web/dist/'

const pathFile = [
    './inc/auth/js/Setup.js',
    './inc/auth/js/Initialize.js',
    './inc/auth/js/Message.js',
    './inc/auth/js/Callbacks.js',
    './inc/auth/js/Controller.js',
    './inc/auth/js/Action.js',
    './inc/auth/js/Modal.js',
    './inc/auth/js/Auth.js',
    './inc/auth/js/Form.js',
    './inc/auth/js/Send.js',
    './inc/auth/js/Timer.js',
    './inc/auth/js/Provider.js',
    './inc/auth/js/NotificationInStock.js',
    './inc/auth/js/ViewPort.js',
    './inc/auth/js/Validate.js',
    './inc/auth/js/Input.js',
    './inc/auth/js/Mask.js',
    './inc/auth/js/Spinner.js',
    './inc/auth/js/Error.js',
    './inc/auth/js/Forward.js',
    './inc/auth/js/modules/placeholder.js',
    './inc/auth/js/template/orderPhoneConfirmation.js',
    './inc/auth/js/document.ready.js'
]

function logs (filename) {
    log.info('Файл создан: /assets/components/auth/js/web/dist/' + filename)
}

function fileInitJs (resFile, filename, flagUglify = false) {
    if (flagUglify) {
        src(resFile)
            .pipe(uglify())
            .pipe(concat(filename))
            .pipe(dest(dist))
            .on('end', () => logs(filename))
    } else {
        src(resFile)
            .pipe(concat(filename))
            .pipe(header('(function (window, document, $, authModalConfig) {\n var AuthModal = AuthModal || {} \n'))
            .pipe(footer('\n window.AuthModal = AuthModal;\n })(window, document, jQuery, authModalConfig)'))
            .pipe(dest(dist))
            .on('end', () => logs(filename))
    }
}

task('js_min', function (cb) {
    fileInitJs(pathFile, 'default.min.js', true)
    cb()
})

task('js', function (cb) {
    fileInitJs(pathFile, 'default.js', false)
    cb()
})

exports.build = series('js_min', 'js')

function startWatch () {
    log.info('Запуск отслеживание изменений в файлах')
    const watchFile = [].concat(pathFile)
    watch(watchFile, series('js'))
}

exports.watch = startWatch
