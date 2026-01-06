import axios from "axios"
import { useEffect, useState } from "react"
import {  useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "../courseDetail/courseDetail.css"

export default function CourseDetail() {

    const [course, setCourse] = useState({})
    const { id: courseId } = useParams()
    const navigate = useNavigate();


    useEffect(() => {
        const fetchCourse = async () => {
            const result = await axios.get(`/api/course/${courseId}`)
            setCourse(result.data)
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
        <section className="course-detail">
            <div className="course-card">

                <div className="course-header">
                    <h1>{course.name}</h1>
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
        </section>
    )
}
