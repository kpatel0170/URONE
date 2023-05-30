import express from "express";

export default (app) => {
    app.get("/healthcheck", (req, res) => res.sendStatus(200));
};
