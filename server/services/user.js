import User from "../models/user.js";
import semaphore from 'semaphore';

class UserService {
    constructor() {
        this.users = [];
    }

    async create(data) {
        if (data.role === 'admin') {
            const admins = await this.getAdmins();
            if (admins.length >= 1) {
                throw new Error('ADMIN_LIMIT_REACHED');
            }
        }
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

    async getAdmins() {
        return this.users.filter(user => user.role === 'admin') || [];
    }

    async delete(id) {
        this.users = this.users.filter(user => user.id !== id);
    }
}

const instance = new UserService();

export default instance;