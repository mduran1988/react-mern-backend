const {Router} = require('express');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validate-jwt');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/fields-validators');
const { isDate } = require('../helpers/isDate');
const router = Router();

// Indica que cualquier peticion debe tener que tenga su token
//esto evita ponerlo en cada operacion o endpoint
// Si esta instruccion la puedes mover para determinar que endpoint van a ser publicos o privados
router.use(validarJWT);

router.get('/', getEventos);

router.post('/',[
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatorio').custom(isDate),
    check('end', 'Fecha final es obligatorio').custom(isDate),
    validarCampos
], crearEvento );

router.put('/:id', actualizarEvento);

router.delete('/:id', eliminarEvento );

module.exports = router;


//todas tienes que pasar por la validacion del JWT
//obtener eventos
//ANTES 
/* router.get('/', [validarJWT], getEventos);
router.post('/',[validarJWT], crearEvento );
router.put('/:id', [validarJWT], actualizarEvento);
router.delete('/:id',[validarJWT], eliminarEvento ); */