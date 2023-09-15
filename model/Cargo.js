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
    };
};
