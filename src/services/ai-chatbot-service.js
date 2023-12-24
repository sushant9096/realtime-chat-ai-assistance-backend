const {OpenAI} = require("openai");
const {openAI} = require("../config");
const {messageDAO} = require("../dao");

const openai = new OpenAI({
  apiKey: openAI?.apiKey,
});

const openAIPayload = {
  model: "gpt-3.5-turbo",
  messages: [
    {
      "role": "system",
      "content": "You are a geek who is know as tech enthusiast."
    },
  ],
  temperature: 1,
  max_tokens: 140,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
};

const getOpenAIResponse = async (inputs) => {
  const {
    messages = [],
    promptContent = "You are a geek who is know as tech enthusiast.",
  } = inputs;
  const newOpenAIPayload = Object.assign({}, openAIPayload);
  newOpenAIPayload.messages[0].content = promptContent;
  newOpenAIPayload.messages = [...newOpenAIPayload.messages, ...messages];
  return openai.chat.completions.create(newOpenAIPayload);
};

const sendOpenAIResponse = async (inputs) => {
  const {conversationId, message} = inputs;
  let oldMessages = await messageDAO.getLastThreeMessages(conversationId);
  // reverse the messages
  oldMessages = oldMessages.map(value => {
    const payload = value.get({plain: true});
    return {
      role: "user",
      content: payload?.content,
    };
  }).reverse();
  // send message to openAI
  const {choices} = await getOpenAIResponse({messages: [...oldMessages, {role: "user", content: message}]}); // get response from openAI
  console.log("choices: ", choices)
  const {message: {content}} = choices[0];
  // send response to socketIO
  return content;
}

module.exports.AIChatBotService = {
  getOpenAIResponse,
  sendOpenAIResponse,
}
