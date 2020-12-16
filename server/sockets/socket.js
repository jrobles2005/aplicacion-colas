const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();


io.on('connection', (client) => {

    client.on('SiguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguiente();
        console.log(siguiente);
        callback(siguiente)
    })
    client.on('UltimoTicket', (data, callback) => {

        let ultimo = ticketControl.getUltimoTicket();
        let ultimos = ticketControl.getUltimos4();
        let resp = {
            ultimo,
            ultimos
        }
        callback(resp);
    })
    client.on('atenderTicket', (data, callback) => {


        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);

        //actualizar cambios en los ultimos 4
        //emitir ultimos 4
        client.broadcast.emit('Ultimos4', ticketControl.getUltimos4());
    });





});