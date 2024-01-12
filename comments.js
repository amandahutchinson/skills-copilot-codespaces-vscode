//create web server
var express = require('express');
var router = express.Router();
//import the model (burger.js) to use its database functions
var burger = require('../models/burger.js');
//create