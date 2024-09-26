const { request, response } = require('express');
const { model } = require('mongoose');

require('../models/usuarios')

//crear usuario
const crearUsuario=async (req=request, res=response)=>{
    
    try {
        const body =req.body
        const usuario =new Usuario(body)
        await usuario.save()
        return res.status(201).json(usuario)
    }
    catch(e){
        console.log(e)
        return res.status(500).json({e})
    }
};

//consultar usuario
const ConsultarUsuarioPorID=(req=request, res=response)=>{
    

};
//consultar un usuario
const ConsultarUsuarios=(req=request, res=response)=>{
    

};
//actualizar o editar usuario
const ActualizarUsusario=(req=request, res=response)=>{
    

};
//deshabilitar usuario; delete logico
const DeshabilitarUsuarioPorID=(req=request, res=response)=>{
    

};
model.exports={
    crearUsuario,
    ConsultarUsuarioPorID,
    ConsultarUsuarios,
    ActualizarUsusario,
    DeshabilitarUsuarioPorID
};