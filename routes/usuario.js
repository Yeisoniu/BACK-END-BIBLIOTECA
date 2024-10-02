const {Router}=require('express')
const {
    crearUsuario,
    consultarUsuarioPorID,
    consultarUsuarios,
    actualizarUsuario,
    deshabilitarUsuarioPorID}=require('../controllers/usuarioController')
const { validarToken } = require('../middlewares/validar-token')
const router =Router()

//GET CONSULTAS,POST CREAR ,PUT,PATCH ACTUALIZACIONES ,DELETE BORRAR ,...
router.post('/',[validarToken], crearUsuario)


router.get('/',[validarToken], consultarUsuarios)

router.get('/:id',[validarToken], consultarUsuarioPorID)

router.put('/:id' ,[validarToken], actualizarUsuario)

router.patch('/:id',[validarToken], deshabilitarUsuarioPorID )

module.exports =router