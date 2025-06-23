const fs = require("fs");
const dotenv = require("dotenv");
const fetch = require("node-fetch");

dotenv.config();

const LOG_URL = process.env.LOG_API;
const TOKEN = process.env.TOKEN;

const logging = async (stack = "backend", level, packageName, message) => {
    const BODY = {
        stack: stack,
        level: level,
        package: packageName,
        message: message
    };

    try {
        const response = await fetch(LOG_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${TOKEN}`
            },
            body: JSON.stringify(BODY)
        });

        const responseText = await response.text();
        console.log("API Response:", responseText);

        const dataToStore = `${new Date().toISOString()} - ${JSON.stringify(BODY)} - API Response: ${responseText}\n`;

        fs.appendFile('logs.txt', dataToStore, (err) => {
            if (err) {
                console.error("Error writing to logs.txt:", err.message);
            }
        });

    } catch (err) {
        console.error("Error while calling log API:", err.message);
    }
};

module.exports = { logging };
