const {Router} = require('express')
const {
    prestarEjemplar,
    devolverEjemplar,
    cobrarMulta,
    notificarMulta,
    consultaPrestamos,
    consultaPrestamoPorUsuario 
} = require('../controllers/prestamoController')
const { validarToken } = require('../middlewares/validar-token')

const router = Router()

router.post('/', prestarEjemplar)
router.get('/', [validarToken], consultaPrestamos)

module.exports = router