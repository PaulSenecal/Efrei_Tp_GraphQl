// resolvers.js
const resolvers = {
    Query: {
      users: async (_, __, { db }) => {
        return new Promise((resolve, reject) => {
          db.all(`SELECT * FROM user`, [], (err, rows) => {
            if (err) {
              reject([]);
            }
            resolve(rows);
          });
        });
      },
      user: async (_, { id }, { db }) => {
        return new Promise((resolve, reject) => {
          db.get(`SELECT * FROM user WHERE id = ?`, [id], (err, row) => {
            if (err) {
              reject(null);
            }
            resolve(row);
          });
        });
      }
    },
    Mutation: {
      addUser: async (_, { name, email }, { db }) => {
        return new Promise((resolve, reject) => {
          db.run(`INSERT INTO user (name, email) VALUES (?, ?)`, [name, email], function (err) {
            if (err) {
              reject(null);
            }
            resolve({ id: this.lastID, name, email });
          });
        });
      },
      updateUser: async (_, { id, name, email }, { db }) => {
        return new Promise((resolve, reject) => {
          db.run(`UPDATE user SET name = ?, email = ? WHERE id = ?`, [name, email, id], function (err) {
            if (err) {
              reject(null);
            }
            resolve({ id, name, email });
          });
        });
      },
      deleteUser: async (_, { id }, { db }) => {
        return new Promise((resolve, reject) => {
          db.run(`DELETE FROM user WHERE id = ?`, [id], function (err) {
            if (err) {
              reject(null);
            }
            resolve({ id });
          });
        });
      }
    }
  };
  
  module.exports = resolvers;
  