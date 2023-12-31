const express = require("express");
const cors = require("cors");

const {
  getCompliment,
  getFortune,
  handleReaction,
  addMotivationQuote,
  getMotivationAlert,
  deleteQuote,
  getList,
  addAction,
  toggleCompleteAction,
  deleteAction,
} = require("./controller");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);
app.get("/api/motivation", getMotivationAlert);

app.post("/api/motivation", addMotivationQuote);

app.put("/api/motivation/:id/:type", handleReaction);
app.delete("/api/motivation/:id", deleteQuote);

app.get("/api/list", getList);

app.post("/api/list", addAction);

app.put("/api/list/:id", toggleCompleteAction);

app.delete("/api/list", deleteAction);

app.listen(4000, () => console.log("Server running on 4000"));
