const {Router} = require('express')
const {
    prestarEjemplar,
    devolverEjemplar,
    cobrarMulta,
    notificarMulta,
    consultaPrestamos,
    consultaPrestamoPorUsuario,
    consultarPrestamosPorUsuarioYestado 
} = require('../controllers/prestamoController')
const { validarToken } = require('../middlewares/validar-token')

const router = Router()

router.post('/', [validarToken],prestarEjemplar)
router.get('/', [validarToken], consultaPrestamos)
router.get('/:id/usuario', [validarToken], consultaPrestamoPorUsuario)
router.put('/:id', [validarToken], devolverEjemplar)
router.put('/cobrar/:id', [validarToken], cobrarMulta)
router.get('/:id/usuarios/:estado', [validarToken], consultarPrestamosPorUsuarioYestado)


module.exports = router