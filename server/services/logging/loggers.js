import fs from 'fs';

export const consoleLogger = console.log;

export const fileLogger = (message) => {
    fs.appendFile('log.txt', `${message}\n`, (err) => {
        if (err) throw err;
    }
    );
} 