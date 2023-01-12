import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./schema.js";
import { CITIES } from "./db.js";

const resolvers = {
  Query: {
    getCities: () => CITIES,
    getCity: (_, { id }) => CITIES.find((item) => item.id === id),
  },
  Mutation: {
    calculate: (_, { input }) => getGeneralDestination(input),
  },
};

function getGeneralDestination(data) {
  let distance = 0;
  const stackCitiesOfDestination = data.citiesOfDestination;
  distance += haversineDistance(data.cityOfOrigin, stackCitiesOfDestination[0]);

  if (stackCitiesOfDestination.length >= 2) {
    for (let i = 0; i < stackCitiesOfDestination.length - 1; i++) {
      distance += haversineDistance(
        stackCitiesOfDestination[i],
        stackCitiesOfDestination[i + 1]
      );
    }
  }

  return distance;
}

function haversineDistance(originCity, desCities) {
  function toRad(x) {
    return (x * Math.PI) / 180;
  }

  const originLongitude = originCity.longitude;
  const originLatitude = originCity.latitude;

  const desLongitude = desCities.longitude;
  const desLatitude = desCities.latitude;

  const Radius = 6371; // km

  const x1 = desLatitude - originLatitude;
  const dLat = toRad(x1);
  const x2 = desLongitude - originLongitude;
  const dLon = toRad(x2);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(originLatitude)) *
      Math.cos(toRad(desLatitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const dist = Radius * c;

  return dist;
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
