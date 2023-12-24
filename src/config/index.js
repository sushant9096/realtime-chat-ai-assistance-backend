const appConf = require('./app-config')
const dbConf = require('./db-config')
const CONVERSATION_TYPES = require('./conversation-types')
const firebase = require('./firebase-config')
const SocketIO = require('./socket-io')
const openAI = require('./open-ai')

module.exports = {
    app: appConf,
    db: dbConf,
    openAI,
    CONVERSATION_TYPES,
    firebase,
    SocketIO
}