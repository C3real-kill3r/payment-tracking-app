import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';

// Styled components
const FormContainer = styled.div`
  background: #f5f7fa; /* light blue background */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 600px;
  margin: auto;
`;

const SectionTitle = styled.h3`
  text-align: left;
  color: #333;
  width: 100%;
`;

const Hint = styled.p`
  font-size: 0.8rem;
  color: #555;
  margin-top: -10px;
  margin-bottom: 10px;
`;

const FieldRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
`;

const FullWidthField = styled.div`
  width: 100%;
`;

const StyledField = styled(Field)`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  margin-top: 5px;
  box-sizing: border-box;

  &:focus {
    border-color: #007bff;
  }
`;

const StyledSelect = styled(StyledField).attrs({ as: 'select' })``;

const StyledErrorMessage = styled(ErrorMessage)`
  color: red;
  margin: 5px 0;
  font-size: 0.8rem;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  background-image: linear-gradient(to right, #b2f5ea, #61dafb);
  color: Black;
  font-size: 16px;
  border: none;
  width: 100%;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;

  &:hover {
    background-image: linear-gradient(to right, #61dafb, #b2f5ea);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const RequestSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  contact: Yup.string().required('Required'),
  requestType: Yup.string().required('Required'),
  hospital: Yup.string().when("requestType", {
    is: val => val === "injury",
    then: Yup.string().required("Hospital is required for injuries"),
    otherwise: Yup.string().notRequired()
  }),
  location: Yup.string().required('Required'),
  account: Yup.string().when("requestType", {
    is: val => val === "burial",
    then: Yup.string().required("Family account is required for burials"),
    otherwise: Yup.string().when("requestType", {
      is: val => val === "injury",
      then: Yup.string().required("Hospital account is required for injuries"),
      otherwise: Yup.string().notRequired()
    })
  }),
  documents: Yup.array().of(Yup.mixed().required('File is required')).min(1, 'At least one file is required')
});

function RequestForm() {
  return (
    <FormContainer>
      <Formik
        initialValues={{ 
          name: '', 
          contact: '', 
          requestType: '', 
          hospital: '', 
          location: '', 
          account: '', 
          documents: []
        }}
        validationSchema={RequestSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, touched, setFieldValue, values }) => (
          <StyledForm>
            <SectionTitle>Name</SectionTitle>
            <FieldRow>
              <StyledField type="text" name="name" placeholder="First Name" error={errors.name && touched.name} />
              <StyledField type="text" name="contact" placeholder="Last Name" error={errors.contact && touched.contact} />
            </FieldRow>
            <StyledErrorMessage name="name" component="div" />
            <StyledErrorMessage name="contact" component="div" />

            <SectionTitle>Details</SectionTitle>
            <FieldRow>
              <StyledSelect name="requestType" error={errors.requestType && touched.requestType} onChange={(e) => setFieldValue("requestType", e.target.value)}>
                <option value="">Select Request Type</option>
                <option value="injury">Injury</option>
                <option value="burial">Burial</option>
              </StyledSelect>
              <input
                type="file"
                multiple
                onChange={event => {
                  const files = event.target.files;
                  let myFiles = Array.from(files);
                  setFieldValue("documents", myFiles);
                }}
                style={{
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  width: '100%',
                  marginTop: '5px',
                  boxSizing: 'border-box'
                }}
              />
            </FieldRow>
            <StyledErrorMessage name="requestType" component="div" />
            <StyledErrorMessage name="documents" component="div" />

            {values.requestType === 'injury' && (
              <>
                <Hint>Please attach invoices from the hospital a document detailing the injuries.</Hint>
                <SectionTitle>Hospital</SectionTitle>
                <FullWidthField>
                  <StyledField type="text" name="hospital" placeholder="Hospital Name" error={errors.hospital && touched.hospital} />
                  <StyledErrorMessage name="hospital" component="div" />
                </FullWidthField>
              </>
            )}

            {values.requestType === 'burial' && (
              <>
                <Hint>Please attach the document of the postmortem and the burial permit.</Hint>
              </>
            )}

            <SectionTitle>Location</SectionTitle>
            <FullWidthField>
              <StyledField type="text" name="location" placeholder="Location" error={errors.location && touched.location} />
              <StyledErrorMessage name="location" component="div" />
            </FullWidthField>

            {values.requestType && (
              <>
                <SectionTitle>Account</SectionTitle>
                <FullWidthField>
                  <StyledField type="text" name="account" placeholder={values.requestType === "burial" ? "Family Bank Account" : "Hospital Bank Account"} error={errors.account && touched.account} />
                  <StyledErrorMessage name="account" component="div" />
                </FullWidthField>
              </>
            )}

            <StyledButton type="submit" disabled={isSubmitting}>
              Submit
            </StyledButton>
          </StyledForm>
        )}
      </Formik>
    </FormContainer>
  );
}

export default RequestForm;
