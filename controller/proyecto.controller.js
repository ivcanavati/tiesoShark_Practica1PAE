const db = require("../models");
const Proyecto = db.proyectos;
 
// Crea un proyecto nuevo
exports.create = (req, res) => {
    /*if (!req.body.nombre) {
        res.status(400).send({ message: "Falta el nombre" });
        return;
      }*/
    const proyecto = new Proyecto({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        ventas: req.body.ventas,
        porcentajeOfertado: req.body.porcentajeOfertado,
        cantidadRecolectar: req.body.cantidadRecolectar,
        alumnos: req.body.alumnos,
        status: req.body.status ? req.body.status : null,
      });

    proyecto
    .save(proyecto)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrio un error al crear el proyecto."
      });
    });
};

// Trae todos los proyectos registrados en la base de datos.
exports.findAll = (req, res) => {
const nombre = req.query.nombre;
  var condition = nombre ? { nombre: { $regex: new RegExp(nombre), $options: "i" } } : {}; //Utilizamos la expresion regular case insensitive para que traiga todo 
  Proyecto.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrio un error en la busqueda de todos los proyectos."
      });
    });
};

// Busqueda por nombre de proyecto
exports.findOne = (req, res) => {
  const nombre = req.params.nombre;
  Proyecto.find({ nombre: nombre })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "No se encontro ningun proyecto con el nombre  " + nombre });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error al buscar un proyecto con el nombre " + nombre });
    });
};

// Modificar un proyecto por nombre
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Sin cambios. Por favor introduzca nuevos datos."
        });
      }
      const nombre = req.params.nombre;
      Proyecto.findOneAndUpdate({ nombre: nombre }, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: "No se encontro un proyecto con ese nombre."
            });
          } else res.send({ message: "Modificacion al proyecto exitosa." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error al intentar modificar el proyecto con el nombre " + nombre
          });
        });
};

// Borrar un proyecto por nombre
exports.delete = (req, res) => {
    const nombre = req.params.nombre;
  Proyecto.findOneAndRemove({ nombre: nombre })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: "No se encontro ningun proyecto con el nombre" + nombre
        });
      } else {
        res.send({
          message: "Se elimino el proyecto " + nombre + " de manera exitosa."
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al intentar eliminar el proyecto " + nombre
      });
    });
};

// Borrar todos los proyectos
exports.deleteAll = (req, res) => {
    Proyecto.deleteMany({})
    .then(data => {
      res.send({
        message: `Un total de ${data.deletedCount} proyectos han sido eliminados exitosamente.`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrio un error al intentar eliminar todos los proyectos."
      });
    });
};

// Aceptar el proyecto
exports.updateAccept = (req, res) => {
  if (!req.body) {
      return res.status(400).send({
        message: "Sin cambios. Por favor introduzca nuevos datos."
      });
    }
    const nombre = req.params.nombre;
    Proyecto.findOneAndUpdate({ nombre: nombre }, { status: "Aceptado" }, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: "No se encontro un proyecto con ese nombre."
          });
        } else res.send({ message: "El proyecto " + nombre + " ha sido aceptado." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error al intentar aceptar el proyecto con el nombre " + nombre
        });
      });
};

// Rechazar el proyecto
exports.updateReject = (req, res) => {
  if (!req.body) {
      return res.status(400).send({
        message: "Sin cambios. Por favor introduzca nuevos datos."
      });
    }
    const nombre = req.params.nombre;
    Proyecto.findOneAndUpdate({ nombre: nombre }, { status: "Rechazado" }, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: "No se encontro un proyecto con ese nombre."
          });
        } else res.send({ message: "El proyecto " + nombre + " ha sido rechazado." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error al intentar rechazar el proyecto con el nombre " + nombre
        });
      });
};