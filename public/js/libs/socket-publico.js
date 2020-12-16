//comando para establecer la conexion
var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEsc1 = $('#lblEscritorio1');
var lblEsc2 = $('#lblEscritorio2');
var lblEsc3 = $('#lblEscritorio3');
var lblEsc4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [lblEsc1, lblEsc2, lblEsc3, lblEsc4];


socket.emit('UltimoTicket', null, function(resp) {
    console.log('Ultimo Ticket:', resp);
    //label.text(resp);
    actualizaHTML(resp.ultimos)

})


//evento on Ulltimos4

socket.on('Ultimos4', function(resp) {

    var audio = new Audio('audio/new-ticket.mp3');
    let playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise
            .then(_ => {
                // Automatic playback started!
                // Show playing UI.
            })
            .catch(error => {
                // Auto-play was prevented
                // Show paused UI.
                console.log('Error con la reproducción.');
            });
    }
    actualizaHTML(resp);
})

function actualizaHTML(ultimos4) {
    console.log(ultimos4);
    for (var i = 0; i < ultimos4.length; i++) {
        lblTickets[i].text('Ticket ' + ultimos4[i].numero);
        lblEscritorios[i].text('Escritorio ' + ultimos4[i].escritorio);

    }

}