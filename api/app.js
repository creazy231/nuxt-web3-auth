import express from 'express';

const version = 1;
const app = express();

/* ROUTES START */

import user from './routes/user';
app.use(`/v${version}/user`, user);

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
        errors: [
            {
                code: error.status || 500,
                message: error.message
            }
        ]
    });
});

export default app;