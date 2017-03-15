const express = require('express');
const bodyParser = require('body-parser');

module.exports = {
    port : 6969,
    mongoUrl : 'mongodb://localhost/web5',
    settingExpress : (app) => {
        app.use(bodyParser.urlencoded({ extended : false}));

        app.use(bodyParser.json());
    }
}