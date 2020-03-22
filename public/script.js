let socket = io()

$(() => {
    let btnSend = $('#btnSend')
    let ulMsgList = $('#ulMsgList')
    let inpMsg = $('#inpMsg')

    function send() {
        socket.emit('msg_send', { msg: inpMsg.val(), user: socket.id })
        inpMsg.val('')
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
                <span class="badge badge-primary badge-pill">${data.user}</span>
                ${data.msg}
            </li>
        `)
        }
    })
})