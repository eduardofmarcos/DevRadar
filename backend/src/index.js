const moongoose = require("mongoose");
const express = require("express");
const routes = require("./routes");
const cors = require("cors");

const app = express();

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

app.listen(4000, () => {
  console.log("App running on port 4000...");
});
