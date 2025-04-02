import AddCourse from "./components/AddCourse";
import Appbar from "./components/Appbar";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <div>
        <Appbar />
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/addcourse" element={<AddCourse />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;