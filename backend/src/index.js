const express = require("express");
const moongoose = require("mongoose");
const routes = require("./routes");

moongoose.connect(
  "mongodb+srv://eduardo:surf10@cluster0-yxx2x.mongodb.net/OminiStack10?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
);

const app = express();

app.use(express.json());

app.use(routes);

app.listen(4444, () => {
  console.log("App running on port 4444...");
});
