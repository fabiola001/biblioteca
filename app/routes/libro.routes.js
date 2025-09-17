module.exports = app => {
    const libro = require("../controllers/libro.controller.js");
    var router = require("express").Router();
    // Create a new Client
    router.post("/create/", libro.create);
    // Retrieve all Client
    router.get("/", libro.getAll);
    // Retrieve a single Client with id
    router.get("/:id", libro.getById);
    // Update a Client with id
    router.put("/update/:id", libro.update);
    // Delete a Client with id
    router.delete("/delete/:id", libro.delete);

    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/cliente/
    app.use("/api/book", router);
};