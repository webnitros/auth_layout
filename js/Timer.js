/**
 * Запускает отсчет обратного времени в минутах и секундах
 * запускается через AuthModal.Timer.start(4)
 * @type {{countDownDate: null, micro: number, createTime: AuthModal.Timer.createTime, afterTimeOut: AuthModal.Timer.afterTimeOut, inter: null, start: AuthModal.Timer.start, clear: AuthModal.Timer.clear, update: AuthModal.Timer.update, time: number, fun: AuthModal.Timer.fun, resendCode: AuthModal.Timer.resendCode}}
 */
AuthModal.Timer = {
    time: 59,
    micro: 0,
    inter: null,
    start: function (timer) {
        $('.auth_timer_text').show()
        $('.auth_timer_resend').hide()

        this.micro = timer || this.time
        this.createTime(AuthModal.Timer.micro)
        this.clear()
        this.inter = setInterval(' AuthModal.Timer.fun()', 1000)
    },
    clear: function () {
        clearInterval(AuthModal.Timer.inter)
    },
    fun: function () {
        AuthModal.Timer.micro--

        AuthModal.Timer.update()
        if (AuthModal.Timer.micro <= 0) {
            AuthModal.Timer.clear()
            AuthModal.Timer.afterTimeOut()
        }
    },
    update: function () {
        // Get today's date and time
        var now = new Date().getTime()
        // Find the distance between now and the count down date
        var distance = AuthModal.Timer.countDownDate - now
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        var seconds = Math.floor((distance % (1000 * 60)) / 1000)

        if (AuthModal.Timer.micro === 0) {
            minutes = 0
            seconds = 0
        }
        seconds = seconds.toString().padStart(2, '0')
        minutes = minutes.toString().padStart(2, '0')
        var time = minutes + ':' + seconds
        $('.auth_timer').html(time)
    },
    afterTimeOut: function () {
        $('.auth_timer_text').hide()
        $('.auth_timer_resend').show()
    },
    resendCode: function () {
        // Отправляем форму повтроно
        console.log($('#auth_input_phone'))
        $('#auth_input_phone_code').submit()
        $('.auth_input_code').val('')
    },
    countDownDate: null,
    createTime: function (seconds) {
        var today = new Date()
        this.countDownDate = new Date(today.getTime() + (1 * 60 * 60 * 1000))
        this.countDownDate.setSeconds(this.countDownDate.getSeconds() + seconds)
    }
}
