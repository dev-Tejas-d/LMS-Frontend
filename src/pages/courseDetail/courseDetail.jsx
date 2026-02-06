import axios from "axios"
import { useEffect, useState } from "react"
import {  useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { MutatingDots } from "react-loader-spinner"
import "../courseDetail/courseDetail.css"

export default function CourseDetail() {

    const [course, setCourse] = useState(null)
    const { id: courseId } = useParams()
    let [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const API = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchCourse = async () => {
            const result = await axios.get(`${API}/api/course/${courseId}`)
            setCourse(result.data)
            setLoading(false);
        }
        fetchCourse()
    }, [courseId])



    const handleBuy = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login", {
                state: { from: `/courses/${course._id}` }
            });
            return;
        }

        navigate(`/course/Buy/${course._id}`);
    };

    return (
        <>
        <section className="course-detail">
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
                    justifySelf:"center"
                }}
                wrapperClass=""
            />:<div className="course-card">

                <div className="course-header">
                    <h1>{course?course.name:null}</h1>
                    <span className="course-category">
                        {course.category?.name}
                    </span>
                </div>
                <div className="course-thumbnail">
                    <img 
                        src={course.tumbnailURL} 
                        alt={course.name} 
                    />
                </div>

                <p className="course-description">
                    {course.description}
                </p>

                <div className="course-meta">
                    <div>
                        <span className="label">Instructor</span>
                        <span>{course.instructor?.name}</span>
                    </div>

                    <div>
                        <span className="label">Price</span>
                        <span className="price">₹{course.price}</span>
                    </div>
                </div>
                    <button className="buy-btn" onClick={handleBuy}>Buy Now</button>
            </div>
        }   
        </section>
            
            </>
    )
}
