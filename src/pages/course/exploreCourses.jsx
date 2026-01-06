import CourseCard from "../../component/CourseCard.jsx"
import "../course/exploreCourses.css"
import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "../../component/filter/Filter.jsx";

export default function ExploreCourses(){
    const [courses, setCourses] = useState([]);
    // const [maxPrice, setMaxPrice] = useState();
    // const [minPrice, setMinPrice] = useState();
    // const [title, setTitle] = useState("");
    const [filter, setFilter] = useState({
        minPrice : "",
        maxPrice :"",
        category :[]
    })

    useEffect( ()=>{
        //fetching data from backend
        const fetchCourse = async ()=>{
            const params = {};

            if (filter.minPrice) params.minPrice = filter.minPrice;
            if (filter.maxPrice) params.maxPrice = filter.maxPrice;
            if (filter.category.length>0) params.category = filter.category.join(",");
           let result = await axios.get("/api/course/getAllCourse", {params:params});
           
            setCourses(result.data);
        }
        fetchCourse();  
    },[filter])

    return (
        <>
        <section id="EplrCrsSection">
           
            <div id="explrCrsHeadings">
                <h1>Explore Courses</h1>
                <p>Discover top-quality courses to help you master in demand skill</p>
            </div>
            <div id="explorePgCont">
                <div id="filterList">
                    <h1>Filter</h1> 
                    <hr/>
                    <Filter  onFilterChange = {setFilter}/>
                </div>
                <div id="courseList">
                {
                    courses.map((course)=><CourseCard key={course._id} course= {course}/>)
                }
                </div>
            </div>
        </section>
        </>
    )
}