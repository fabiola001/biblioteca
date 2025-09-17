//Utilizamos module.export para exportar objetos para que puedan ser utilizados en otras clases
module.exports = (sequelize, Sequelize) => {
    // usamos el sequelize.defina para "definir" el nombre de la entity en la BD, en este caso "libro"
    // Usamos type.Sequelize para definir el tipo de datos de cada atributo de la entidad 
    const Prestamo = sequelize.define("prestamo", {
        id_prestamo: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        libro_id: {
            type: Sequelize.INTEGER
        },
        estudiante_id: {
            type: Sequelize.INTEGER
        },

        fecha_prestamo: {
            type: Sequelize.DATE
          },

        fecha_devolucion: {
            type: Sequelize.DATE,
            allowNull: true

                  

        }
    });
    return Prestamo;
};