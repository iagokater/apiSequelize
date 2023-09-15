module.exports = (Types) => {
    return {
        Id: {
            allowNull: false,
            type: Types.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: "Id",
        },
        Nome: {
            type: Types.STRING(255),
        },
        Valor: {
            type: Types.INTEGER,
        },
    };
};
