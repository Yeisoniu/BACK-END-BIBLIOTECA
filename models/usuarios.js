const {Schema,model}=require('mongoose')
const UsuarioSchema=new Schema({    
    codigo:{
        type:String,
        required:true,
        unique:[true,'Codigo usuario ya existe']

    },  
    nombre :{   
        type:String,
        required:[true,'Usuario debe tener un nombre']

    },
    telefono :{   
        type:String,
    },
    direccion :{   
        type:String,
    },
    descripcion :{   
        type:String,

    },
    enabled:{
            type:Boolean

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
model.exports = model('Usuario',UsuarioSchema);