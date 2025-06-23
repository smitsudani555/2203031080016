const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { logging } = require("./LoggingMiddleware/logging");

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.post('/test-logging', async (req, res) => {
    try {
        console.log(req.body);
        const { stack = "backend", level, package, message } = req.body;
        await logging(stack, level, package, message);
        res.send("Completed");
    } catch (err) {
        console.error("Logging failed:", err.message);
        res.status(500).send("Logging failed");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
