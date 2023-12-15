import { timeStamp } from "console";
import { Schema, model, models } from "mongoose";

const taskSchema = new Schema({
    nombre: {
        type: String,
        //required: [true, 'El titulo es requerido'],
        //unique: true,
        trim: true,
    },
    lugar: {
        type: String,
        //required: [true, 'La descripcion es requerida'],
        trim: true,
    },
    lat: {
        type: Number
    },
    lon: {
        type: Number
    },
    organizador: {
        type: String
    },
    imagen: {
        type: String
    },
    fecha_inicio: {
        type: Date
    }
}, {
    timestamps: true,
    versionKey: false,
    collection: 'info_evento'
})

export default models.Task || model('Task', taskSchema)