const express = require('express');
const winston = require('winston');
const expressWinston = require('express-winston');

const nestedRouter = require('express').Router();
nestedRouter.get('/nested-route', (req, res, next) => {
  console.log('Not reachable')
});

const PORT = 3313;

const app = express();

app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    })
  ],
  msg: 'Express Winston resetting url...'
}));

app.use('/some-route', (req,res,next) => {
  console.log(`
URL#1
----
${req.url}
---
  `); // prints /nested-route
  res.send(200);
 	console.log(`
URL#2
----
${req.url}
---
  `); // prints /some-route/nested-route
  next()
}, 
  nestedRouter, // this router handler will not be called
  (req, res, next) => {
    console.log('But this middleware still will be called') 
  }
);

app.listen(PORT);

console.log(`listening on ${PORT}`);
