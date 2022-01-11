const express = require("express");

const app = express();
app.get("*", express.static("./public"));
app.get("/yandex/article.json", express.static('/public/yandex/article.json'));

const port = process.env.PORT || 8001;

app.listen(port, () => {
    console.log(`App start on port ${port}`);
});

