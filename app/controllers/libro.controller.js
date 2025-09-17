const db = require("../models");
const Libro = db.libro;

exports.getAll = async (req, res) => res.json(await Libro.findAll());

exports.getById = async (req, res) => {
  const obj = await Libro.findByPk(req.params.id);
  obj ? res.json(obj) : res.status(404).json({ msg: "No encontrado" });
};

exports.create = async (req, res) => res.status(201).json(await Libro.create(req.body));

exports.update = async (req, res) => {
  await Libro.update(req.body, { where: { id_libro: req.params.id } });
  res.json({ msg: "Actualizado" });
};

exports.delete = async (req, res) => {
  await Libro.destroy({ where: { id_libro: req.params.id } });
  res.json({ msg: "Eliminado" });
};
