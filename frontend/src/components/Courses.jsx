import { Button, Card, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/admin/courses/', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }).then((resp) => {
      setCourses(resp.data.courses);
    }).catch((err) => {
      console.error("Error in getting courses", err);
    })
  }, [])
  if (!courses.length) {
    return <></>
  }
  return (
    <div style={{ display: "flex", flexWrap: 'wrap', justifyContent: "center", }}>
      {courses.map(course => {
        return <CourseCard course={course} />
      })}
    </div>
  );
}

export function CourseCard({ course }) {
  const navigate = useNavigate();
  return (
    <div>
      <Card style={{ width: 300, margin: 10, minHeight: 150, maxHeight: 340 }}>
        <img src={course.imageLink} style={{ width: 300, objectFit: "cover" }} alt="" />
        <Typography textAlign={"center"} variant="h5" textTransform={"capitalize"}>
          {course.title}
        </Typography>
        <Typography textAlign={"center"} variant="subtitle1">
          {course.description}
        </Typography>
        <Typography textAlign={"center"}>
          &#8377; {course.price}
        </Typography>
        <Typography textAlign={"center"}>
          {course.published ? "Ready for sale" : "Incompleted course"}
        </Typography>
        <Button style={{ float: "right", margin: "2px" }} variant="contained" onClick={() => {
          navigate('/courses/' + course._id);
        }}>Edit</Button>
      </Card>
    </div>
  )
}


export default Courses;