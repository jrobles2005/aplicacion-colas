const fs = require('fs');
class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;

    }
}

class TicketControl {
    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];


        //console.log(this.hoy);

        let data = require('../data/data.json');
        //cada nuevo dia se reinicia el proceso
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarContadores();
        }


    }

    siguiente() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;

    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;

    }
    getUltimos4() {
        return this.ultimos4;
    };





    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay mas tickets';
        }

        let numeroTicket = this.tickets[0].numero;
        //eliminamos el primer elemento del array
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.ultimos4.unshift(atenderTicket);
        //si nos pasamos del tamaño máximo eliminamos el último
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1)
        }

        console.log('ultimos4');
        console.log(this.ultimos4);

        this.grabarArchivo();
        return atenderTicket;


    }
    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
    reiniciarContadores() {

        this.ultimo = 0;
        this.grabarArchivo();
        //console.log('Se ha reiniciado el sistema');

        //limpiamos el array de tickets por atender
        this.tickets = [];
        //limpiamos el array de los tickets que estan siendo atendidos
        this.ultimos4 = [];

    }

}


module.exports = {
    TicketControl
}