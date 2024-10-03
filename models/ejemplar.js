const {Schema, model}=require('mongoose')
const EjemplarSchema= Schema({    
    codigo:{
        type:String,
        required:true,
        unique:[true,'Codigo ejemplar ya existe']

    },  
    Localizacion :{   
        type:Schema.Types.ObjectId,
        ref:'Localizaciones',
        required:true
    },
    Libro :{   
        type:String,
        ref:'libro',
        required:true
    },
    //datos de auditoria
    FechaCreacion :{
        type:Date,
        default:new Date()
    },
    FechaActualizacion :{
        type:Date,

    },

});
module.exports = model('Ejemplar',EjemplarSchema);