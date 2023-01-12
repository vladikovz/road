// import "./App.css";
import { useMutation, useQuery } from "@apollo/client";
import { CALCULATE, GET_ALL_CITIES, GET_ONE_CITY } from "./query/city";
import React, { useState } from "react";
import style from "./app.module.css";
import { Form } from "./components/Form/Form";
import { Result } from "./components/Result/Result";

export type City = {
  name: string;
  id: number;
  latitude: number;
  longitude: number;
};

export type DataFields = {
  cityOfOrigin: City;
  citiesOfDestination: City[];
  date: string | null;
  passengerCount: number | null;
};

function App() {
  const { data: cities, loading, error } = useQuery(GET_ALL_CITIES);
  const { data: city } = useQuery(GET_ONE_CITY, { variables: { id: 1 } });
  const [result, setResult] = useState<string | null>(null);
  const [calculate] = useMutation(CALCULATE);

  // console.log("cities", cities?.getCities);

  const handleSubmit = (data: DataFields) => {
    setResult(null);
    console.log("data", data);
    if (data) {
      calculate({
        variables: {
          input: data,
        },
      }).then((res) => {
        if (res?.data) {
          setResult(res.data.calculate.toFixed(2));
        }
      });
    }
  };

  return (
    <section className={style.container}>
      <h1 className="header">Road</h1>
      <main>
        <Form onSubmit={handleSubmit} />
      </main>
      {result && <Result value={result} />}
    </section>
  );
}

export default App;
