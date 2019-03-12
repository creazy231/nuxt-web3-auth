import express from 'express';
import cors from 'cors';
// import cookieParser from 'cookie-parser';
const cookieParser = require('cookie-parser');

const version = 1;
const app = express();

process.env.NODE_ENV = 'development';

const origin = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "http://example.com";

app.use(cors({
    credentials: true,
    origin
}));
app.use(cookieParser());

/* ROUTES START */

import user from './routes/user';
app.use(`/api/v${version}/user`, user);

/* ROUTES END */

app.use((req, res, next) => {
    const error = new Error('Sorry, that page does not exist');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        success: false,
        error: {
            code: error.status || 500,
            message: error.message
        }
    });
});

export default app;