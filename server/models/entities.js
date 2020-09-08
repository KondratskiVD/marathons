const relations_UM = require('./user_marathon_relations.js')
const Marathon = require('./marathon.js')
const User = require('./user.js')

const entities = {
  A: require('./src/Entity/A'),
  B: require('./src/Entity/B'),
};
entities.Marathon.belongsToMany(User, {through: relations_UM});
entities.User.belongsToMany(Marathon, {through: relations_UM});