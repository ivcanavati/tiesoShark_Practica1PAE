module.exports = app => {
    const proyectos = require("../controller/proyecto.controller.js");
    var router = require("express").Router();
    
    router.post("/", proyectos.create);
    router.get("/", proyectos.findAll);
    router.get("/:nombre", proyectos.findOne);
    router.put("/:nombre", proyectos.update);
    router.delete("/:nombre", proyectos.delete);
    router.delete("/", proyectos.deleteAll);
    router.put("/aceptado/:nombre", proyectos.updateAccept);
    router.put("/rechazado/:nombre", proyectos.updateReject);

    
    app.use('/api/proyectos', router);
  };