Projeyi çalıştırmak için aşağıdaki adımları takip edin.

- İlk olarak nodejs veya alternatiflerini indirin.

```bash
apt-get install nodejs npm -y
```

- Projeyi indirin.

```bash
git clone https://github.com/ecehasankemal/cyrpto-bot-C17H19NO3-SS/
```

- Gerekli modülleri yükleyin.

```bash
npm install brain.js@1.6.1 okx-api
```

- [OKX Api Yönetimi](https://okx.com/account/my-api)'nden api anahtarınızı ve api gizli anahtarınızı alın.
- Daha sonra data.js'deki gerekli alana ekleyin.

```js
const client = new okx.RestClient({
  apiKey: "API_KEY",
  apiPass: "API_PASSWORD",
  apiSecret: "API_SECRET",
});
```

- Projeyi eğitim amaçlı çalıştırmak isterseniz.

```bash
npm run train
```

- Projeyi veri toplama amaçlı çalıştırmak isterseniz.

```bash
npm run data
```



NOT: Projenin bu kısma kadar olanını https://github.com/C17H19NO3-SS/ sayfası üstlenmiştir.
