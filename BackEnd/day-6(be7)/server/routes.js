const userApi = require('./api/user');
const courseApi = require('./api/course');
const instructorApi = require('./api/instructor');
const authApi = require('./api/auth');

module.exports = (app) => {
    app.use('/api/user', userApi);
    app.use('/api/course', courseApi);
    app.use('/api/instructor', instructorApi);
    app.use('/api/auth', authApi);
}