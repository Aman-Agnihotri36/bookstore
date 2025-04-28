import cron from 'node-cron';
import https from 'https';

const job = cron.schedule("*/14 * * * *", function () {
    https
        .get("https://bookstore-jud0.onrender.com", (res) => {
            if (res.statusCode == 200) console.log("GET request sent successfully");
            else console.log("GET request failed ", res.statusCode);
        })
        .on('error', (e) => console.log("Error while sending request", e));
});

export default job;
