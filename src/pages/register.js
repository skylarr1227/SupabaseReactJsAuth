import { createClient } from '@supabase/supabase-js';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const supabase = createClient(
    "https://mgnwvyvyohgwnmxoonpc.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nbnd2eXZ5b2hnd25teG9vbnBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQxMDA4MDAsImV4cCI6MTk4OTY3NjgwMH0.kUUrzWtcxsg1TkV4fYKYrbiXZvaTXYQU7spg6dAwuL8"
)
    function Register() {

    const navigate = useNavigate();

    const [emailR, setEmailR] = useState(''); 
    const [passwordR, setPasswordR] = useState(''); 
    const [username, setUsername] = useState('');

    const Register = async (event) => {
        event.preventDefault();
        const {data, error} = await supabase.auth.signUp({
            email: emailR,
            password: passwordR,
        },
        {
            data: {
                username
            }
        })
        if(error){
            alert(error.message)
        } else {
            console.log('User created successfully')
            console.log(data.user)
            navigate("/")
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <h3>Register</h3>
                <form onSubmit={Register}>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            onChange={(e) => setEmailR(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            onChange={(e) => setPasswordR(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-primary" onClick={() => Register()} > Register </button>
                        <button type="submit" className="btn btn-primary" onClick={() => {navigate("/")}}> Login </button>
                    </div>
                </form>
            </header>
        </div>
    );
}

export default Register;
