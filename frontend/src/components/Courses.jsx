import { Card, Typography } from "@mui/material";
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
  return (
    <div style={{ display: "flex", flexWrap: 'wrap', justifyContent: "center", }}>
      {courses.map(course => {
        return <CourseCard course={course} />
      })}
    </div>
  );
}

export function CourseCard(props) {
  const navigate = useNavigate();
  const courseId = props.course._id;
  return (
    <div onClick={() => {
      navigate('/course/' + courseId)
    }}>
      <Card style={{ width: 300, margin: 10, minHeight: 200 }}>
        <img src={props.course.imageLink} style={{ width: 300 }} alt="" />
        <Typography textAlign={"center"} variant="h5">
          {props.course.title}
        </Typography>
        <Typography textAlign={"center"} variant="subtitle1">
          {props.course.description}
        </Typography>
        <Typography textAlign={"center"}>
          {props.course.price}
        </Typography>
        <Typography textAlign={"center"}>
          {props.course.published ? "Ready for sale" : "Incompleted course"}
        </Typography>
      </Card>
    </div>
  )
}


export default Courses;