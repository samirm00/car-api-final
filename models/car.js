import { v4 as newId } from 'uuid';

const cars = [
    {
        id: newId(),
        model: 'Lamborghini',
        price: '33333333',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwojZyv0zDIbGRKln6mfSQSxtmTjAA2zeIbA&usqp=CAU'
    },
    {
        id: newId(),
        model: 'BMW',
        price: '2222',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaPLCH0qt0OXrb0QeVNfH4C0X3tCgr_ggKCw&usqp=CAU'
    },
    {
        id: newId(),
        model: 'Volkswagen',
        price: '1444',
        img: 'https://uploads.vw-mms.de/system/production/images/vwn/007/966/images/55b7c491ac9c323f2ab4709f6da6edab14d9e767/DB2012AU00293_web_1600.jpg?1649147241'
    }
];

class Car {
    constructor(model, price, img) {
        this.id = newId();
        this.model = model;
        this.price = price;
        this.img = img;
    }

    static getCars = () => {
        return cars;
    };

    addCar = () => {
        cars.push(this);
    };
}

export default Car;
