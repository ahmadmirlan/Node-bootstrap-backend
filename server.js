import express from 'express';
import dotenv from 'dotenv'
import database from './src/utility/database';
import {restManager} from './src/middleware/RestBuilder';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

dotenv.config();

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`)
});

/* Call database*/
database.connectDatabase();

// Define rest builder
app.use(restManager);

// Call router
require('./src/router/index')(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.send({'Messages': 'URL Not found', 'status': 404})
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send({'Messages': 'Error handler', 'status': err.status});
});


module.exports = app;
