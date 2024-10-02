const { request, response } = require('express')
const Prestamo = require('../models/prestamo')
const Usuario =require('../models/usuario')
const Ejemplar=require('..models/ejemplar')
const prestarEjemplar = 
    async (req = request, res = response) => {
    try {
        const{ejemplares,Usuarios}=req.body
        data ={
            ejemplares,
            Usuarios,
            gestor:
        }
        const prestamo =new Prestamo(data)
        await Prestamos.save()
        return res.status(201).json(prestamo)
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
    devolverEjemplar
}