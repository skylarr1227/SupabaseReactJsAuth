import { createClient } from '@supabase/supabase-js';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const supabase = createClient(
    "https://mgnwvyvyohgwnmxoonpc.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nbnd2eXZ5b2hnd25teG9vbnBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQxMDA4MDAsImV4cCI6MTk4OTY3NjgwMH0.kUUrzWtcxsg1TkV4fYKYrbiXZvaTXYQU7spg6dAwuL8"
)

function Login() {

    const navigate = useNavigate();
    
    const [emailL, setEmailL] = useState(''); 
    const [passwordL, setPasswordL] = useState(''); 
    

    supabase.auth.onAuthStateChange(async (event) => {
        if(event !== "SIGNED_OUT") {
            navigate("/success");
        } else {
            navigate("/");
        }
    });

    const SignIn = async (event) => {
        event.preventDefault();

        const { data, error } = await supabase.auth.signInWithPassword({
            email: emailL, 
            password: passwordL,
        })

        if(error) {
            alert(error.message)
        } else {
            console.log('Login successfully')
            console.log(data.user)
            console.log(data.session)
            navigate("/success")
        }
    }

    return (
        <div className="App">
            <Auth 
                supabaseClient={supabase}
                appearance={{theme: ThemeSupa}}
                theme="dark"
                providers={['discord', 'google']}
                onlyThirdPartyProviders={true}
            />

            <hr />

            <h3>Login</h3>
            <form onSubmit={SignIn}>
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        onChange={(e) => setEmailL(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        onChange={(e) => setPasswordL(e.target.value)}
                    />
                </div>
                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary" onClick={() => {SignIn()}}> Login </button>
                    <button className="btn btn-primary" onClick={() => {navigate("/register")}}> Register </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
