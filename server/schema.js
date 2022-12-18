export const typeDefs = `#graphql
  type City {
    name: String
    id: Int
    latitude: Float
    longitude: Float
  }
  type Query {
    getCities: [City]
    getCity(id: ID): City
  }
`;
