import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./schema.js";
import { CITIES } from "./db.js";

const resolvers = {
  Query: {
    getCities: () => CITIES,
    getCity: ({id})=>CITIES.find(item=>item.id ===id)
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
