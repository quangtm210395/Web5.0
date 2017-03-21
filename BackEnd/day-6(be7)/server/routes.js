const userApi = require('./api/user');
const courseApi = require('./api/course');
const instructorApi = require('./api/instructor')

module.exports = (app) => {
    app.use('/api/user', userApi);
    app.use('/api/course', courseApi);
    app.use('/api/instructor', instructorApi);
}