import "./Featured.css"
import axios from "axios"
import CourseCard from "../component/CourseCard";
import { useEffect, useState } from "react"
import { MutatingDots } from "react-loader-spinner";
import { Link } from "react-router-dom";



export default function Featured(){
    const [courses, setCourses] = useState([]);
    let [Loading, setLoading]= useState(true);

    const API = import.meta.env.VITE_API_URL;

    useEffect( ()=>{
        //fetching data from backend
        const fetchCourse = async ()=>{
           let result = await axios.get(`${API}/api/course/getAllCourse`);
            
            const data = Array.isArray(result.data) ? result.data : [];
            setLoading(false)
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
                <Link to="/courses">View All Courses-- </Link>
            </div>
            {
            Loading?<MutatingDots
                visible={true}
                height="100"
                width="100"
                color="#1c3cd8"
                secondaryColor="#1c3cd8"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{
                    alignSelf:"center",
                    justifySelf:"center"
                }}
                wrapperClass=""
            />:
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
            
            }
        </div>
        </>
    )
}