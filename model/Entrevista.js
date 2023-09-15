module.exports = (Types) => {
    return {
        Id: {
            type: Types.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: "Id",
        },
        DemografiaId: {
            type: Types.INTEGER,
            allowNull: false,
        },
        ConsultorId: {
            type: Types.INTEGER,
            allowNull: true,
        },
        LiderSi: {
            type: Types.INTEGER,
            allowNull: true,
        },
        LiderOutros: {
            type: Types.INTEGER,
            allowNull: true,
        },
        LiderLideres: {
            type: Types.INTEGER,
            allowNull: true,
        },
        LiderFuncional: {
            type: Types.INTEGER,
            allowNull: true,
        },
        LiderNegocio: {
            type: Types.INTEGER,
            allowNull: true,
        },
        LiderGrupo: {
            type: Types.INTEGER,
            allowNull: true,
        },
        LiderCorporativo: {
            type: Types.INTEGER,
            allowNull: true,
        },
        ScoreHistorico: {
            type: Types.FLOAT,
            allowNull: true,
        },
        ScoreCarreira: {
            type: Types.FLOAT,
            allowNull: true,
        },
        PipelineAtualId: {
            type: Types.INTEGER,
            allowNull: true,
        },
        PipelineAtualN: {
            type: Types.INTEGER,
            allowNull: true,
        },
        PipelineFuturoId: {
            type: Types.INTEGER,
            allowNull: true,
        },
        PipelineFuturoN: {
            type: Types.INTEGER,
            allowNull: true,
        },
        DistanciaMeta: {
            type: Types.INTEGER,
            allowNull: true,
        },
        ScoreMeta: {
            type: Types.INTEGER,
            allowNull: true,
        },
        Planejamento: {
            type: Types.INTEGER,
            allowNull: true,
        },
        ScorePlanejamento: {
            type: Types.INTEGER,
            allowNull: true,
        },
        ScoreComprometimento: {
            type: Types.INTEGER,
            allowNull: true,
        },
        Saude: {
            type: Types.INTEGER,
            allowNull: true,
        },
        Familia: {
            type: Types.INTEGER,
            allowNull: true,
        },
        ScoreEquilibrio: {
            type: Types.INTEGER,
            allowNull: true,
        },
        Proativo: {
            type: Types.ENUM('sim', 'não'),
            allowNull: true,
        },
        Reativo: {
            type: Types.ENUM('sim', 'não'),
            allowNull: true,
        },
        Grupo: {
            type: Types.ENUM('mesma área', 'outra área'),
            allowNull: true,
        },
        Externo: {
            type: Types.ENUM('profissional', 'empreendedor'),
            allowNull: true,
        },
        ScoreFeeling: {
            type: Types.INTEGER,
            allowNull: true,
        },
        CargoFuturoId1: {
            type: Types.INTEGER,
            allowNull: true,
        },
        CargoFuturoId2: {
            type: Types.INTEGER,
            allowNull: true,
        },
        Recomendacoes1: {
            type: Types.TEXT,
            allowNull: true,
        },
        Recomendacoes2: {
            type: Types.TEXT,
            allowNull: true,
        },
        Recomendacoes3: {
            type: Types.TEXT,
            allowNull: true,
        },
        ComentarioQualitativo: {
            type: Types.TEXT,
            allowNull: true,
        },
    };
}