const {Schema,model}=require('mongoose')
const PrestamosSchema= Schema({    
    ejemplares:{
        type: Schema.Types.ObjectId,
        ref:'Ejemplar',
        required:true
    },
    Usuarios:{
            type: Schema.Types.ObjectId,
            ref:'Usuario',
            required:true
        }
    ,
    //datos de fecha prestamo
    FechaADevolver:{
        type:Date,
        default:new Date()
       //automatico 15 dias + 

    },


    FechaPrestamos :{
        type:Date,
        
        required:true,
        default:(new Date()).getDate()+15
    },
    FechaDevolucion :{
        type:Date,

    },
    Gestor:{  
            type:Schema.Types.ObjectId,
            ref:'Gestor',
            required:true
    },
    Multa:{
        type:Number,
        default: 0
       //automatico   despues de haber passado el tiempo
     
    },
    MultaPagada:{
        type:Boolean,
    }, 
    });
module.exports = model('Prestamos',PrestamosSchema);