module.exports = app => {
    const estudiante = require("../controllers/estudiante.controller.js");
    var router = require("express").Router();
    // Create a new Client
    router.post("/create/", estudiante.create);
    // Retrieve all Client
    router.get("/", estudiante.getAll);
    // Retrieve a single Client with id
    router.get("/:id", estudiante.getById);
    // Update a Client with id
    router.put("/update/:id", estudiante.update);
    // Delete a Client with id
    router.delete("/delete/:id", estudiante.delete);

    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/cliente/
    app.use("/api/student", router);
};