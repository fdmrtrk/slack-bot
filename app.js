require("dotenv").config({ path: __dirname + "/.env" });
const SlackBot = require("slackbots");
const { detectLanguage } = require("./handlers");

const slackBot = new SlackBot({
  token: process.env["SLACK_BOT_API"],
  name: "observer"
});
const params = {
  icon_emoji: ":robot_face:"
};
//Get channels
let listOfChannels;
slackBot.on("start", () => {
  console.log("Slack bot is online");
  slackBot
    .getChannels()
    .then(data => {
      listOfChannels = data;
    })
    .catch(err => {
      throw new Error("Error while fetching channels!", err);
    });
});

// Handle messages
slackBot.on("message", async data => {
  if (data.type !== "message") {
    return;
  }
  let channelName;
  channelName = listOfChannels.channels.filter(ch => data.channel === ch.id)[0];
  console.log("Slack bot is online on this channel: ", channelName);
  try {
    let language = await detectLanguage(data.text);
    if (language.origin !== "en") {
      slackBot.postMessageToChannel(
        channelName.name,
        `Hello <@${data.user}>, please write your message in english. Your message: ${language.text}`,
        params
      );
    }
  } catch (err) {
    console.log("Slack bot is disconnected", err);
  }
});

// Handle errors
slackBot.on("error", err => console.log(err));
