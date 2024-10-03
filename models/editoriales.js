const {Schema,model}=require('mongoose')
const EditorialSchema=Schema({    
    codigo:{
        type:String,
        required:true,
        unique:[true,'Codigo editorial ya existe']
    },
    nombre :{   
        type:String,
        required:[true,'Editorial debe tener un nombre']

    },
    descripcion :{   
        type:String,
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
module.exports = model('Editorial',EditorialSchema);