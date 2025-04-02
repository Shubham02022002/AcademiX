import { Button, Typography } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Appbar() {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    useEffect(() => {
        axios.get('http://localhost:3000/admin/me', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((resp) => {
            if (!resp.data.user) {
                setLoggedIn(false);
            } else {
                setUsername(resp.data.user);
                setLoggedIn(true);
            }
        })
    }, []);
    if (loggedIn) {
        return (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    <Typography variant="h5" >
                        AcademiX
                    </Typography>
                </div>
                <div style={{ display: "flex" }}>
                    <Typography variant="body2">
                        {username}
                    </Typography>
                    <Button variant="contained" onClick={() => {
                        navigate('/')
                        setLoggedIn(false);
                        localStorage.setItem("token", null);
                    }}>Logout</Button>
                </div>
            </div>
        )
    }
    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
                <Typography variant="h5" >
                    AcademiX
                </Typography>
            </div>
            <div >
                <Button variant="contained" onClick={() => {
                    navigate('/signup')

                }}>Signup</Button>
                <Button variant="contained" onClick={() => {
                    navigate('/signin')
                }}>Signin</Button>
            </div>
        </div>
    )


}

export default Appbar;