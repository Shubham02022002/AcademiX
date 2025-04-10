import { Box, Button, Card, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Signin from './Signin';
import { RecoilRoot, atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import AxiosInstance from '../api/AxiosInstance';

export const courseState = atom({
    key: 'courseState',
    default: null,
});

const CourseEdit = () => {
    let { courseId } = useParams();
    let [username, setUsername] = useState("");
    let [course, setCourse] = useRecoilState(courseState);

    useEffect(() => {
        AxiosInstance.get('/admin/me', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((resp) => {
            if (resp.data.user) {
                setUsername(resp.data.user);
            }
        });
        AxiosInstance.get("/admin/courses/" + courseId, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((resp) => {
            setCourse(resp.data.course);
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

        <div style={{
            margin: 0,
            overflowX: 'hidden',
        }}>
            <GrayTopper />
            <Grid container>
                <Grid item lg={8} md={12} sm={12}>
                    <UpdateCard course={course} setCourse={setCourse} />
                </Grid>
                <Grid item lg={4} md={12} sm={12}>
                    <CourseCard />
                </Grid>
            </Grid>
        </div >
    )
}
function CourseCard() {
    const course = useRecoilValue(courseState);
    return (

        <div style={{ display: "flex", marginTop: 60, justifyContent: "center", width: "100%", marginLeft: 300 }}>
            <Card style={{ margin: 10, widht: 350, minHeight: 200, borderRadius: 20, marginRight: 50, paddingBottom: 15, zIndex: 2 }}>
                <img src={course.imageLink} style={{ width: 350 }} />
                <div style={{ marginLeft: 10 }}>
                    <Typography variant='h5'>{course.description}</Typography>
                    <Typography variant='subtitle1' style={{ color: "grey" }}>Price</Typography>
                    <Typography variant='subtitle1'>
                        <b>Rs {course.price}</b>
                    </Typography>
                </div>

            </Card>
        </div>
    )
}
function GrayTopper() {
    const course = useRecoilValue(courseState);
    console.log(course);
    return (
        <div style={{ height: 200, background: "#212121", top: 0, width: "100vw", zIndex: 0, marginBottom: -250 }}>
            <div style={{ height: 200, display: 'flex', justifyContent: "center", flexDirection: "column" }}>
                <div>
                    <Typography style={{ color: "white", fontWeight: 600 }} variant='h3' textAlign={"center"}>
                        {course.title}
                    </Typography>
                </div>
            </div>
        </div>
    )
}

function UpdateCard() {
    let course = useRecoilValue(courseState);
    let setCourse = useSetRecoilState(courseState);
    const [formData, setFormData] = useState({
        title: course.title,
        description: course.description,
        imageLink: course.imageLink,
        price: course.price,
        published: course.published
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
            await AxiosInstance.put('/admin/courses/' + course._id, {
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
                let updatedCourse = {
                    _id: course._id,
                    title: formData.title,
                    description: formData.description,
                    imageLink: formData.imageLink,
                    price: Number(formData.price),
                    published: formData.published,
                }
                setCourse(updatedCourse)
            })
            toast.success('🔥Course updated successfully!', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
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
        <div style={{ display: "flex", justifyContent: "center", marginTop: 170, marginLeft: 30, height: 470 }}>
            <Card style={{ padding: "0px", width: 450 }}>
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
                <div style={{ padding: 20 }}>
                    <Typography style={{ marginBottom: 10 }}>Update Course Details</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            id="title"
                            value={formData.title}
                            onChange={handleChange("title")}
                            label="Title"
                            variant="outlined"
                            required fullWidth />
                        <br />
                        <br />
                        <TextField
                            id="description"
                            value={formData.description}
                            onChange={handleChange("description")}
                            label="Description"
                            variant="outlined"
                            required fullWidth />
                        <br />
                        <br />
                        <TextField
                            id="imageLink"
                            value={formData.imageLink}
                            onChange={handleChange("imageLink")}
                            type="url"
                            label="Image Link"
                            variant="outlined"
                            required fullWidth />
                        <br />
                        <br />
                        <TextField
                            id="price"
                            value={formData.price}
                            onChange={handleChange("price")}
                            type="number"
                            label="Price"
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
                </div>

            </Card >
        </div>

    )
}

export default CourseEdit;