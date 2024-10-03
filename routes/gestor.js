const {Router}=require('express')
const {
    crearGestor,
    loguear

} = require('../controllers/gestorController')
const { validarGestor } = require('../middlewares/validar-gestor')
const router =Router()
router.post('/',[validarGestor], crearGestor)
router.post('/login', loguear)
//GET CONSULTAS,POST CREAR ,PUT,PATCH ACTUALIZACIONES ,DELETE BORRAR ,...
module.exports =router