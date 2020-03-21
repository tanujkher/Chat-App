let socket = io()

$(() => {
    let btnSend = $('#btnSend')
    let ulMsgList = $('#ulMsgList')

    btnSend.click(() => {
        let inpMsg = $('#inpMsg').val()
        socket.emit('msg_send', {msg: inpMsg})
        $('#inpMsg').val('')
    })
})