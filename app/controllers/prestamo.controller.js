const db = require("../models");
const Prestamo = db.prestamo;
const Libro = db.libro;
const sequelize = db.sequelize; 

exports.getAll = async (req, res) => res.json(await Prestamo.findAll());

exports.getById = async (req, res) => {
  const obj = await Prestamo.findOne (req.body, { where: { estudiante_id: req.params.id } });
  //const obj = await Prestamo.findByPk(req.params.id);
  obj ? res.json(obj) : res.status(404).json({ msg: "No encontrado" });
};

exports.create = async (req, res) => {
  const t = await sequelize.transaction(); // iniciamos una transacción

  try {
    const idLibro = req.body.libro_id;

    // Paso 1: Buscar el libro y validar disponibilidad
    const libro = await Libro.findByPk(idLibro, { transaction: t });

    if (!libro) {
      await t.rollback();
      return res.status(404).json({ msg: "Libro no encontrado" });
    }

    if (!libro.disponible) {
      await t.rollback();
      return res.status(400).json({ msg: "El libro no está disponible" });
    }

    // Paso 2: Crear el préstamo
    const prestamo = await Prestamo.create(req.body, { transaction: t });

    // Paso 3: Actualizar disponibilidad del libro
    await Libro.update(
      { disponible: false },
      { where: { id_libro: idLibro }, transaction: t }
    );

    await t.commit(); // Confirmamos la transacción
    res.status(201).json({ msg: "Préstamo registrado correctamente", prestamo });

  } catch (error) {
    await t.rollback(); // Revertimos todo si falla algo
    console.error("Error al registrar préstamo:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  const t = await sequelize.transaction(); // iniciamos una transacción

  try {
    const idLibro = req.body.id_libro;

    // Paso 1: Buscar el libro y validar disponibilidad
    const libro = await Libro.findByPk(idLibro, { transaction: t });

    if (!libro) {
      await t.rollback();
      return res.status(404).json({ msg: "Libro no encontrado" });
    }

    if (!libro.disponible) {
      await t.rollback();
      return res.status(400).json({ msg: "El libro no está disponible" });
    }

    // Paso 2: Crear el préstamo
    const prestamo = await Prestamo.create(req.body, { transaction: t });

    // Paso 3: Actualizar disponibilidad del libro
    await Libro.update(
      { disponible: false },
      { where: { id_libro: idLibro }, transaction: t }
    );

    await t.commit(); // Confirmamos la transacción
    res.status(201).json({ msg: "Préstamo registrado correctamente", prestamo });

  } catch (error) {
    await t.rollback(); // Revertimos todo si falla algo
    console.error("Error al registrar préstamo:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  await Prestamo.destroy({ where: { id_prestamo: req.params.id } });
  res.json({ msg: "Eliminado" });
};
