import { useState } from "react";
import "../styles/Tool.css";

export default function GPACalculator() {
  const [courses, setCourses] = useState([{ grade: "A", credit: 3 }]);
  const [gpa, setGpa] = useState(null);

  const gradePoints = { A: 4, B: 3, C: 2, D: 1, F: 0 };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      totalPoints += gradePoints[course.grade] * course.credit;
      totalCredits += course.credit;
    });

    setGpa((totalPoints / totalCredits).toFixed(2));
  };

  const addCourse = () => {
    setCourses([...courses, { grade: "A", credit: 3 }]);
  };

  const removeCourse = (index) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  const updateCourse = (index, field, value) => {
    const newCourses = [...courses];
    newCourses[index][field] = field === "credit" ? parseFloat(value) : value;
    setCourses(newCourses);
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>🎓 GPA Calculator</h1>
        <p>Calculate your GPA</p>
      </div>

      {courses.map((course, i) => (
        <div key={i} className="form-grid" style={{marginBottom: "20px"}}>
          <div className="form-group">
            <label>Grade</label>
            <select
              value={course.grade}
              onChange={(e) => updateCourse(i, "grade", e.target.value)}
            >
              {Object.keys(gradePoints).map(grade => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Credit Hours</label>
            <input
              type="number"
              value={course.credit}
              onChange={(e) => updateCourse(i, "credit", e.target.value)}
              min="1"
            />
          </div>
          <div className="form-group" style={{alignSelf: "flex-end"}}>
            <button
              className="tool-button"
              onClick={() => removeCourse(i)}
              style={{marginBottom: "0", width: "100%"}}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div style={{display: "flex", gap: "10px", marginBottom: "30px"}}>
        <button className="tool-button" onClick={addCourse}>Add Course</button>
        <button className="tool-button" onClick={calculateGPA}>Calculate GPA</button>
      </div>

      {gpa && (
        <div className="output-box">
          <div className="output-label">Your GPA:</div>
          <div style={{fontSize: "48px", fontWeight: "bold", color: "gold", textAlign: "center"}}>
            {gpa}
          </div>
        </div>
      )}
    </div>
  );
}
