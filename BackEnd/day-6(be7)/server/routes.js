const userApi = require('./api/user');
const courseApi = require('./api/course');

module.exports = (app) => {
    app.use('/api/user', userApi);
    app.use('/api/course', courseApi);
}