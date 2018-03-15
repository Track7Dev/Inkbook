module.exports = (routes) => {
  require('./auth')(routes);
  require('./userConfig')(routes);
  require('./messageSystem')(routes);
  require('./data')(routes);
  require('./images')(routes);
}