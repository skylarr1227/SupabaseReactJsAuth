import { createClient } from '@supabase/supabase-js';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const supabase = createClient(
    "https://iizghvrvshamveeejuqb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpemdodnJ2c2hhbXZlZWVqdXFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM3MTI4MDYsImV4cCI6MTk4OTI4ODgwNn0.LNm2UxFwB6t6r3B0FBcAYRyscJpTDe2iV9ilfMc39aU"
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
