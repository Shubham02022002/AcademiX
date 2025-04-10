import Card from '@mui/material/Card';
import { Button, TextField, Typography } from "@mui/material";
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from '../api/AxiosInstance';

function Signin() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "150px" }}>
                <Typography variant="h5" color='primary'>

                    Welcome Back, Plese login below!
                </Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "2px" }}>
                <Card style={{ width: 350, minHeight: 250 }}>

                    <div style={{ padding: "10px", marginTop: "20px" }}>
                        <TextField id="username" label="Username" variant="outlined" required fullWidth onChange={(e) => {
                            setUsername(e.target.value);
                        }} />
                        <br />
                        <br />
                        <TextField id="password" type='password' label="Password" variant="outlined" required fullWidth onChange={(e) => {
                            setPassword(e.target.value);
                        }} />
                        <br />
                        <br />
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Button variant='contained' onClick={() => {
                                AxiosInstance.post('/admin/login', {
                                    username,
                                    password
                                }, {
                                    headers: {
                                        "Content-Type": "application/json"
                                    }
                                }).then((resp) => {
                                    localStorage.setItem("token", resp.data.token);
                                    // navigate('/addCourse');
                                    window.location = '/addCourse';
                                })
                                    .catch((error) => {
                                        console.error("Axios error:", error.response?.data || error.message);
                                    });

                            }}>SignIn</Button>
                            <Button variant='outlined'>Forgot Password?</Button>
                        </div>
                    </div>
                </Card >
            </div >
        </div >
    )

}
export default Signin;
