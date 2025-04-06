import { Button, Typography } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Appbar() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    useEffect(() => {
        axios.get('http://localhost:3000/admin/me', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((resp) => {
            if (resp.data.user) {
                setUsername(resp.data.user);
            }
        })
    }, []);
    if (username) {
        return (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    <Typography variant="h5" >
                        AcademiX
                    </Typography>
                </div>
                <div style={{ display: "flex" }}>
                    <Typography variant="body2" style={{ marginRight: "5px" }}>
                        {username}
                    </Typography>
                    <Button variant="contained" onClick={() => {
                        localStorage.setItem("token", null);
                        window.location = '/';
                        // navigate('/')
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
                <Button variant="contained" style={{ marginRight: "5    px" }} onClick={() => {
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