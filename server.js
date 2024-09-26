const dotenv =require('dotenv')//importando dotenv
dotenv.config()
const express =require('express')
const app =express()

//todo:migrar a app.js
const { mongoConnect } = require('./databases/config')
mongoConnect()
app.set('port',process.env.PORT || 3002)
// console.log('Sistema de Biblioteca IU Digital')
// console.log(process.env.PORT)

app.listen(app.get('port'),()=>{
    console.log('arranco la app por el puerto '+ app.get('port'))
})