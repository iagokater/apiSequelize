require('dotenv').config();

const config = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  operatorAliases: false,
  logging: false,
  define: {
    timestamps: true,
    underscored: false,
  }
};

const Sequelize = require('sequelize');
const Model = Sequelize.Model;

const bcrypt = require('bcrypt');
const CargoModel = require('../model/Cargo');
const NegocioModel = require('../model/Negocio');
const PipelineModel = require('../model/Pipeline');
const DemografiaModel = require('../model/Demografia');
const EntrevistaModel = require('../model/Entrevista');
const UsuarioModel = require('../model/Usuario');


let hashPassword = (password) => {
  let hash = bcrypt.hashSync(password, 10);
  return hash;
}

const sequelize = new Sequelize(config.database, config.username, config.password, config);

sequelize.authenticate()
  .then(() => {
    console.log("Connected to Database")
  }).catch(err => {
    console.log("Error to connect to the database: " + err)
  });

  //----------------------------------------Usuario----------------------------------------

  class Usuario extends Model {}
  Usuario.init(UsuarioModel(Sequelize), {
    sequelize,
    modelName: "Usuario"
  });

  Usuario.addHook('beforeCreate', (usuario, options) => {
    usuario.Senha = hashPassword(usuario.Senha);
    return usuario;
  });

  //----------------------------------------Entrevista----------------------------------------

  class Entrevista extends Model {}
  Entrevista.init(EntrevistaModel(Sequelize), {
    sequelize,
    modelName: "Entrevista"
  });

  
  function calcularScoreHistorico(entrevista) {
    return (
      entrevista.LiderSi * 3 +
      entrevista.LiderOutros * 5 * 10 +
      entrevista.LiderLideres * 8 * 10 +
      entrevista.LiderFuncional * 13 * 10 +
      entrevista.LiderNegocio * 21 * 10 +
      entrevista.LiderGrupo * 33 * 10 +
      entrevista.LiderCorporativo * 46 * 10
      );
    }
    function calcularTempoCarreira(inicioCarreira) {
      const dataAtual = new Date();
      const inicioCarreiraDate = new Date(inicioCarreira);
   
      const diffEmMilissegundos = dataAtual - inicioCarreiraDate;
      const anosDecorridos = diffEmMilissegundos / (1000 * 60 * 60 * 24 * 365.25);
      const Tempocarreira = Math.floor(anosDecorridos);
      return Tempocarreira;
    }

    Entrevista.addHook('beforeCreate', async (entrevista, options) => {
      const demografia = await Demografia.findByPk(entrevista.DemografiaId);
      const ScoreHistorico = calcularScoreHistorico(entrevista);

      const TempoCarreira = calcularTempoCarreira(demografia.InicioCarreira);
      if (TempoCarreira > 0) {
        const ScoreCarreira = (ScoreHistorico / TempoCarreira) * 10;
        entrevista.ScoreHistorico = Math.floor(ScoreHistorico);
        entrevista.ScoreCarreira = Math.floor(ScoreCarreira);
      } 
      return entrevista;
    });

    Entrevista.beforeUpdate('projecaoCarreira', async (entrevista, options) => {
      const pipelineAtual = await Pipeline.findByPk(entrevista.PipelineAtualId);
      const pipelineFuturo = await Pipeline.findByPk(entrevista.PipelineFuturoId);

      const PipelineAtualN = pipelineAtual.Valor;
      const PipelineFuturoN = pipelineFuturo.Valor;
      console.log(PipelineAtualN);
      console.log(PipelineFuturoN);

      const DistanciaMeta = (PipelineFuturoN - PipelineAtualN) * 10;
      const ScoreMeta = (PipelineFuturoN * 10) - DistanciaMeta;

      entrevista.PipelineAtualN = PipelineAtualN;
      entrevista.PipelineFuturoN = PipelineFuturoN;
      entrevista.DistanciaMeta = DistanciaMeta;
      entrevista.ScoreMeta = ScoreMeta;

      return entrevista;
    });

    Entrevista.beforeUpdate('planejamento', async (entrevista, options) => {
      const ScoreMeta = entrevista.ScoreMeta;
      const ScoreCarreira = entrevista.ScoreCarreira;
      const Planejamento = entrevista.Planejamento;
      entrevista.ScorePlanejamento = ScoreMeta / Planejamento;
      entrevista.ScoreComprometimento = ScoreCarreira + ScoreMeta + entrevista.ScorePlanejamento;


      return entrevista;
    });

    Entrevista.beforeUpdate('equilibrio', async (entrevista, options) => {
      const Saude = entrevista.Saude;
      const Familia = entrevista.Familia; 
      entrevista.ScoreEquilibrio = (Saude + Familia) / 2;
    });

    //----------------------------------------Demografia----------------------------------------

  class Demografia extends Model {}
  Demografia.init(DemografiaModel(Sequelize), {
    sequelize,
    modelName: "Demografia"
  });

  Demografia.addHook('beforeCreate',(function (demografia, options) {
    const dataNascimento = demografia.DataNascimento;
    let geracao = "";
  
    if (dataNascimento.getFullYear() < 1980) {
      geracao = 'x';
    } else if (dataNascimento.getFullYear() >= 1980 && dataNascimento.getFullYear() <= 1999) {
      geracao = 'y';
    } else {
      geracao = 'z';
    }
  
    demografia.Geracao = geracao;

    return demografia;
  }));

  Demografia.addHook('beforeUpdate',(function (demografia, options) {
    const dataNascimento = demografia.DataNascimento;
    let geracao = "";
  
    if (dataNascimento.getFullYear() < 1980) {
      geracao = 'x';
    } else if (dataNascimento.getFullYear() >= 1980 && dataNascimento.getFullYear() <= 1999) {
      geracao = 'y';
    } else {
      geracao = 'z';
    }
  
    demografia.Geracao = geracao;

    return demografia;
  }));
  class Pipeline extends Model {}
  Pipeline.init(PipelineModel(Sequelize), {
    sequelize,
    modelName: "Pipeline"
  });

  class Negocio extends Model {}
  Negocio.init(NegocioModel(Sequelize), {
    sequelize,
    modelName: "Negocio"
  });

  class Cargo extends Model {}
  Cargo.init(CargoModel(Sequelize), {
    sequelize,
    modelName: "Cargo"
  });


  Negocio.belongsTo(Demografia, {
    foreignKey: "idNegocio"
  });
  Demografia.hasMany(Negocio, {
    foreignKey: "idNegocio"
  });

  Entrevista.belongsTo(Demografia, {
    foreignKey: "DemografiaId"
  });
  Demografia.hasMany(Entrevista, {
    foreignKey: "DemografiaId"
  });

  Entrevista.belongsTo(Cargo, {
    foreignKey: "CargoFuturoId1"
  });
  Cargo.hasMany(Entrevista, {
    foreignKey: "CargoFuturoId1"
  });
  Entrevista.belongsTo(Cargo, {
    foreignKey: "CargoFuturoId2"
  });
  Cargo.hasMany(Entrevista, {
    foreignKey: "CargoFuturoId2"
  });

  sequelize.sync()
  .then(() => {
    console.log("Synchronized to Database")
  }).catch(err => {
    console.log("Error to sync the database: " + err)
  });

  
  module.exports = {
    sequelize,
    Cargo,
    Negocio,
    Pipeline,
    Demografia,
    Entrevista,
    Usuario
  };
