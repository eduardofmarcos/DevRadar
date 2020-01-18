const moongoose = require("mongoose");
const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const http = require("http");
const { setupWebsocket } = require("./websocket");

const app = express();
const server = http.Server(app);

setupWebsocket(server);

moongoose
  .connect(
    "mongodb+srv://eduardo:surf10@cluster0-yxx2x.mongodb.net/OminiStack10?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
  )
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.log(err));

app.use(cors({}));

app.use(express.json());

app.use(routes);

server.listen(4000, () => {
  console.log("App running on port 4000...");
});
