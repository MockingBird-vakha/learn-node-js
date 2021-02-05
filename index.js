const express = require("express");
const mongoose = require("mongoose")

const Port = process.env.Port || 3000

const app = express();
  
async function start(){
    try{
        await mongoose.connect('',{
            useNewUrlParser:true,
            useFindAndModify:false
        })
        app.listen(Port, () => {
            console.log('server has been starteed...')
        })
    }catch(e){
        console.log(e)
    }
}

start()