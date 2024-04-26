import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

export default function SigninPage() {
    
    const [ values, setvalue ] = useState({
        Enrollment: "",
        Password: ""
    });

    const navigate = useNavigate();

    function handlechange (event) {
        const { name, value} = event.target;
        
        setvalue({
            ...values,
            [name]: value
        })
    }
    
    async function handlesubmit (event) {
        event.preventDefault();
        try {
            const response = await axios({
                url: "auth/login",
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({
                    username: values.Enrollment,
                    password: values.Password
                }),
            })
            setvalue({
                username: "",
                email: ""
            })
            if(response.status === 201) {
                toast.success("Login succesfully!");
                navigate("/Home");
                if(response.data.token) {
                    localStorage.setItem("jwt_token", response.data.token);
                    localStorage.setItem("Role", response.data.role)
                }
            }  
        } catch (error) {
            if(error.response.data.statusCode === 404) {
                toast.error("Enrollment Doesn't exits! ")
            }
            if(error.response.data.statusCode === 401) {
                toast.error("Wrong Password! ")
            }
        }
    }
    
    return (
        <div className="wrapper">

            <div className="login-box">
                <form onSubmit={handlesubmit}>
                    <h2>Login</h2>

                    <div className="input-box">
                        <span className="icon">
                            <ion-icon name="mail"></ion-icon>
                        </span>
                        <input type="tel" name="Enrollment" value={values.Enrollment} onChange={handlechange} required />
                        <label>Enrollment</label>
                    </div>

                    <div className="input-box">
                        <span className="icon">
                            <ion-icon name="lock-closed"></ion-icon>
                        </span>
                        <input type="Password" name="Password" value={values.Password} onChange={handlechange} required />
                        <label>Password</label>
                    </div>
                    
                    <button type="submit">Login</button>

                </form>
            </div>

        </div>
    );
}