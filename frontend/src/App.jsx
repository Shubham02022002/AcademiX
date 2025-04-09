import AddCourse from "./components/AddCourse";
import Appbar from "./components/Appbar";
import CourseEdit from "./components/CourseEdit";
import Courses from "./components/Courses";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
function App() {
  return (
    <RecoilRoot>
      <Router>
        <div>
          <Appbar />
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/addcourse" element={<AddCourse />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<CourseEdit />} />
          </Routes>
        </div>
      </Router>
    </RecoilRoot>
  );
}
export default App;