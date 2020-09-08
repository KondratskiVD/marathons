const entities = {
  Marathon: require('./marathon.js'),
  User: require('./user.js'),
  relationsUM: require('./user_marathon_relations.js')
};
entities.Marathon.belongsToMany(entities.User, {through: entities.relationsUM});
entities.User.belongsToMany(entities.Marathon, {through: entities.relationsUM});

module.exports = entities