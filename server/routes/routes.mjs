import express from "express";
import userRoute from "./user.router.mjs";
import authRoute from "./auth.router.mjs";
import postRoute from "./post.router.mjs";

// Registers the routes for the API endpoints
export default (app) => {
    // Health check route
    app.get("/healthcheck", (req, res) => res.sendStatus(200));
    // User routes
    app.use('/api/v1/users', userRoute);
    // Authentication routes
    app.use('/api/v1/auth', authRoute);
    // Post routes
    app.use('/api/v1/posts', postRoute);
};
