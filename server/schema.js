export const typeDefs = `#graphql
  type City {
    name: String
    id: Int
    latitude: Float
    longitude: Float
  }

  type Query {
    getCities: [City]
    getCity(id: Int): City
  }

input CityInput {
  name: String
  id: Int
  latitude: Float
  longitude: Float
}

input InputData {
  citiesOfDestination: [CityInput]
  cityOfOrigin: CityInput,
  passengerCount: Int,
  date: String
}

type Mutation {
  calculate(input: InputData): Float
}
`;
