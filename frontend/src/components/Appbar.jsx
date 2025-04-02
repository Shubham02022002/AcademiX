import { Button, Typography } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import { useNavigate } from "react-router-dom";

function Appbar() {
    const navigate = useNavigate();
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