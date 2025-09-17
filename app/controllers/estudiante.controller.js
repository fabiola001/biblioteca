const db = require("../models");
const Estudiante = db.estudiante;

exports.getAll = async (req, res) => res.json(await Estudiante.findAll());

exports.getById = async (req, res) => {
  const obj = await Estudiante.findByPk(req.params.id);
  obj ? res.json(obj) : res.status(404).json({ msg: "No encontrado" });
};

exports.create = async (req, res) => res.status(201).json(await Estudiante.create(req.body));

exports.update = async (req, res) => {
  await Estudiante.update(req.body, { where: { id_estudiante: req.params.id } });
  res.json({ msg: "Actualizado" });
};

exports.delete = async (req, res) => {
  await Estudiante.destroy({ where: { id_estudiante: req.params.id } });
  res.json({ msg: "Eliminado" });
};