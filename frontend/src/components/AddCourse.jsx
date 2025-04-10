import { Button, Card, MenuItem, Select, TextField, Typography, } from "@mui/material";
import axios from "axios";
import AxiosInstance from "../api/AxiosInstance";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function AddCourse() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        imageLink: "",
        price: "",
        published: false
    });

    const handleChange = (field) => (e) => {
        setFormData({
            ...formData,
            [field]: e.target.value,
        })
    }
    const handleSelectChange = (e) => {
        setFormData({
            ...formData,
            published: e.target.value === "true"
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await AxiosInstance.post('/admin/courses', {
                title: formData.title,
                description: formData.description,
                imageLink: formData.imageLink,
                price: Number(formData.price),
                published: formData.published,
            }, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            toast.success('🔥Course created successfully!', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setFormData({
                title: "",
                description: "",
                imageLink: "",
                price: "",
                published: false
            });

        } catch (err) {
            console.error(err);
            toast.error('Failed to create course', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    }
    return (
        <div >
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: "50px" }}>
                <Typography variant="h6" color="primary" >
                    Add course here!!
                </Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
                <Card style={{ padding: "5px", width: 450 }}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            id="title"
                            value={formData.title}
                            onChange={handleChange("title")}
                            label="Course Title"
                            variant="outlined"
                            required fullWidth />
                        <br />
                        <br />
                        <TextField
                            id="description"
                            value={formData.description}
                            onChange={handleChange("description")}
                            label="Course Description"
                            variant="outlined"
                            required fullWidth />
                        <br />
                        <br />
                        <TextField
                            id="imageLink"
                            value={formData.imageLink}
                            onChange={handleChange("imageLink")}
                            type="url"
                            label="Course Image"
                            variant="outlined"
                            required fullWidth />
                        <br />
                        <br />
                        <TextField
                            id="price"
                            value={formData.price}
                            onChange={handleChange("price")}
                            type="number"
                            label="Course Price"
                            variant="outlined"
                            required fullWidth />
                        <br />
                        <br />
                        <Select fullWidth
                            id="published"
                            label="Published"
                            required
                            value={formData.published ? "true" : "false"}
                            onChange={handleSelectChange}
                        >
                            <MenuItem value="true">Published</MenuItem>
                            <MenuItem value="false">Unpublished</MenuItem>
                        </Select>
                        <br />
                        <br />
                        <Button type="submit" variant="contained">Add Course</Button>
                    </form>
                </Card>
            </div>
        </div>
    )
}

export default AddCourse;