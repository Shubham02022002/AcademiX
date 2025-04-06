import { Box, Button, Card, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { CourseCard } from './Courses';
import { ToastContainer, toast } from 'react-toastify';
import Signin from './Signin';

const Course = () => {
    let { courseId } = useParams();
    let [username, setUsername] = useState("");
    let [course, setCourse] = useState(null);
    let [courses, setCourses] = useState([]);
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
    useEffect(() => {
        axios.get("http://localhost:3000/admin/courses/", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((resp) => {
            setCourses(resp.data.courses);
            setCourse(resp.data.courses.find(c => c._id === courseId));
        })
    }, []);
    if (!username) {
        return (
            <Signin />
        )
    }
    if (!course) {
        return <Box sx={{ display: 'flex', justifyContent: "center", marginTop: "150px" }}>
            <CircularProgress />
        </Box>
    }
    return (
        <div style={{ display: "flex" }}>
            <CourseCard course={course} />
            <UpdateCard course={course} courses={courses} setCourse={setCourse} />
        </div>
    )
}

function UpdateCard({ course, setCourse, courses }) {
    const { courseId } = useParams();
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
            await axios.put('http://localhost:3000/admin/courses/' + course._id, {
                title: formData.title,
                description: formData.description,
                imageLink: formData.imageLink,
                price: Number(formData.price),
                published: formData.published,
            }, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }).then(() => {
                let updateCourse = {
                    _id: course._id,
                    title: formData.title,
                    description: formData.description,
                    imageLink: formData.imageLink,
                    price: Number(formData.price),
                    published: formData.published,
                }
                let updatedCourses = courses.map(c => c._id === updateCourse._id ? { ...c, ...updateCourse } : c);
                setCourse(updatedCourses.find(c => c._id === courseId))
            })
            toast.success('🔥Course updated successfully!', {
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
            toast.error('Failed to upload course', {
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
        <Card style={{ padding: "5px", width: 450 }}>
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
            <Typography>Update Course Details</Typography>
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
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Button type="submit" variant="contained">Update Course</Button>
                    <Button variant='contained' color='warning' onClick={() => {
                        axios.delete('http://localhost:3000/admin/course/' + course._id, {
                            headers: {
                                "Authorization": "Bearer " + localStorage.getItem('token')
                            }
                        })
                            .then((resp) => {
                                toast.success('Course deleted successfully!', {
                                    position: "bottom-center",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                });
                                setTimeout(() => {
                                    window.location = '/courses';
                                }, 4000);
                            })
                    }}>Delete</Button>
                </div>
            </form>
        </Card >
    )
}

export default Course;