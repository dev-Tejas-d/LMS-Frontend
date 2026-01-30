import "./Featured.css"
import axios from "axios"
import CourseCard from "../component/CourseCard";
import { useEffect, useState } from "react"



export default function Featured(){
    const [courses, setCourses] = useState([]);

    const API = import.meta.env.VITE_API_URL;

    useEffect( ()=>{
        //fetching data from backend
        const fetchCourse = async ()=>{
           let result = await axios.get(`${API}/api/course/getAllCourse`);
            
            const data = Array.isArray(result.data) ? result.data : [];

            setCourses(data.slice(0, 3));
        }
        fetchCourse();  
    },[])


    return (
        <>
        <div id="featuredCont">
            <div id="FtText">
                <div>
                    <h3>Featured Courses</h3>
                    <p>Hand picked courses from our team</p>
                </div>
                <a href="/">View All Courses-- </a>
            </div>
            <div id="featuredWrapper">
            <div id="featuredDiv">
                {   
                 Array.isArray(courses) && courses.map((course)=><CourseCard key={course._id} course = {course}/>)
                }
            </div>

            <div className="swipeHint">
                <span>›</span>
            </div>
            </div>
        </div>
        </>
    )
}