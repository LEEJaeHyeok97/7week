const Sequelize = require("sequelize");
const Emails = require("./emails");  // 1
const Posts = require("./posts");


const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.Emails = Emails;  // 2
db.Posts = Posts; 


Emails.init(sequelize);  // 3
Posts.init(sequelize);


Emails.associate(db);  // 4
Posts.associate(db);


module.exports = db;


