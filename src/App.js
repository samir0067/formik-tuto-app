import React from 'react'
import { Styles } from "./Styles"
import {Form, Formik, useField} from "formik"
import * as Yup from 'yup'

const CustomeTextInput = ({label, ...props}) => {
  const [field, meta] = useField(props)

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  )
}

const CustomCheckox = ({children, ...props}) => {
  const [field, meta] = useField(props, 'checkbox')

  return (
    <>
      <label className="checkbox">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  )
}

const CustomSelect = ({label, ...props}) => {
  const [field, meta] = useField(props)

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  )
}

function App() {
  return (
    <Styles>
      <Formik
        initialValues={{
          name: '',
          email: '',
          acceptedTerms: false,
          specialPower: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(3, 'Doit comporter au moins 3 caractères')
            .max(20, 'Doit comporter 20 caractères ou moins')
            .required('Obligatoire'),
          email: Yup.string()
            .email('Adresse email invalide')
            .required('Obligatoire'),
          acceptedTerms: Yup.boolean()
            .oneOf([true], 'Vous devez accepter les termes et conditions')
            .required('Obligatoire'),
          specialPower: Yup.string()
            .oneOf(['fuite', 'invisibilité', 'riche chauve-souris', 'autre'], 'Pouvoir spécial invalide')
            .required('Obligatoire'),
        })}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            resetForm()
            setSubmitting(false)
          }, 3000)
        }}
      >
        {props => (
          <Form>
            <h1>Sign Up</h1>
            <CustomeTextInput label="Name" name="name" type="text" placeholder="Samir"/>
            <CustomeTextInput label="Email" name="email" type="email" placeholder="samir@email.com"/>
            <CustomSelect label="Special Power" name="specialPower">
              <option value="">Select a Special Power</option>
              <option value="flight">Flight</option>
              <option value="invisibility">Invisibility</option>
              <option value="wealthy bat guy">wealthy bat guy</option>
              <option value="other">Other</option>
            </CustomSelect>
            <CustomCheckox name="acceptedTerms">
              I accept the terms and conditions
            </CustomCheckox>
            <button type="submit">{props.isSubmitting ? "Loading..." : "Submit"}</button>
          </Form>
        )}
      </Formik>
    </Styles>
  )
}

export default App
