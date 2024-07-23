import React, { useState } from "react";
import * as Yup from "yup";
import Form from "../components/Form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const fields = [
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Password", type: "password" },
];

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [spinner, setSpinner] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (data) => {
    try {
      const response = await login(data);
      navigate(-2);
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
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <p>
          Welcome back! Please enter your credentials below to access your
          account.
        </p>
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
        <p>
          Don't have an account yet?{" "}
          <Link to="/register" className="register-link">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
