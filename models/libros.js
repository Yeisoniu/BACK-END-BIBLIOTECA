const {Schema,model}=require('mongoose')
const libroSchema=new Schema({    
    codigo:{
        type:String,
        required:true,
        unique:[true,'Codigo libro ya existe']

    },  
    titulo :{   
        type:String,
        required:[true,'titulo debe tener un nombre']

    },
    ISBN :{   
        type:String,
        required:true,
        unique:[true,'ISBN libro ya existe']
    },
    Paginas:{   
        type:Number
    },
    //relacion muchos a muchos
    Editorial:{
        type:Schema.Types.ObjectId,
        ref:'Editorial'
    },
    Autores:[
        {
            type:Schema.type.objectid,
            ref:'Autor'
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
module.exports = model('libro',libroSchema);