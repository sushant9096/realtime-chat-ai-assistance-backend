const {Sequelize} = require("sequelize");
const {db} = require("../config");

const sequelize = new Sequelize(db.NAME, db.USER, db.PASS, {
  host: db.HOST,
  port: db.PORT,
  dialect: db.DIALECT,
});

const modelDefiners = [
  require('./conversation.model'),
  require('./message.model'),
  require('./user.model'),
  require('./participant.model')
];

for (let modelDefiner of modelDefiners) {
  modelDefiner(sequelize)
}

const {conversation, message, participant, user} = sequelize.models;

user.hasMany(participant, {foreignKey: 'userId'});
participant.belongsTo(user, {foreignKey: 'userId'});
conversation.hasMany(participant, {foreignKey: 'conversationId'});
conversation.hasMany(message, {foreignKey: 'conversationId'});
conversation.belongsToMany(user, {through: participant, foreignKey: 'conversationId'});
user.belongsToMany(conversation, {through: participant, foreignKey: 'userId'});
participant.belongsTo(conversation, {foreignKey: 'conversationId'});

message.belongsTo(conversation);

sequelize.sync({
  // alter: true,
  // force: true,
}).then(r => {
  console.log('Database & tables synced!');
})

module.exports = {
  conversationModel: conversation,
  messageModel: message,
  participantModel: participant,
  userModel: user,
  sequelize
};