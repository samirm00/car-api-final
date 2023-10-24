import Car from '../models/car.js';
import User from '../models/user.js';

const carControllers = {
    getCars: (req, res) => {
        const cars = Car.getCars();
        const token = req.cookies.token;
        const id = req.cookies.id;
        const user = User.getUserById(id);

        res.status(200).render('cars', {
            cars: cars,
            token: token,
            user: user
        });
    },
    getAddCar: (req, res) => {
        const token = req.cookies.token;
        res.status(200).render('addCar', { token: token });
    },
    addCar: (req, res) => {
        const { model, price, img } = req.body;
        if (!model || !price || !img) {
            res.status(400).render('message', {
                title: 'All fields are required',
                message: 'Please fill in all the fields'
            });
        } else {
            const newCar = new Car(model, price, img);
            newCar.addCar();
            res.status(302).redirect('/');
        }
    }
};

export default carControllers;
