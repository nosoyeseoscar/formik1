import React from 'react';
/* importamos de Formik todos los componentes que vamos a usar. */
import { Formik, Field, Form, ErrorMessage } from "formik";
/* importamos Yup para validaciones */
import * as yup from "yup";
import './App.css';
/* importamos los componentes ya hechos de material-ui-formik-components */
import { TextField } from "material-ui-formik-components/TextField";
import Button from '@material-ui/core/Button';

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
      .matches(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/, "La contraseña debe tener un número, una mayuscula y una minuscula al menos.")
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
                <div className="forma">
                  <h2 className="centrado">Formulario de Ingreso</h2>
                  <Form name="ingreso" method="post" onSubmit={handleSubmit} >                       
                    <Field type="email" label="Correo electrónico " name="email" placeholder="tu correo electrónico." component={TextField}/>
                    <ErrorMessage name="email"></ErrorMessage>  
  
                    <Field type="password" label= "Contraseña"name="pass" placeholder="tu contraseña" component={TextField}/>
                    <ErrorMessage name="pass"></ErrorMessage>
  
                    <Button type="submit" disabled={!(isValid && dirty) || isSubmitting} variant="contained" color="primary">
                      {isSubmitting ? `Enviando...` : `Enviar`}
                    </Button>
                  </Form>
                </div>
              );
          }
        }
      </Formik>
    </div>
  );
}

export default App;
