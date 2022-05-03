const express = require('express');
const ip = require('ip');

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
        tipo: "",
        precio: 12000,
        vendidos: 0,
        status: true,
        descripcion: "Laptop de escritorio",
        usuarioId: "0236851",
        universidadId: "Campus Mixcoac",
        interesadosId: [],
        fecha: new Date(),
        categorias: "",
    },
    {
        productoId: "ewpn9w8wfm.f-wefkwe",
        nombre: 'Bicicleta',
        tipo: "",
        precio: 3000,
        vendidos: 0,
        status: true,
        descripcion: "Bicicleta de montaña",
        usuarioId: "0236851",
        universidadId: "Campus Mixcoac",
        interesadosId: [],
        fecha: new Date(),
        categorias: "",
    },
    {
        productoId: "iue87q4hA-AOUHFSD-DFFD",
        nombre: 'Telefono',
        tipo: "",
        precio: 8000,
        vendidos: 0,
        status: true,
        descripcion: "Telefono movil",
        usuarioId: "0236851",
        universidadId: "Campus Mixcoac",
        interesadosId: [],
        fecha: new Date(),
        categorias: "",
    }
]


app.get("/", (req, res) => {
    res.send("Service is Working!");
});


app.post("/login", (req, res) => {
    const {usuarioId, constrasena} = req.body;
    const user = USERS.find(user => user.usuarioId === usuarioId && user.constrasena === constrasena);
    if (!user) {
        res.status(400).send("Usuario o contraseña incorrectos");
    }
    res.send(user);
});

app.post("/register", (req, res) => {
    const {usuarioId, nombre, carrera, email, celular, constrasena} = req.body;
    const user = USERS.find(user => user.usuarioId === usuarioId);
    if (user) {
        res.status(400).send("Usuario ya existe");
    } else {
        USERS.push({
            usuarioId,
            nombre,
            carrera,
            email,
            celular,
            constrasena
        });
        res.send("Usuario registrado");
    }
});

app.get("/posts", (req, res) => {
    res.send(PRODUCTOS);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
    console.log(`Server IP: ${ip.address()}`);
});