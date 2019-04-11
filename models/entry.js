'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  const entries = sequelize.define('entries', {
	date: Sequelize.DATE,
	entry: Sequelize.STRING(4000),
	climbing_time: Sequelize.STRING,
	warmup_time: Sequelize.STRING,
	accomplishment: Sequelize.STRING,
	current_goal: Sequelize.STRING,
	weight: Sequelize.INTEGER
  }, {});

  entries.associate = function(models) {
	// None
  };

  return entries;
};
