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
        productoId: 6564398733,
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
        productoId: 275683938,
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
        productoId: 664733047463,
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
    res.send("Bienvenido a la API de la Universidad");
});

app.post("/login", (req, res) => {
    const {usuarioId, constrasena} = req.body;
    const user = USERS.find(user => user.usuarioId === usuarioId && user.constrasena === constrasena);
    if (!user) {
        res.status(400).send("Usuario o contraseña incorrectos");
    }
    res.send(JSOS.stringify(user));
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
        res.send(JSON.stringify({message: "Usuario registrado"}));
    }
});

app.get("/posts", (req, res) => {
    //remplazar por el id del usuario
    for (let i = 0; i < PRODUCTOS.length; i++) {
        const userid = PRODUCTOS[i].usuarioId;
        const index = USERS.findIndex(user => user.usuarioId === userid);
        if (index !== -1) {
            PRODUCTOS[i].usuario = USERS[index];
        }
    }
    res.send(JSON.stringify(PRODUCTOS));
});

app.post("/posts", (req, res) => {
    const {nombre, tipo, precio, status, descripcion, usuarioId, categorias} = req.body;

    PRODUCTOS.push({
        productoId: Math.random() * (10000),
        nombre,
        tipo,
        precio,
        vendidos: 0,
        status,
        descripcion,
        usuarioId,
        universidadId: "Campus Mixcoac",
        interesadosId: [],
        fecha: new Date(),
        categorias
    });
    res.send(JSON.stringify(PRODUCTOS[PRODUCTOS.length - 1]));
});

app.put("/posts", (req, res) => {
    const {productoId, nombre, tipo, precio, status, descripcion, usuarioId, categorias} = req.body;
    const producto = PRODUCTOS.find(producto => producto.productoId === productoId);
    if (!producto) {
        res.status(400).send("Producto no encontrado");
    } else {
        const index = PRODUCTOS.indexOf(producto);

        const newProduct = {
            productoId,
            nombre,
            tipo,
            precio,
            vendidos: 0,
            status,
            descripcion,
            usuarioId,
            universidadId: PRODUCTOS[index].universidadId,
            interesadosId: PRODUCTOS[index].interesadosId,
            fecha: PRODUCTOS[index].fecha,
            categorias
        };

        PRODUCTOS[index] = newProduct;
        res.send(JSON.stringify({message: "Producto actualizado"}));
    }

});

app.delete("/posts", (req, res) => {
    const {productoId} = req.body;
    const producto = PRODUCTOS.find(producto => producto.productoId === productoId);
    if (!producto) {
        res.status(400).send("Producto no encontrado");
    } else {
        const index = PRODUCTOS.indexOf(producto);
        PRODUCTOS.splice(index, 1);
        res.send(JSON.stringify({message: "Producto eliminado"}));
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
    console.log(`Server IP: ${ip.address()}`);
});