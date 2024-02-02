import { v4 as uuidv4 } from 'uuid';

class User {
    constructor({ id = uuidv4(), name = '', role = 'user' }) {
        this.id = id;
        this.name = name;
        this.role = role;
    }
}

export default User;