import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { PORT, TINY_KEY, DB_CONN } from './config';

import { BlogRouter, AdminRouter } from './routes';
import { errorHandler } from './middlewares';

const app = express();

app.use(express.json());

mongoose.connect(DB_CONN, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    console.log('DB connection successful');
});

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/create', (req, res) => {
    res.render('CreatePost', { TINY_KEY });
});

app.use('/', BlogRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});
