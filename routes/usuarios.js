const {Router}=require('express')
const {
    crearUsuario,
    ConsultarUsuarioPorID,
    ConsultarUsuarios,
    ActualizarUsusario,
    DeshabilitarUsuarioPorID
}=require('../controller/usuariosController')
const router =Router()
router.post('/', crearUsuario)
module.exports =router