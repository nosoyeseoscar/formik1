import React from 'react';
/* importamos de Formik todos los componentes que vamos a usar. */
import { Formik, Field, Form, ErrorMessage } from "formik";
/* importamos Yup para validaciones */
import * as yup from "yup";
import './App.css';

const valoresIniciales = {
  /* Valores iniciales de la forma */
  "email" : "",
  "pass" : "",
}

const validacionLogin = yup.object().shape({
  email: yup
    .string()
      .email("Debe ser un correo valido")
      .required("Es necesario tu correo electrònico"),
  pass: yup
    .string()
      .min(8, "minimo 8 caracteres.")
      .max(16, "maximo 16 caracteres")
      /* .matches("/^(?=.*[a-z]{1})(?=.*[A-Z]{1})(?=.*[0-9]{1})$/","debe tener al menos una mayusculas, minuscula y un numero") */
      .matches(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/, "La contraseña debe tener un número, una mayuscula y una minuscula cuanto menos.")
      .required("tu correo electrònico es requerido"),
})

const onSubmit = (values, { setSubmitting }) =>{
    console.log("Submitted Email:", values.email)
    console.log("Submitted Password:", values.pass)
    // Simulates the delay of a real request
    setTimeout(() => setSubmitting(false), 3 * 1000)
}


function App() {
  return (
    <div className="App">
      <Formik
        initialValues = { valoresIniciales }

        validationSchema = { validacionLogin }

        onSubmit={onSubmit}
      >
        {
          ( /* Función como parametro */
            {
              /* Destructuramos lo que ocupamos de las herramientas de formik */
             /*  Valores que no usamos
             
              values,
              errors,
              touched,
              validating,
              valid, */
              handleSubmit,
              isSubmitting,
              isValid,
              dirty,
            } /* Objeto con todo lo bueno de fomik  */
          ) => {
              return (
                /* Componente para renderizar formulario------------------------------------ */
                <Form name="contact" method="post" onSubmit={handleSubmit}>
                  <label htmlFor="email">
                    Correo electrónico                    
                    <Field type="email" name="email" placeholder="tu correo electrónico."/>
                  </label>
                  <ErrorMessage name="email"></ErrorMessage>
                  <label htmlFor="pass">
                    Contraseña
                    <Field type="password" name="pass" placeholder="tu contraseña"/>
                  </label>
                  <ErrorMessage name="pass"></ErrorMessage>
                  <button type="submit" disabled={!(isValid && dirty) || isSubmitting}>
                    {isSubmitting ? `Enviando...` : `Enviar`}
                  </button>
                </Form>
              );
          }
        }
      </Formik>
    </div>
  );
}

export default App;
