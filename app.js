const express = require('express');

const app = express();
app.use(express.json());

const USERS = [
    {
        usuarioId: "0236851",
        nombre: 'Roberto',
        carrera: 'Ing. TI',
        email: "0236851@up.edu.mx",
        celular: "55-55-55-55-55",
        constrasena: "1234"
    },
]

const PRODUCTOS = [
    {
        productoId: "iue87q4hA-AOUHFSD-DFFD",
        nombre: 'Laptop',
        tipo:"",
        precio: 12000,


    }
]


app.get("/", (req, res) => {
    res.send("Service is Working!");
});

app.post("/login", (req, res)=>{
    const {usuarioId, constrasena} = req.body;
    const user = USERS.find(user => user.usuarioId === usuarioId && user.constrasena === constrasena);
    if(!user){
        res.status(400).send("Usuario o contraseña incorrectos");
    }
    res.send(user);
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});