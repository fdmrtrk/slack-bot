const SlackBot = require("slackbots");
const axios = require("axios");

const slackBot = new SlackBot({
  token: "xoxb-979163994532-968298051763-Ax8C9CtwMOCne4UgagwVOkCM",
  name: "observer"
});

slackBot.on("start", () => {
  const params = {
    icon_emoji: ":robot_face:"
  };
  slackBot.postMessageToChannel(
    "general",
    "Please write your message in English",
    params
  );
});

// Handle messages
slackBot.on("message", data=>{
	data.type === "message" ? console.log(data) : console.log("it is not message", data);

})

// Handle errors
slackBot.on("error", (err)=> console.log(err))