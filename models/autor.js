const {Schema,model}=require('mongoose')
const AutorSchema=new Schema({    
    codigo:{
        type:Number,
        required:true,
        unique:[true,'Codigo autor ya existe']

    },
    nombre :{   
        type:String,
        required:[true,'Autor debe tener un nombre']

    },
    descripcion :{   
        type:String,

    },
    //relacion muchos a muchos
    libros:[
        {
            type:Schema.type.objectid,
            ref:'libro'
        }
    ],
    //datos de auditoria
    FechaCreacion :{
        type:Date,
        default:new Date()
    },
    FechaActualizacion :{
        type:Date,

    },

});
module.exports = model('Autor',AutorSchema);