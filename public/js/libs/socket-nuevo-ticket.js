//comando para establecer la conexion
var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado al servidor');

});
//Escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexion con el servidor');
})

//listener al boton 
$('button').on('click', function() {
    socket.emit('SiguienteTicket', null, function(resp) {
        //console.log('Siguiente ticket:', resp);
        label.text(resp);

    })
})

//listener load documento
$(document).ready(function() {
    socket.emit('UltimoTicket', null, function(resp) {
        //console.log('Siguiente ticket:', resp);
        label.text(resp.ultmo);

    })
});