const {Router}=require('express')
const {
    crearGestor,
    loguear

} = require('../controllers/gestorController')
const router =Router()
router.post('/', crearGestor)
router.post('/login', loguear)
//GET CONSULTAS,POST CREAR ,PUT,PATCH ACTUALIZACIONES ,DELETE BORRAR ,...
module.exports =router