let socket = io()

$(() => {

    socket.on('login_failed', () => {
        $('#wrongPass').show()
    })

    socket.on('add_user', (data) => {
        $('#inpToUser').append(`<option value="${data.name}">${data.name}</option>`)
    })

    let username = ''
    let btnStart = $('#btnStart')
    let inpUsername = $('#inpUsername')
    let addUsername = $('#addUsername')

    // Login feature

    function login() {
        $('#wrongPass').hide()
        socket.emit('login', {
            username: inpUsername.val(),
            password: $('#inpPassword').val()
        })
        addUsername.text('@ ' + inpUsername.val())
        username = inpUsername.val()
    }

    btnStart.click(() => {
        login()
    })

    inpUsername.keyup((event) => {
        if(event.keyCode == '13'){
            login()
        }
    })

    socket.on('logged_in', () => {
        $('#loginBox').hide()
        $('#chatBox').show()
    })

    let btnSend = $('#btnSend')
    let ulMsgList = $('#ulMsgList')
    let inpMsg = $('#inpMsg')

    // Send message feature

    function send() {
        if(inpMsg.val() == ''){
            return
        }
        socket.emit('msg_send', { msg: inpMsg.val(), user: socket.id, to: $('#inpToUser').val(), from: username })
        inpMsg.val('')
        $('#inpToUser').val('')
    }

    inpMsg.keyup((event) => {
        if(event.keyCode == '13'){
            send()
        }
    })

    btnSend.click(() => {
        send()
    })
    
    socket.on('msg_rcvd', (data) => {
        if(data.user == socket.id){
            ulMsgList.append(`
            <li class="list-group-item  list-group-item-success d-flex justify-content-between align-items-center">
                ${data.msg}
                <span class="badge badge-primary badge-pill">You</span>
            </li>
        `)
        }else{
            ulMsgList.append(`
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span class="badge badge-primary badge-pill">${data.from}</span>
                ${data.msg}
            </li>
        `)
        }
    })
})