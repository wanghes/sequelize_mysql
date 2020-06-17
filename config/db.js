'use strict';
const Sequelize = require('sequelize');
const configs = require('./db.json');
const Op = Sequelize.Op;

const dbHost = configs.mysql.host;
const dbPort = configs.mysql.port;
const dbUsername = configs.mysql.username;
const dbPassword = configs.mysql.password;
const dbName = configs.mysql.dbName;

//mysql connect option
const db = {
    sequelize: new Sequelize(dbName, dbUsername, dbPassword, {
        host: dbHost,
        dialect: 'mysql',
        port: dbPort,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        operatorsAliases: {
            $and: Op.and,
            $or: Op.or,
            $eq: Op.eq,
            $gt: Op.gt,
            $lt: Op.lt,
            $lte: Op.lte,
            $like: Op.like
        },
        freezeTableName: true,
        timestamps: false
    })
};


module.exports = db;
