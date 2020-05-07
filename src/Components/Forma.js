import React from 'react'
import {Formik, Form, Field, ErrorMessage}  from 'formik'
import * as yup from "yup"


const validacionLogin = yup.object().shape({
    email: yup
      .string()
      .email("Debe ser un correo valido")
      .required("Es necesario tu correo electrònico"),
    password: yup
      .string()
      .min(8, "minimo 8 caracteres.")
      .max(16, "maximo 16 caracteres")
      .matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]$","debe tener mayusculas, minusculas y numeros")
      .required("tu correo electrònico es requerido"),
  })

const valoresIniciales = {
    /* Valores iniciales de la forma */
    "email" : "",
    "pass" : "",
}

function onSubmit(values, { setSubmitting }) {   
    /* función que controla el submit */
  console.log(values);    
  setSubmitting(false);
}

function FormaLogin(props) {
    /* función que genera la forma */

    /* destructuramos los props recibidos en cada una de las funciones de formik */
    const {isSubmitting, errors , touched, handleChange, handleSubmit, } = props
    
    /* regresamos la forma completa */
    return(
        <Form name="login" method="post" onSubmit={handleSubmit}>
            <label htmlFor="email">
                Correo electrónico                    
                <Field type="email" name="email" placeholder="Tu correo electrónico."/>
            </label>
            <ErrorMessage name="email"> {(msg="Falta el correo electrònico") => <p>{msg}</p>}</ErrorMessage>

            <label htmlFor="pass">
                Contraseña
                <Field type="pass" name="pass" placeholder="Tu contraseña"/>
            </label>

            <ErrorMessage name="password">{(msg="Falta el Password") => <p>{msg}</p>}</ErrorMessage>

            <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? `Submiting...` : `Submit`}
            </button>
        </Form>
    )
    
}

export default function Forma() {
    /* Componente de la forma */
    return (
        <Formik
            initialValues={valoresIniciales /* recibimos los valores iniciales */} 
            validationSchema = {validacionLogin} /* recibimos es esquema de validación Yup */
            onSubmit={onSubmit}
            /* render={FormaLogin} */
        />
        {(  {isSubmitting, errors , touched, handleChange, handleSubmit } ) => {

        }}
        </Formik>
    )
}
