import okx from "okx-api";
import fs from "fs";

const client = new okx.RestClient({
  apiKey: "API_KEY",
  apiPass: "API_PASSWORD",
  apiSecret: "API_SECRET",
});

var last = [];
var { count } = require("./count.json");
var datas = require(`./datas/${count}.json`);
var data;

process.on(
  "SIGKILL",
  (e) => fs.writeFileSync(`${count}.json`),
  JSON.stringify(datas, null, 2)
);

setInterval(async () => {
  console.clear();
  console.time("İstek süresi.");
  data = (await client.getTickers("SWAP", "1INCH-USDT"))[0];
  console.table({
    ...last,
    length: last.length,
  });

  if (data.last != last[last.length - 1]) {
    last.push(parseFloat(data.last));
  }

  if (last.length >= 51) {
    datas.push({
      input: last.splice(0, 50),
      output: last,
    });
    fs.writeFileSync(`datas/${count}.json`, JSON.stringify(datas, null, 2));
    last = [];
  }

  if (datas.length >= 5) {
    count++;
    fs.writeFileSync(
      `count.json`,
      JSON.stringify(
        {
          count,
        },
        null,
        2
      )
    );
    datas = [];
  }
  console.timeEnd("İstek süresi.");
}, 5000);
