import { users } from "./data/users.js";

export const resolvers = {
  Query: {
    getUsers: () => users,
    getUserById: (parent, args) => users.find((user) => user.id === args.id),
  },
  Mutation: {
    createUser: (parent, args) => {
      const { name, age, isMarried } = args;
      const newUser = {
        id: String(users.length + 1),
        name,
        age,
        isMarried,
      };
      users.push(newUser);
      return newUser;
    },
  },
};
