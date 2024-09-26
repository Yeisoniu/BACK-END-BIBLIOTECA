const {Schema,model}=require('mongoose')
const GestorSchema=new Schema({    
    documento:{
        type:String,
        required:true,
        unique:[true,'Codigo usuario ya existe']

    },  
    nombre :{   
        type:String,
        required:[true,'Usuario debe tener un nombre']

    },
    password :{   
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
model.exports = model('Gestor',GestorSchema);