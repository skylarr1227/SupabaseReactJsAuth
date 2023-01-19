import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';


const supabase = createClient(
    "https://mgnwvyvyohgwnmxoonpc.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nbnd2eXZ5b2hnd25teG9vbnBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQxMDA4MDAsImV4cCI6MTk4OTY3NjgwMH0.kUUrzWtcxsg1TkV4fYKYrbiXZvaTXYQU7spg6dAwuL8"
)

function Success() {

    const navigate = useNavigate();

    const [isEmail, setIsEmail] = useState(false);
    const [user, setUser] = useState();

    useEffect(() => {
        async function getUserData() {
            await supabase.auth.getUser()
            .then((value) => {
                if(value.data?.user) {
                    if(value.data.user.app_metadata.provider==='email') {
                        setIsEmail(true)
                    }
                    setUser(value.data.user);
                } else if(value.error.__isAuthError) {
                    alert("Invalid Login")
                    navigate("/");
                }
            })
        }
        getUserData();
    }, [])

    async function logOut() {
        try {
            const { error } = await supabase.auth.signOut();
            if(error) {
                throw error;
            } else {
                navigate("/");
            }
        } catch(error) {
            alert(error.message);
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                {
                    (user !== undefined) ? 
                    (<>
                        <h1>Success</h1>
                        {(isEmail)?(<h2>Helloooo!</h2>):(<h2>Hello! {user.user_metadata?.name}</h2>)}
                        {(isEmail)?(<h4>Your Email ID : {user.email}</h4>):(<h4>Your Email ID : {user.user_metadata?.email}</h4>)}
                        <h4>Auth Used : {user.app_metadata?.provider}</h4>
                        <button onClick={()=> logOut()} className="btn btn-danger">Sign Out</button>
                    </>) : (<></>)

                }
            </header>
        </div>
    );
}

export default Success;
