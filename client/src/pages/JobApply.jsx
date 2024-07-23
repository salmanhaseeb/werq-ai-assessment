import React, { useState } from 'react';
import useAxios from '../hooks/useAxios';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import Form from '../components/Form';

const fields = [
    { name: "coverLetter", label: "Proposal", type: "textarea" },
  ];
  
  const initialValues = {
    coverLetter: "",
  };
  
  const validationSchema = Yup.object().shape({
    coverLetter: Yup.string().required("Proposal is required"),
  });

const JobApply = () => {
    const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const [error, setError] = useState("");
  const api = useAxios({authRequired: true});
  const params = useParams()
  const handleSubmit = async (data) => {
    try {
      const response = await api.post(`/jobs/apply/${params.id}`, data);
      navigate('/');
      return response;
    } catch (error) {
      throw error;
    }
  };

  const handleSpinner = (bool) => {
    setSpinner(bool);
  };

  const handleErrorMessage = (message) => {
    setError(message);
  };

  return (
    <div className='page'>
        <h2>Submit your Porposal</h2>
        <Form
          fields={fields}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          handleSpinner={handleSpinner}
          spinner={spinner}
          handleErrorMessage={handleErrorMessage}
          error={error}
        />
    </div>
  );
};

export default JobApply;
