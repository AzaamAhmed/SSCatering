import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '' // Assuming 'role' is part of your user schema
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
         // Perform character validation before updating the state
    if (name === 'name' || name === 'role') {
        // Check if the value contains special characters
        const containsSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
        if (containsSpecialChars) {
            alert(`The input for ${name} contains special characters. These are not allowed.`);
            return; // Don't update state if special characters are present
        }
    }
    setFormData(prevState => ({
        ...prevState,
        [name]: value
        }));
    };

    const riderect = async (e) => {

        navigate('/');

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send a POST request to the backend to register the user
            const response = await axios.post('http://localhost:3001/users', formData);
            console.log('User registered:', response.data);
            // Optionally, you can redirect the user or show a success message
        } catch (error) {
            console.error('Registration failed:', error.response.data.message);
            // Optionally, you can display an error message to the user
        }
    };





    
    function isSpclChar() {
        var iChars = "!@#$%^&*()+=-[]\\';,./{}|\":<>?";
        if (document.qfrm.q.value.indexOf(iChars) !== -1) {
            alert("The input contains special characters. These are not allowed.");
            return false;
        }
    }
    






    return (
        <div className="login-container">
            <div className="login-card"> 
                <h2 className="login-heading">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input-field"
                            required
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input-field" 
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="input-field"
                            required
                        />
                    </div>
                    <div>
                        <label>Role:</label>
                        <input
                            type="text"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="input-field"
                        />
                    </div>
                    <button type="submit" className="login-button">Register</button>
                    <br></br>
                    <br></br>
                    <label onClick={riderect}>Already having an account?</label>
                </form>
            </div>
        </div>
    );
}

export default Register;
