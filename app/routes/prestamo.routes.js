module.exports = app => {
    const prestamo = require("../controllers/prestamo.controller.js");
    var router = require("express").Router();
    // Create a new Client
    router.post("/create/", prestamo.create);
    // Retrieve all Client
    router.get("/", prestamo.getAll);
    // Retrieve a single Client with id
    router.get("/estudiantes/:id/prestamos", prestamo.getById);
    // Update a Client with id
    router.put("/prestamos/:id", prestamo.update);
    // Delete a Client with id
    router.delete("/delete/:id", prestamo.delete);

    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/cliente/
    app.use("/api/lend", router);
};