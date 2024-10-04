const dayjs = require('dayjs')
const {Schema,model}=require('mongoose')
const PrestamosSchema= Schema({    
    ejemplar:{
        type: Schema.Types.ObjectId,
        ref:'Ejemplar',
        required:true
    },
    usuario:{
            type: Schema.Types.ObjectId,
            ref:'Usuario',
            required:true
        }
    ,
    //datos de fecha prestamo
    fechaADevolver:{
        type:Date,
        default:dayjs().add(15,'days')
       //automatico 15 dias + 

    },


    fechaPrestamo :{
        type:Date,
        default:new Date()
    },
    fechaDevolucion :{
        type:Date

    },
    gestor:{  
            type:Schema.Types.ObjectId,
            ref:'Gestor',
            required:true
    },
    multa:{
        type:Number,
        default: 0
       //automatico   despues de haber passado el tiempo
     
    },
    multaPagada:{
        type:Boolean,
        default:true
    }, 
    });
module.exports = model('Prestamos',PrestamosSchema);