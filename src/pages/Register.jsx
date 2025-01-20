import React from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate to handle navigation
import Form from "../components/Form";

function Register() {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleSuccess = () => {
        alert("Registration successful! Please log in.");
        navigate("/login"); // Redirect to the login page after successful registration
    };

    return (
        <Form
            route="https://blogapi-qm9m.onrender.com/api/user/register/"
            method="register"
            onSuccess={handleSuccess} // Pass the success handler to the Form component
        />
    );
}

export default Register;
