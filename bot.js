import brain from "brain.js";

const bot = new brain.recurrent.LSTM();

bot.fromJSON(require("./result.json"));

console.log(bot.run([0.3021, 0.302, 0.3019, 0.3018, 0.3028]));
