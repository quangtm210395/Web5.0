const express = require('express');
const router = express.Router();
const compose = require('composable-middleware');

var controller = require('./instructor.controller');

var auth = require('../user/auth.service');

router.get('/all', controller.getAll);

router.get('/:name', compose()
    .use(auth.authentication)
    .use(auth.hasRole('user'))
    .use(auth.hasPermission('instructor', 'view')),
    controller.getByName);

router.post('/create', compose()
    .use(auth.authentication)
    .use(auth.hasRole('user'))
    .use(auth.hasPermission('instructor', 'create')), 
    controller.create);

router.post('/sida', controller.sida);

router.put('/edit/', compose()
    .use(auth.authentication)
    .use(auth.hasRole('user'))
    .use(auth.hasPermission('instructor', 'edit')),
    controller.edit);

router.delete('/delete/:name', compose()
    .use(auth.authentication)
    .use(auth.hasRole('user'))
    .use(auth.hasPermission('course', 'delete')),
    controller.delete);

module.exports = router;