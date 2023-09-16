module.exports = (Types) => {
    return {
        id: {
            allowNull: false,
            type: Types.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
        },
        nome: {
            type: Types.STRING,
            allowNull: false
        },
        email: {
            type: Types.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        senha: {
            type: Types.STRING(250),
            allowNull: false
        },
        tipo: {
            type: Types.ENUM('admin', 'analista', 'consultor'),
            allowNull: false
        },
    }
}
