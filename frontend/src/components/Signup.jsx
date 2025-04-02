import Card from '@mui/material/Card';
import { Button, TextField, Typography } from "@mui/material";

function Signup() {
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
                        <TextField id="username" label="Username" variant="outlined" required fullWidth />
                        <br />
                        <br />
                        <TextField id="password" label="Password" variant="outlined" required fullWidth />
                        <br />
                        <br />
                        <Button variant='contained'>SignUp</Button>
                    </div>
                </Card >
            </div>
        </div >
    )

}
export default Signup;
