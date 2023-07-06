/* ******************************************
 * This server.js file is the primary file of the
 * application. It is used to control the project.
 *******************************************/

/* ***********************
 * Require Statements
 *************************/
const chalk = require('chalk');
const express = require('express');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const { getNav, checkJWTToken} = require('./utilities');
const pool = require('./database/');
const app = express();

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT;
const host = process.env.HOST;

/* ***********************
 * Middleware
 * ************************/
app.use(
  session({
    store: new (require('connect-pg-simple')(session))({
      createTableIfMissing: true,
      pool,
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    name: 'sessionId',
  })
);

app.use(cookieParser());
app.use(checkJWTToken);

// Express Messages Middleware
app.use(require('connect-flash')());
app.use((req, res, next) => {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
app.use(express.json()).use(express.urlencoded({ extended: true }));

/* ***********************
 * View Engine and Templates
 *************************/
app.set('view engine', 'ejs');
app.set('layout', './layouts/layout'); // not at views root
app.use(expressLayouts);
app.use(require('./routes/static'));

/* ***********************
 * Routes
 *************************/
app.use('/', require('./routes'));

// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({ status: 404, message: 'Sorry, we appear to have lost that page.' });
});

/* ***********************
 * Express Error Handler
 * Place after all other middleware
 *************************/
app.use(async (err, req, res, next) => {
  const nav = await getNav();
  console.error(`Error at: "${req.originalUrl}": ${err.message}`);
  if (err.status == 404) {
    message = err.message;
  } else {
    message = 'Oh no! There was a problem. Maybe try a different route?';
  }
  res.render('errors/error', {
    title: err.status || 'Server Error',
    message: err.message,
    nav,
  });
});

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  let logMessage = `HTTP app listening on ${host}:${port}`;
  if (process.env.NODE_ENV === 'development') {
    const url = `http://localhost:${port}`;
    const link = `\u001b]8;;${url}\u001b\\${url}\u001b]8;;\u001b\\`;
    logMessage += ` ${chalk.blue(link)}`;
  }
  console.log(logMessage);
});
