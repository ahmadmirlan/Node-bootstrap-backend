import mongoose from 'mongoose';
import winston from 'winston';

const connectDatabase = () => {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    };

    try {
        /* Database Configuration*/
        mongoose
            .connect(
                `mongodb://${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
                options,
            )
            .then(() => winston.debug('Connected to MongoDB...'))
            .catch(err => {
                winston.error(err);
            });
    } catch (e) {
        winston.error(e);
        return e;
    }
};

module.exports = {
    connectDatabase,
};
