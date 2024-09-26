const {Schema,model}=require('mongoose')
const LocalizacionesSchema=new Schema({    
    Seccion :{   
        type:Number,
        required:[true,'Seccion debe asignarse ']

    },
    Estanteria :{   
        type:Number,
        required:[true,'Estanteria debe asignarse']
    },
    //datos de auditoria
    FechaCreacion :{
        type:Date,
        default:new Date()
    },
    FechaActualizacion :{
        type:Date,

    },


})
LocalizacionesSchema.index({seccion:1, Estanteria: 1},{inique:true})
model.exports = model('Localizaciones',LocalizacionesSchema);