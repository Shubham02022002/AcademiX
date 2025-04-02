import { Button, ButtonGroup, Card, MenuItem, Select, TextField, Typography, } from "@mui/material";

function AddCourse() {
    return (
        <div >
            <div style={{ display: 'flex', justifyContent: 'center', marginTop:"50px" }}>
                <Typography variant="h6" color="primary" >
                    Add course here!!
                </Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
                <Card style={{ padding: "5px", width: 450 }}>
                    <TextField id="title" label="Course Title" variant="outlined" required fullWidth />
                    <br />
                    <br />
                    <TextField id="description" label="Course Description" variant="outlined" required fullWidth />
                    <br />
                    <br />
                    <TextField id="imageLink" type="url" label="Course Image" variant="outlined" required fullWidth />
                    <br />
                    <br />
                    <TextField id="price" type="number" label="Course Price" variant="outlined" required fullWidth />
                    <br />
                    <br />
                    <Select fullWidth
                        id="published"
                        label="Published"
                        required
                    >
                        <MenuItem value={true}>True</MenuItem>
                        <MenuItem value={false}>False</MenuItem>
                    </Select>
                    <br />
                    <br />
                    <Button variant="contained">Add Course</Button>
                </Card>
            </div>
        </div>
    )
}

export default AddCourse;