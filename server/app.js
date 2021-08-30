import express, { json, urlencoded } from "express";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
    res.send("test");
});

app.listen(3000);