import * as yup from "yup";

export const validationSchema = yup.object().shape({
  cityOfOrigin: yup.object().shape({
    name: yup.string().nullable().required("Required"),
  }),
  citiesOfDestination: yup
    .object()
    .shape({
      cityOfDestination: yup.object().shape({
        name: yup.string().nullable().required("Required"),
      }),
    })
    .nullable()
    .required("Required"),

  passengerCount: yup.number().nullable().required("Required"),

  date: yup.date().required("Required"),
});
