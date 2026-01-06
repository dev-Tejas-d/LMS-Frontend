import "./signUp.style.css"

export default function SignUp(){
    return (
          <>
        
        <form id="loginForm">
            <div id="form">
                <div id="formHeading">
                    <h3>Register yourself</h3>
                </div>
            <div id="inputs">
                <label for="Name">Name</label>
                <input id="Name" placeholder="Enter your fullname"></input>

                <label for="email">Email</label>
                <input id="email" placeholder="Enter your Email"></input>

                <label for="password">Password</label>
                <input id="password" placeholder=" Enter yourPassword"></input>

                <button  id="reg" className="btn btn-primary" >Register</button>
            </div>
           
             </div>
        </form>
         
        </>
    )
}