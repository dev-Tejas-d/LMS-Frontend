import { Link } from "react-router-dom";
import "./hero.css"

function Hero(){
    return(
        <>
        <div id="HeroMain">
            <div id="heroHeading"> 
                <h1>Learn Anytime Anywhere</h1>
                <h6>Empower your future with world-class courses and hands-on learning</h6>
                <Link to="/Login">
                <button  className="btn btn-warning" id="getStarted">Get Started</button>
                </Link>
            </div>
            <div>
                <img id="heroImg" src="https://thumbor.forbes.com/thumbor/fit-in/1290x/https://www.forbes.com/advisor/wp-content/uploads/2023/10/Website-Development.jpg"></img>
            </div>
        </div>
       
        </>
    )
}

export default Hero;