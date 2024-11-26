const { Schema, model} = require("mongoose");

const EventoSchema = Schema({
    title: {
        type: String,
        required:true
    },
    notes: {
        type:String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});


//Cuando se inserta en la base de datos de mongodb se crean nuevas campos
//o campos que queremos personalizar lo cual es necesario hacer unas modificaciones al modelo
//hacer la serializacion

EventoSchema.method('toJSON', function() {
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});


module.exports = model('Evento', EventoSchema);