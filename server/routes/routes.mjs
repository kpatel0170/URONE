import express from "express";
import userRoute from "./user.router.mjs";
import authRoute from "./auth.router.mjs";


export default (app) => {
    app.get("/healthcheck", (req, res) => res.sendStatus(200));
    app.use('/api/v1/users', userRoute);
    app.use('/api/v1/auth', authRoute);

};
