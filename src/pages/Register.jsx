import Form from "../components/Form";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const handleSuccess = () => {
        navigate("/login"); // Navigate to login on successful registration
    };

    return <Form route="https://blogapi-qm9m.onrender.com/api/user/register/" method="register" onSuccess={handleSuccess} />;
}

export default Register;
