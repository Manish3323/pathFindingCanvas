const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const indexRoute = require('./routes/index');
const dataApi = require('./api/data');
const pf = require('./api/pathfinder');
const app = express();
const html = path.join(__dirname + '/../dist/client');

app.disable("x-powered-by");
app.use(cors());
app.use(bodyParser.json());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));

console.log((html));
app.use(express.static(html));
app.set('views', html);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// api routes
app.use("/api", indexRoute);

app.get('/api/data', function(req, res, next) {

})


if (app.get("env") === "production") {
    console.log("env", app.get("env"));
    // in production mode run application from dist folder
    app.use(express.static(path.join(__dirname, "/../dist/")));
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error("Not Found");
    next(err);
});

// production error handler
// no stacktrace leaked to user
app.use((err, req, res, next) => {

    res.status(err.status || 500);
    res.json({
        error: {},
        message: err.message,
    });
});

module.exports = app;