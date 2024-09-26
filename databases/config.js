const mongoose =require('mongoose')

const mongoConnect =async ()=> {
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            dbName:'Biblioteca-iud'
        })
        console.log('Successful Connetion!')
    }catch(e){
        console.warn('Connection Error', e)
        throw new Error ('Conection error')
    }

}
module.exports={mongoConnect}