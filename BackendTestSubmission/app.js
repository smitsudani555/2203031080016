require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");


const app = express();
const port = process.env.PORT || 8383;

 app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

const shorturlRoutes = require("./routes/shorturlRoute");
app.use("/shorturls",shorturlRoutes)

app.get("/",(req,res)=>{
    res.send("URL SHORTENER")
});


app.use((err,req,res,next) => {
  if (err) {
    res.send("Error: " + err.message)
  }
  next();
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});