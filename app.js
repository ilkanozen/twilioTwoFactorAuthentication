const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const twoFactorRouter = require("./routes/twoFactorRouter");
app.use("/", twoFactorRouter);

app.listen(8081, () => {
  console.log("Proje 3000 portunda");
});
