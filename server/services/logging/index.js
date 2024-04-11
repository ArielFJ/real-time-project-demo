import dayjs from "dayjs";
import createSemaphore from "semaphore";
import { consoleLogger, fileLogger } from "./loggers.js";

const semaphore = createSemaphore(1); // Define a semaphore with 1 slot

class LoggingService {
    constructor(logger = consoleLogger) {
        this.log = this.log.bind(this);
        this.logger = logger;
    }

    getTimeStamp() {
        // Return a timestamp in following format: [2021-01-01 12:00:00]
        const date = dayjs();
        return `[${date.format('YYYY-MM-DD HH:mm:ss')}]`;
    }

    log(message) {
        const logDelayed = () => setTimeout(() => {
            this.logger(`${this.getTimeStamp()} - ${message}`);
            semaphore.leave(); // Release the semaphore
        }, 2000);

        semaphore.take(logDelayed); // Wait for the semaphore
    }
}

const loggingInstances = [
    new LoggingService(consoleLogger),
    new LoggingService(fileLogger),
    // new LoggingService(databaseLogger),
    // new LoggingService(elasticsearchLogger),
    // new LoggingService(mongoLogger),
];

const instance = {
    log: (message) => {
        loggingInstances.forEach((loggingInstance) => {
            loggingInstance.log(message);
        });
    }
};

export default instance;
