import { Formik, FormikErrors } from "formik";
import { FormTextField } from "../FormTextField/FormTextField";
import style from "./Form.module.css";
import { FormSelect } from "../FormSelect/FormSelect";
import { useQuery } from "@apollo/client";
import { GET_ALL_CITIES } from "../../query/city";
import { City, DataFields } from "../../App";
import { Button } from "@mui/material";
import { FormDate } from "../FormDate/FormDate";
import AddIcon from "@mui/icons-material/Add";
import React, { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { validationSchema } from "./validationSchema";

type CityOfDestination = {
  [key: string]: City;
};

type FormFields = {
  cityOfOrigin: City;
  citiesOfDestination: CityOfDestination;
  date: Date | null;
  passengerCount: number | null;
};

type FormProps = {
  onSubmit: (data: DataFields) => void;
};

const initialValues: FormFields = {
  citiesOfDestination: {
    cityOfDestination: {} as City,
  },
  cityOfOrigin: {} as City,
  date: null,
  passengerCount: null,
};

export const Form = (props: FormProps) => {
  const { data: cities } = useQuery(GET_ALL_CITIES);
  const { onSubmit } = props;
  const citiesForSelect: City[] = useMemo(() => {
    return cities?.getCities.map((item: City) => {
      return {
        name: item.name,
        id: item.id,
        latitude: item.latitude,
        longitude: item.longitude,
      };
    });
  }, [cities?.getCities]);
  console.log(citiesForSelect);
  const [formExtraElements, setFormExtraElements] = useState<JSX.Element[]>([]);

  const handleAddDestinationField = (
    values: FormFields,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void,
    dirty: boolean,
    errors: FormikErrors<FormFields>
  ) => {
    const elements: JSX.Element[] = [...formExtraElements];
    const elementId = uuidv4();

    const handleRemoveField = (cityId: number, key: string) => {
      setFormExtraElements((prev) =>
        prev
          .filter((item) => item.key !== key)
          .map((item, index) => {
            return {
              ...item,
              props: {
                ...item.props,
                label: `City of destination ${index + 1}`,
                placeholder: `Enter the city ${index + 1}`,
              },
            };
          })
      );
      setFieldValue("citiesOfDestination." + key, undefined);
    };

    elements.push(
      <FormSelect
        key={elementId}
        label={`City of destination ${formExtraElements.length + 1}`}
        value={values.citiesOfDestination[elementId]}
        items={citiesForSelect ?? []}
        onChange={(value) =>
          setFieldValue("citiesOfDestination." + elementId, value)
        }
        placeholder={`Enter the city ${formExtraElements.length + 1}`}
        onRemove={(cityId) => handleRemoveField(cityId, elementId)}
        error={dirty && Boolean(errors.citiesOfDestination)}
        helperText={dirty && errors.citiesOfDestination}
      />
    );
    setFormExtraElements(elements);
  };

  const handleSubmit = (values: FormFields) => {
    if (!values) return null;

    const formatValues: DataFields = {
      cityOfOrigin: {
        name: values.cityOfOrigin.name,
        id: values.cityOfOrigin.id,
        longitude: values.cityOfOrigin.longitude,
        latitude: values.cityOfOrigin.latitude,
      },
      citiesOfDestination: Object.values(values.citiesOfDestination).map(
        (value) => value
      ),
      passengerCount: Number(values.passengerCount),
      date: values.date ? values.date.toString() : null,
    };

    onSubmit(formatValues);
  };

  return (
    <section className={style.container}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSubmit(values);
          setSubmitting(false);
          resetForm({ values: { ...initialValues } });
          setFormExtraElements([]);
        }}
        validationSchema={validationSchema}
        validateOnMount={Boolean(initialValues)}
      >
        {({
          setFieldValue,
          values,
          errors,
          isSubmitting,
          dirty,
          isValid,
          handleSubmit,
          resetForm,
          setValues,
        }) => (
          <form onSubmit={handleSubmit}>
            <FormSelect
              label={"City of origin"}
              value={values.cityOfOrigin}
              items={citiesForSelect ?? []}
              onChange={(value) => setFieldValue("cityOfOrigin", value)}
              placeholder={"Enter the city"}
              error={dirty && Boolean(errors.cityOfOrigin?.name)}
              helperText={dirty && errors.cityOfOrigin?.name}
            />
            <FormSelect
              label={"City of destination"}
              value={values.citiesOfDestination.cityOfDestination}
              items={citiesForSelect ?? []}
              onChange={(value) =>
                setFieldValue("citiesOfDestination.cityOfDestination", value)
              }
              placeholder={"Enter the city"}
              error={
                dirty &&
                Boolean(errors.citiesOfDestination?.cityOfDestination?.name)
              }
              helperText={
                dirty && errors.citiesOfDestination?.cityOfDestination?.name
              }
            />
            {formExtraElements}

            <div className={style.addButtonContainer}>
              <Button
                disabled={formExtraElements.length >= 10}
                size={"small"}
                variant={"outlined"}
                onClick={() =>
                  handleAddDestinationField(
                    values,
                    setFieldValue,
                    dirty,
                    errors
                  )
                }
                startIcon={<AddIcon />}
              >
                Add intermediate city
              </Button>
            </div>

            <FormTextField
              value={values.passengerCount}
              label={"Number of passenger"}
              onChange={(value) => setFieldValue("passengerCount", value)}
              placeholder={"Enter the number of passenger"}
              error={dirty && Boolean(errors.passengerCount)}
              helperText={dirty && errors.passengerCount}
            />
            <FormDate
              onChange={(value) => setFieldValue("date", value)}
              label={"Date"}
              value={values.date}
              placeholder={"Enter the date"}
              error={dirty && Boolean(errors.date)}
              helperText={dirty && errors.date}
            />
            <div className={style.control}>
              <Button
                sx={{ marginRight: "10px" }}
                type="reset"
                onClick={() => {
                  setFormExtraElements([]);
                  resetForm({ values: initialValues });
                }}
                disabled={!dirty || isSubmitting}
              >
                Clear
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !dirty || !isValid}
              >
                Calculate
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </section>
  );
};
