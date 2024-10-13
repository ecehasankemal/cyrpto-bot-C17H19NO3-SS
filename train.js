const brain = require("brain.js");
const fs = require("fs");

var datas = [];

fs.readdirSync('./datas').forEach(e => {
  var data = require(`./datas/${e}`);
  data.forEach(v => {
    datas.push(v);
  });
});
datas = datas.reduce((unique, obj) => {
    const objString = JSON.stringify(obj);

    if (!unique.some(uObj => JSON.stringify(uObj) === objString)) {
      unique.push(obj);
    }
    return unique;
  }, []);
console.clear();
console.log(`${datas.length} Adet obje eklendi.`);

const bot = new brain.recurrent.LSTM(require('./config.json'));
const iterations = 1_000_000;
var lastError = 1;
var lastSaved;
console.time("Eğitim süresi.");
bot.train(datas.map(v => {
  v.output = JSON.stringify(v.output);
  return v;
}), {
  log: false,
  iterations,
  callback: ({
    error, iterations
  }) => {
    console.clear();
    if (error < lastError) {
      lastSaved = bot.toJSON();
      fs.writeFileSync("result.json", JSON.stringify(bot.toJSON()));
      lastError = error;
    }
    console.table({
      error,
      total_objects: datas.length,
      iterations,
      saved_error: lastError
    });
    console.timeEnd("Tekli eğitim süresi.");
    console.time("Tekli eğitim süresi.");
  },
  callbackPeriod: 1,
  learningRate: 0.01,
  praxis: "adam",
});
//bot.fromJSON(lastSaved);
console.timeEnd("Eğitim süresi.");
console.log(bot.run([0.3061, 0.3062, 0.3065, 0.3065, 0.3064, 0.3063]));
