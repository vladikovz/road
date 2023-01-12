import { gql } from "@apollo/client";

export const GET_ALL_CITIES = gql`
  query {
    getCities {
      name
      id
      latitude
      longitude
    }
  }
`;

export const GET_ONE_CITY = gql`
  query getCity($id: Int) {
    getCity(id: $id) {
      name
      id
      latitude
      longitude
    }
  }
`;

export const CALCULATE = gql`
  mutation calculate($input: InputData) {
    calculate(input: $input)
  }
`;
