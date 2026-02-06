import CourseCard from "../../component/CourseCard.jsx"
import "../course/exploreCourses.css"
import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "../../component/filter/Filter.jsx";
import { MutatingDots } from "react-loader-spinner";

export default function ExploreCourses(){
    const [courses, setCourses] = useState([]);
    const [filter, setFilter] = useState({
        minPrice : "",
        maxPrice :"",
        category :[],
        title:""
    })

    const [showFilter, setShowFilter] = useState(false);

    let [loading, setLoading] = useState(true);


     const API = import.meta.env.VITE_API_URL;

    useEffect( ()=>{
        //fetching data from backend
        const fetchCourse = async ()=>{
            const params = {};

            if (filter.minPrice) params.minPrice = filter.minPrice;
            if (filter.maxPrice) params.maxPrice = filter.maxPrice;
            if (filter.category.length>0) params.category = filter.category.join(",");
           let result = await axios.get(`${API}/api/course/getAllCourse`, {params:params});
             setLoading(false);
             setCourses(Array.isArray(result.data) ? result.data : []);
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

            {/* Mobile Filter Toggle */}
            <button
                id="mobileFilterBtn"
                onClick={() => setShowFilter(prev => !prev)}
            >
                {showFilter ? "Hide Filters" : "Show Filters"}
            </button>

            <div id="explorePgCont">

                {/* Filter */}
                {(showFilter || window.innerWidth > 768) && (
                <div id="filterList">
                    <h1>Filter</h1>
                    <hr />
                    <Filter onFilterChange={setFilter} />
                </div>
                )}

                {/* Courses */}
              { 
              loading?<MutatingDots
                visible={true}
                height="100"
                width="100"
                color="#1c3cd8"
                secondaryColor="#1c3cd8"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{
                    alignSelf:"center",
                    justifySelf:"center",
                }}
                wrapperClass=""
            />:
                <div id="courseList">
                {Array.isArray(courses) &&
                    courses.map(course => (
                    <CourseCard key={course._id} course={course} />
                    ))}
                </div>
}
            </div>
            </section>
        </>
        );

}