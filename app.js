const dotenv = require('dotenv') // importando dotenv
dotenv.config()

const express =require('express')

const app =express()

const cors= require('cors')
//todo:migrar a app.js
const { mongoConnect } = require('./databases/config')
mongoConnect()

// middlewares
app.use(cors(
    {
        origin:'*',
        methods:['GET' , 'POST' , 'PUT' ,'DELETE'],
        allowedHeaders:['Content-Type','token' ,'Authorization'],
        credentials: true
    }
))
app.use(express.json())
app.use(express.urlencoded({extended:false }))
//rutas
const usuarios =require('./routes/usuario')
const gestores =require('./routes/gestor')

app.use('/api/v1/usuarios' , usuarios)
app.use('/api/v1/gestores' , gestores)

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.get('*',(req, res) =>{ // funcion para enviar a postrman una funcion de mensaje no encontrado
    return res.status(404).json({
        msj:'No encontrado',
        status: 404
    })
})
    

module.exports= app
