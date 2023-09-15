module.exports = (Types) => {
  return {
    Id: {
      type: Types.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "Id",
    },
    Nome: {
      type: Types.STRING(255),
      allowNull: false,
    },
    DataNascimento: {
      type: Types.DATE,
      allowNull: false,
    },
    NegocioId: {
      type: Types.INTEGER,
      allowNull: false,

    },
    Genero: {
      type: Types.ENUM('masculino', 'feminino'),
      allowNull: false,
    },
    Geracao: {
      type: Types.ENUM('z', 'y', 'x'),
      allowNull: true,
    },
    InicioCarreira: {
      type: Types.DATE,
      allowNull: false,
    },
    StatusGrupo: {
      type: Types.ENUM('ativo', 'desativo'),
      allowNull: false,
    },
  };
}
