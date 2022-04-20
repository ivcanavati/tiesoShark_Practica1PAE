module.exports = mongoose => {
    const Proyectos = mongoose.model(
      "proyectos",
      mongoose.Schema(
        {
          nombre: String,
          descripcion: String,
          ventas: Number,
          porcentajeOfertado: Number,
          cantidadRecolectar: Number,
          alumnos: Map,
          status: String
        },
        { timestamps: true }
      )
    );
    return Proyectos;
  };