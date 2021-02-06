const express = require("express");
const mongoose = require("mongoose")
const path = require('path')
const expHbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')

const Port = process.env.Port || 3000

const app = express();
const hbs = expHbs.create({
    defaultLayout:'main',
    extname:'hbs'
})  

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended:true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(todoRoutes)

async function start(){
    try{
        await mongoose.connect(
            'mongodb+srv://vakhid:vakhid123@cluster0.42yue.mongodb.net/todos',{
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