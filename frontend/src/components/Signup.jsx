import Card from '@mui/material/Card';
import axios from 'axios';
import { Button, TextField, Typography } from "@mui/material";
import { useState } from 'react';
import { useNavigate } from "react-router";

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    return (
        <div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: "150px" }}>
                <Typography variant="h5" color='primary'>

                    Welcome to coursera plese signup below  !
                </Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "2px" }}>
                <Card style={{ width: 350, minHeight: 250 }}>

                    <div style={{ padding: "10px", marginTop: "20px" }}>
                        <TextField id="username" type='email' label="Username" variant="outlined" required fullWidth onChange={(e) => {
                            setUsername(e.target.value);
                        }} />
                        <br />
                        <br />
                        <TextField type='password' id="password" label="Password" variant="outlined" required fullWidth onChange={(e) => {
                            setPassword(e.target.value);
                        }} />
                        <br />
                        <br />
                        <Button variant='contained' onClick={() => {
                            axios.post('http://localhost:3000/admin/signup', {
                                username, password
                            }).then((res) => {
                                // console.log(res);
                                localStorage.setItem("token", res.data.token);
                                navigate('/addCourse');
                            })
                        }}>SignUp</Button>
                    </div>
                </Card >
            </div>
        </div >
    )

}
export default Signup;
