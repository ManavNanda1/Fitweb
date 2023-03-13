const express = require("express")
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT  || 8000;
const path = require("path")
const adminroutes = require('./routes/admin')
const loginroutes = require('./routes/login')
const mainroutes = require('./routes/home')
const userroutes = require('./routes/userroutes')
const session = require('express-session');
const fileupload = require('express-fileupload')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:path.join(__dirname,"tmp"),
    createParentPath:true
}))

require("./db");

const static_path = path.join(__dirname , "./view");
app.use('/static',express.static(static_path))
app.set("view engine","hbs");
app.set("views",static_path)
app.use('/',loginroutes)
app.use('/home',mainroutes)
app.use('/user',userroutes)
app.use('/admin',adminroutes)

app.listen(port,()=>{
    console.log(`Server is running at port no ${port}`);
})