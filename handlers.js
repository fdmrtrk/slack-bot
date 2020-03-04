const translate = require("@vitalets/google-translate-api");

const detectLanguage = async message => {
  try {
    const data = await translate(message, { to: "en" });
    return {
      text: data.text,
      origin: data.from.language.iso
    };
  } catch (err) {
    throw new Error(err);
  }
};

exports.detectLanguage = detectLanguage;
