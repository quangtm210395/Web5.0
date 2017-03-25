const express = require('express');
const router = express.Router();
const compose = require('composable-middleware');

var controller = require('./course.controller');

var auth = require('../user/auth.service');

router.get('/all', controller.getAll);

router.get('/:name', compose()
    .use(auth.authentication)
    .use(auth.hasRole('user'))
    .use(auth.hasPermission('course', 'view')),
    controller.getCourse);

router.post('/create', compose()
    .use(auth.authentication)
    .use(auth.hasRole('user'))
    .use(auth.hasPermission('course', 'create')), 
    controller.create);

router.post('/sida', controller.sida);

router.put('/edit/', compose()
    .use(auth.authentication)
    .use(auth.hasRole('user'))
    .use(auth.hasPermission('course', 'edit')),
    controller.edit);

router.delete('/delete/:name', compose()
    .use(auth.authentication)
    .use(auth.hasRole('user'))
    .use(auth.hasPermission('course', 'delete')),
    controller.delete);

module.exports = router;