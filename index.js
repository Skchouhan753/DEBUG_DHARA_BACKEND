const express = require("express");

const cors = require("cors");
const { connection } = require("./config/db");
const { UserRouter } = require("./routes/user.router");
const auth = require("./middlewares/auth.middleware");
const { foodsRouter } = require("./routes/food.router");
const exerciseRouter = require("./routes/exercise.router");
const { breakfastRouter } = require("./routes/breakfast.router");
const { lunchRouter } = require("./routes/lunch.router");
const { snackRouter } = require("./routes/snack.router");
const { dinnerRouter } = require("./routes/dinner.router");

require("dotenv").config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use(cors());

app.use("/users", UserRouter);

app.use(auth);

app.use("/foods", foodsRouter);
app.use("/exercise", exerciseRouter);

app.use("/breakfast", breakfastRouter);
app.use("/lunch", lunchRouter);
app.use("/snack", snackRouter);
app.use("/dinner", dinnerRouter);

app.get("/", async (req, res) => {
  try {
    res.json({ msg: "Access granted" })
    console.log(req.body)
  } catch (error) {
    res.json({ msg: "Access declined" })
  }
})
app.listen(PORT, async () => {
  try {
    await connection;
    console.log("connected to DB");
  
  } catch (err) {
    console.log(err);
  }
  console.log(`server started at port ${PORT}`);
});
