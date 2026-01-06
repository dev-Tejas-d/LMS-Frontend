import "./CourseCard.css"
import { Link } from "react-router-dom"



export default function CourseCard({course}){


    // useEffect( ()=>{
    //     //fetching data from backend
    //     const fetchCourse = async ()=>{
    //        let result = await axios.get("/api/course/getAllCourse");
    //         setCourses(result.data);
    //     }
    //     fetchCourse();  
    // },[])
   
    return (
        <>
            <div id="ftCourseCont">
                        <div>
                   <figure>
                         
                            <img 
                            className="course-thumb"
                                src={course.tumbnailURL} 
                                alt={course.name} 
                            />
                        

                        <figcaption>
                            <h4>{course.name}</h4>
                            <p>{course.description.slice(0, 30)}...</p>
                            <p className="price">₹{course.price}</p>
                            <Link to={`/courses/${course._id}`}>
                                <button>View Detail</button>
                            </Link>
                        </figcaption>
                    </figure>
                </div>
            </div>
        </>
    )
}