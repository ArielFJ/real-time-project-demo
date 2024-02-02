import User from "../models/user.js";

class UserService {
    constructor() {
        this.users = [];
    }

    async create(data) {
        const user = new User(data);
        this.users.push(user);
        return user;
    }

    async getAll() {
        return this.users;
    }

    async getById(id) {
        return this.users.find(user => user.id === id);
    }

    async getAdmin() {
        return this.users.find(user => user.role === 'admin');
    }
}

const instance = new UserService();

export default instance;