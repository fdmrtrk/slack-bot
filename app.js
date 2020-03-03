const SlackBot = require("slackbots");
const axios = require("axios");

const slackBot = new SlackBot({
  token: "xoxb-979163994532-968298051763-Ax8C9CtwMOCne4UgagwVOkCM",
  name: "observer"
});

slackBot.on("start", () => {
  const params = {
    icon_emoji: ":smiley:"
  };
  slackBot.postMessageToChannel(
    "general",
    "Please write your message in English",
    params
  );
});
