const {catchAsync} = require("../utils");
const {conversationDAO, userDAO} = require('../dao');
const {participantDAO} = require('../dao');
const {sequelize, participantModel, userModel, conversationModel} = require("../models");
const {Op} = require("sequelize");

// create a new conversation from conversionDAO
const createConversation = catchAsync(async (req, res) => {
  const data = req.body;
  const {participants, type = 0, name = ''} = data;

  if (!participants) {
    return res.status(400).send({
      message: 'Participants are required'
    });
  } else if (participants.length < 1 && type === 1) {
    return res.status(400).send({
      message: 'At least 1 participant is required'
    });
  } else if (participants.length !== 2 && type === 0) {
    return res.status(400).send({
      message: '2 participants are required'
    });
  }

  if (type === 0) {
    // find conversation with the same participants
    console.log('participantsUserIds: ', participants)
    const filter = {
      where: {
        type: 0,
      },
      include: [
        {
          model: participantModel,
          // include: [userModel],
          where: {
            userID: {
              [Op.in]: participants
            }
          },
          attributes: []
        },
      ],
      group: ['conversationId'],
      having: sequelize.literal(`COUNT(DISTINCT participants.participantId) = ${participants.length}`),
    }
    const dupConversation = await conversationDAO.findAllConversations(filter);
    // console.log('dupConversation: ', JSON.stringify(dupConversation, null, 2))
    if (dupConversation.length > 0) {
      return res.status(400).send('Conversation already exists');
    }
    // return res.status(400).send('Conversation does not exist');
  }

  let conversation;
  await sequelize.transaction(async (t) => {
    conversation = await conversationDAO.createConversation({
      type,
      name
    }, {transaction: t});
    for (let i = 0; i < participants.length; i++) {
      console.log('participant: ', participants[i])
      const user = await userDAO.findUserById(participants[i]);
      if (!user)
        throw new Error('User not found');
      await participantDAO.createParticipant({
        conversationId: conversation.conversationId,
        userId: participants[i]
      }, {transaction: t});
    }
    return conversation;
  });
  res.status(201).send(conversation);
});

// find all conversations from conversationDAO
const findAllConversations = catchAsync(async (req, res) => {
    const conversations = await conversationDAO.findAllConversations({
      include: [
        userModel,
        {
          model: participantModel,
          attributes: [],
          include: [
            {
              model: userModel,
              where: {
                userId: req?.user?.userId
              },
              right: true
            }
          ],
          right: true
        }
      ],
      // group: ['conversationId'],
      // having: sequelize.literal(`COUNT(DISTINCT conversationId) = 2`),
    });
    // console.log('user: ', req?.user?.userId)
    // console.log('conversations: ', JSON.stringify(conversations, null, 2));
    // console.log('conversations: ', conversations.length)
    res.status(200).send(conversations);
  }
);

// find a conversation by id from conversationDAO
const findConversationById = catchAsync(async (req, res) => {
  const {id} = req.params;
  const conversation = await conversationDAO.findConversationById(id);
  if (!conversation) {
    return res.sendStatus(404);
  }
  res.status(200).send(conversation);
});

// update a conversation by id from conversationDAO
const updateConversationById = catchAsync(async (req, res) => {
    const {id} = req.params;
    const data = req.body;
    const conversation = await conversationDAO.updateConversationById(id, data);
    if (!conversation) {
      return res.sendStatus(404);
    }
    res.status(200).send(conversation);
  }
);

// delete a conversation by id from conversationDAO
const deleteConversationById = catchAsync(async (req, res) => {
  const {id} = req.params;
  const conversation = await conversationDAO.deleteConversationById(id);
  if (!conversation) {
    return res.sendStatus(404);
  }
  res.sendStatus(204);
});

module.exports = {
  createConversation,
  findAllConversations,
  findConversationById,
  updateConversationById,
  deleteConversationById
}