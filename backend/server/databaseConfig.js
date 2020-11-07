const knex = require('knex')
const  config =require('../knexfile.js') 
// database configuration
const database = knex(config.development)
module.exports=  database