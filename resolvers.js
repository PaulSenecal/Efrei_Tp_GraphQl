// resolvers.js
module.exports = {
  Query: {
      users: async (_, __, { db }) => await db.all('SELECT * FROM users'),
      posts: async (_, __, { db }) => await db.all('SELECT * FROM posts'),
      user: async (_, { id }, { db }) => await db.get('SELECT * FROM users WHERE id = ?', id),
      post: async (_, { id }, { db }) => await db.get('SELECT * FROM posts WHERE id = ?', id),
      orders: async (_, __, { db }) => db.all('SELECT * FROM orders'),
      order: async (_, { id }, { db }) => db.get('SELECT * FROM orders WHERE id = ?', id),
  },
  Mutation: {
    addUser: async (_, { name, email }, { db }) => {
      const { lastID } = await db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
      return await db.get('SELECT * FROM users WHERE id = ?', lastID);
  },
      updateUser: async (_, { id, name, email }, { db }) => {
          await db.run('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
          return await db.get('SELECT * FROM users WHERE id = ?', id);
      },
      deleteUser: async (_, { id }, { db }) => {
          const user = await db.get('SELECT * FROM users WHERE id = ?', id);
          await db.run('DELETE FROM users WHERE id = ?', id);
          return user;
      },
      addPost: async (_, { userId, title, content }, { db }) => {
          const { lastID } = await db.run('INSERT INTO posts (userId, title, content) VALUES (?, ?, ?)', [userId, title, content]);
          return await db.get('SELECT * FROM posts WHERE id = ?', lastID);
      },
      updatePost: async (_, { id, title, content }, { db }) => {
          await db.run('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, id]);
          return await db.get('SELECT * FROM posts WHERE id = ?', id);
      },
      deletePost: async (_, { id }, { db }) => {
          const post = await db.get('SELECT * FROM posts WHERE id = ?', id);
          await db.run('DELETE FROM posts WHERE id = ?', id);
          return post;
      },
      addOrder: async (_, { userId, total }, { db }) => {
        const { lastID } = await db.run('INSERT INTO orders (userId, total) VALUES (?, ?)', [userId, total]);
        return db.get('SELECT * FROM orders WHERE id = ?', lastID);
      },
  },
  User: {
      posts: async (user, _, { db }) => await db.all('SELECT * FROM posts WHERE userId = ?', user.id),
  },
  Post: {
      user: async (post, _, { db }) => await db.get('SELECT * FROM users WHERE id = ?', post.userId),
  },
  Order: {
    user: async (order, _, { db }) => db.get('SELECT * FROM users WHERE id = ?', order.userId),
  }
};
