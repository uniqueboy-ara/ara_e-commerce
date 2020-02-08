
module.exports = (app) => {
  app.use('/api/users', require('./users'));
  app.use('/api/login', require('./athentication'));
  app.use('/api/admin', require('./adminPanel'));
  app.use('/api/categories', require('./categories'));
  app.use('/api/products', require('./products'));
  app.use('/api/shoppingCard', require('./shoppingCard'));
}