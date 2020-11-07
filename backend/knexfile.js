// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './server/students.db3'
    },
    useNullAsDefault: true,
    seeds:{
      directory: './server/seeds'
    },
    migrations:{
      directory: './server/migrations'
    }
  },
};
