import { Link, Outlet } from "react-router-dom";
import "./Navbar.css"
import { Authcontext } from "../context/AuthContext";
import { useContext } from "react";


function Navbar(){
    let states = useContext(Authcontext);

    return (
        <>
        <nav>
            <div id="main">
                <div>
                    <h1>LMS-project</h1>
                </div>
                <div id="navBtnOpt">
                    <Link to="courses">
                    <button className="btn btn-success">Courses</button>
                    </Link>
                    {states.token?<Link><button className="btn btn-primary">Mycourse</button></Link>:<Link to="Login"><button className="btn btn-primary">Login</button>
                    </Link>}
                </div>
            </div>
           </nav>
        </>
    )
}

export default Navbar;