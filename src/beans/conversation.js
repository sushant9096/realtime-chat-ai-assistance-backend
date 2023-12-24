const {DataTypes} = require('sequelize');
module.exports = {
    conversationId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}