const { request, response } = require('express')
const Gestor = require('../models/Gestor')
const bcryptjs =require ('bcryptjs')
const { generarToken } = require('../utils/generar-token')
const crearGestor =async(req = request, res = response) => {
    try {
        //por medio de la libreria bycripst se encripta contraseñas
        const {documento, nombre, password} = req.body
        const data = {
            documento, 
            nombre, 
            password
        }
        const gestor = new Gestor(data)
        // encriptamos
        const salt = bcryptjs.genSaltSync()
        console.log(salt)
        gestor.password = bcryptjs.hashSync(password, salt)
        console.log(gestor.password)
        gestor.enabled = true

        const gestorBD = await Gestor.findOne({documento})
        if(gestorBD){
            return res.status(400).json({msj:'Ya existe este gestor'})

        }
        await gestor.save()
        return res.status(201).json(gestor)
    }
    catch(e) {
        console.log(e)
        return res.status(500).json({e})
}
}

const loguear =async(req = request, res = response) => {
    const {documento, password} = req.body

    const gestorDB = await Gestor.findOne({
        documento
    })

    if(!gestorDB) {
        return res.status(401).json({msj: 'No existe usuario'})
    }
    if(!gestorDB.enabled){
        return res.status(401).json({msj: 'Usuario deshabilitado'})
    }
    const passwordEsValido = bcryptjs.compareSync(password, gestorDB.password)
    if(!passwordEsValido) {
        return res.status(400).json({msj: 'Credenciales inválidas'})
    }
    const token = await generarToken(documento)

    return res.json({
        gestorDB,
        token
    })

}



module.exports ={
    crearGestor,
    loguear

}
/// comando para cifrar cntraseñas  npm i bcryptjs
// comando npm i jsonwebtoken yeison web tokin cifrado norma de contraseña no es segura es el ejemplo