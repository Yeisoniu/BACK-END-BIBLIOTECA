const { request, response } = require('express')
const Prestamo = require('../models/Prestamo')
const Usuario =require('../models/usuario')
const Ejemplar=require('../models/ejemplar')
const Gestor=require('../models/Gestor')
const schedule = require('node-schedule')
const dayjs = require('dayjs')

//usar para consultas y devoluciones
const job = schedule.scheduleJob(process.env.CRON, async () => {
    console.log('Actualizando multas')
    let prestamos = []
    prestamos = await Prestamo.find({ fechaDevolucion: null })

    const hoy = new Date()
    prestamos.forEach(async (prestamo) => {
        let multa = prestamo.multa
        let multaPagada = prestamo.multaPagada
        if (prestamo.fechaADevolver < hoy) {
            //  se peuden hacer operaciones entre actualizaciones
            const dias = dayjs().diff(prestamo.fechaADevolver, 'day')
            multa = dias*Number(process.env.MULTA_POR_DIA)
            multaPagada = false
        }
        const cambios = {
            multa,
            multaPagada
        }
        await Prestamo.findByIdAndUpdate(prestamo._id, cambios)
    })
})

const prestarEjemplar = 
    async (req = request, res = response) => {
    try {
        const{ejemplar,usuario} = req.body
        const uid =req.uid
        

        //validar
        //los datos de const no deben ser iguales a la data pero si
        //quiere puede dajarlos igual para disminuir codigo
        const usuarioBD=await Usuario.findById(usuario._id)
        if(!usuarioBD){
            return res.status(404).json({e:'Usuario no existe'})
        }
        //validar libro existe
        const ejemplarBD=await Ejemplar.findById(ejemplar._id)
        if(!ejemplarBD){
            return res.status(404).json({e:'Ejemplar no existe'})   
        }       
        //5. gestor valido

        const gestorBD=await Gestor.findOne({documento:uid})
        if(!gestorBD){
            return res.status(404).json({e:'Gestor no existe'})
        }
//0.no este prestado el ejemplar
        const prestamoPorEjemplar =await Prestamo.find({
            $and : [
                { ejemplares : ejemplarBD },
                { fechaDevolucion : null }
            ]
        })
        if(prestamoPorEjemplar && prestamoPorEjemplar.length>0){
            return res.status(404).json({e:'Ya esta prestado'})
        }
        // 1.no pasarse el limite de prestamos por usuario
        let prestamosDBporUsuario= []
        prestamosDBporUsuario = await Prestamo.find({
                 usuario : usuarioBD ,
        })
        const prestamosNoDevueltos = prestamosDBporUsuario.filter(prest =>
            prest && !prest.fechaDevolucion)

        const cantNoDevueltos = prestamosNoDevueltos.length
        const maximos =Number(process.env.PRESTAMOS_MAX)
        if(cantNoDevueltos >= maximos){
        
            return res.status(404).json({e:'el usuario no puede tener mas ejemplares'})
        }

            //2. que el usuario no tenga multas
       const prestamosConMultas =
            prestamosDBporUsuario.filter(prest => !prest.MultaPagada && prest.multa > 0)
        const cantConMultas = prestamosConMultas.length
        if(cantConMultas > 0){
            return res.status(404).json({ msj: 'El usuario tiene multas' });
        }
        //validacion
        //2. que el usuario no tenga multas
        //3. que el usuario no tenga prestamos pendientes
        //4. que sea un ejemplar valido
        //5. gestor valido
        //6.horario de atencion
        const hoy = new Date()
        const horaActual = hoy.getHours()
        if(horaActual < process.env.HORA_INICIAL_PRESTAMO
            || horaActual > process.env.HORA_FINAL_PRESTAMO
        ) {
            return res.status(400).json({
                msj: `Está fuera del horario de préstamos, es:
                de ${process.env.HORA_INICIAL_PRESTAMO} a ${process.env.HORA_FINAL_PRESTAMO}`
            })
        }
        const data ={
            ejemplar : ejemplarBD,
            usuario : usuarioBD,
            gestor: {
                _id: gestorBD._id
            }
        }
        const prestamo =new Prestamo(data)
        await prestamo.save()
        return res.status(201).json(prestamo)

        //6.horario de atencion
        
    }
    catch(e) {console.log(e)
            return res.status(500).json({e:'algo anda mal'})
          }
}

const devolverEjemplar = 
    async (req = request, res = response) => {
        try {
            const uid = req.uid
            const id = req.params.id
            const gestorBD = await Gestor.findOne({documento : uid})
            if(!gestorBD) {
                return res.status(400).json({
                    msj: 'Gestor no existe'
                })
            }

            let data = {
                gestorDevolucion: gestorBD
            }

            data.fechaDevolucion = new Date()
   
            const prestamo = 
                await Prestamo.findByIdAndUpdate(id, data, {new : true})
            return res.status(201).json(prestamo)
        } catch(e) {
            console.log(e)
            return res.status(500).json({e})
        }
}
const cobrarMulta = 
    async (req = request, res = response) => {
        try {
            const uid = req.uid
            const id = req.params.id
            const gestorBD = await Gestor.findOne({documento : uid})
            if(!gestorBD) {
                return res.status(400).json({
                    msj: 'Gestor no existe'
                })
            }

            let data = {
                gestorCobra: gestorBD
            }

            data.multaPagada = true
            data.fechaCobro = new Date()
            const prestamo = 
                await Prestamo.findByIdAndUpdate(id, data, {new : true})
            return res.status(201).json(prestamo)
        } catch(e) {
            console.log(e)
            return res.status(500).json({e})
        }
}

// const notificarMulta = 
//     async (req = request, res = response) => {

// }

const consultaPrestamos = 
    async (req = request, res = response) => {
    try {
      const prestamos = await Prestamo.find()
       return res.json(prestamos)
     } catch(e) {
        console.log(e)
        return res.status(500).json({e})
    }
}
const consultaPrestamoPorUsuario = 
    async (req = request, res = response) => {
    try {
       const { id } = req.params
       const usuarioBD = await Usuario.findById(id)
       if(!usuarioBD) {
        return res.status(400).json({
            msj: 'Usuario no existe'
        })
       }
       const prestamos = await Prestamo.find({usuario: usuarioBD})
       return res.json(prestamos)
    } catch(e) {
        console.log(e)
        return res.status(500).json({e})
    } 
}

const consultarPrestamosPorUsuarioYestado =
    async (req = request, res = response) => {
    try {
        const { id, estado } = req.params
        const usuarioBD = await Usuario.findById(id)
        const fechaDevolucion = 
            (estado === 'activo') ? { $ne : null } : null
        if(!usuarioBD) {
            return res.status(400).json({
                msj: 'Usuario no existe'
            })
        }
        const prestamos = await Prestamo.find({
                usuario : usuarioBD,
                fechaDevolucion
            })
        return res.json(prestamos)
        } catch(e) {
            console.log(e)
            return res.status(500).json({e})
        } 

}

module.exports = {
    prestarEjemplar,
    devolverEjemplar,
    cobrarMulta,
    // falto agregar email notificarMulta,
    consultaPrestamos,
    consultaPrestamoPorUsuario,
    consultarPrestamosPorUsuarioYestado
}