import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/user.js';
import carRoutes from './routes/car.js';

// configure dotenv
dotenv.config();
const PORT = process.env.PORT || 3005;

// initialize express
const app = express();

// construct path
const __filename = fileURLToPath(import.meta.url);
const PATH = dirname(__filename);

// set template engine
app.set('view engine', 'ejs');
app.set('views', path.join(PATH, 'views'));

// parse body and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// serve static folder
app.use(express.static(path.join(PATH, 'public')));

// use routes
app.use(userRoutes);
app.use(carRoutes);

// handle 404
app.use('*', (req, res) => {
    res.status(404).render('404', {
        title: 'Page not found',
        message: `This page doesn't exist`
    });
});

app.listen(PORT, () => {
    console.log(`Server is up and running on port : ${PORT}`);
});
