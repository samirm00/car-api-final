import { v4 as newId } from 'uuid';

const users = [
    {
        id: newId(),
        email: 'test7@gmail.com',
        password: '$2a$10$9b6jHP7ZLdWImFP0yTX06evscQlH.UpdpJWfJrKjREwraHoM7c5He'
    }
];

class User {
    constructor(email, password) {
        this.id = newId();
        this.email = email;
        this.password = password;
    }

    static getUserByIdEmail = (email) => {
        return users.find((user) => user.email === email);
    };

    static getUserById = (id) => {
        return users.find((user) => user.id === id);
    };

    addUser = () => {
        users.push(this);
    };
}

export default User;
