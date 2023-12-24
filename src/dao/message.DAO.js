// define DAO methods for message
const {messageModel} = require('../models');

const createMessage = async (data) => {
  return messageModel.create(data);
}

const findAllMessages = async (filter) => {
  return messageModel.findAll(filter);
}

const findMessageById = async (id) => {
  return messageModel.findByPk(id);
}

const updateMessageById = async (id, data) => {
  const message = await messageModel.findByPk(id);
  if (!message) {
    return null;
  }
  return message.update(data);
}

const deleteMessageById = async (id) => {
  const message = await messageModel.findByPk(id);
  if (!message) {
    return null;
  }
  return message.destroy();
}

// get last 3 messages from the conversation
const getLastThreeMessages = async (conversationId) => {
  return messageModel.findAll({
    where: {
      conversationId,
    },
    limit: 3,
    order: [['createdAt', 'DESC']],
  });
}

module.exports = {
  createMessage,
  findAllMessages,
  findMessageById,
  updateMessageById,
  deleteMessageById,
  getLastThreeMessages,
}