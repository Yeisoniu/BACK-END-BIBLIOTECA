const { request, response } = require('express')
const Prestamo = require('../models/Prestamo')
const Usuario =require('../models/usuario')
const Ejemplar=require('../models/ejemplar')
const Gestor=require('../models/Gestor')
const prestarEjemplar = 
    async (req = request, res = response) => {
    try {
        const{Ejemplar,Usuario,Gestor} = req.body
        const data = {
            Ejemplar,
            Usuario,
            Gestor
        }
        const prestamo =new Prestamos(data)
        await Prestamos.save()
        return res.status(201).json(Prestamos)
    }
    catch {
        console.log(e).status(500).json({e})
    }
}

const devolverEjemplar = 
    async (req = request, res = response) => {

}

const cobrarMulta = 
    async (req = request, res = response) => {

}

const notificarMulta = 
    async (req = request, res = response) => {

}

const consultaPrestamos = 
    async (req = request, res = response) => {

}

const consultaPrestamoPorUsuario = 
    async (req = request, res = response) => {

}

module.exports = {
    prestarEjemplar,
    devolverEjemplar,
    cobrarMulta,
    notificarMulta,
    consultaPrestamos,
    consultaPrestamoPorUsuario 
}