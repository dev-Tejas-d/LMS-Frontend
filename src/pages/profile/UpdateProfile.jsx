import { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { Authcontext } from "../../context/AuthContext";
import axios from "axios";

export default function UpdateProfile(){
    let [profile, setProfile] = useState({});
    let [Name, setName] = useState("");
    let [Age, setAge] = useState();
    let [phone, setPhone] = useState();
    let [Gender, setGender] = useState("");
    let [profilePic, setProfilePic] = useState("")
    let {token, setProfileImg} = useContext(Authcontext);

    let inputName = useRef();
    let inputAge = useRef();
    let inputPhone = useRef();
    let inputGender = useRef();
    let inputProfile = useRef();

    const API = import.meta.env.VITE_API_URL;

    useEffect(()=>{
        let fetchUser = async()=>{
            let user = await axios.get(`${API}/api/user/getUser`, {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            let userDetail = user.data.user;
            setProfile(userDetail);
            

            if(userDetail.name){
                setName(userDetail.name);
            }

            if(userDetail.age){
                setAge(userDetail.age);
            }

            if(userDetail.phoneNumber){
                setPhone(userDetail.phoneNumber);
            }

            if(userDetail.gender){
                setGender(userDetail.gender)
            }

            if(userDetail.profilePicture){
                setProfilePic(userDetail.profilePicture)
            }
        }

        fetchUser();
    }, [])



    let handleSubmit = async (e)=>{
        e.preventDefault();

        let name;
        if(inputName.current.value != ""){
            name = inputName.current.value
        }else{
            name = Name;
        }


        let age;
        if(inputAge.current.value != 0 || inputAge.current.value !=""){
            age = Number(inputAge.current.value);
            console.log(age)
        }else{
            age = Age;
        }

        
        let profilePicture
        if(inputProfile.current.value != ""){
            profilePicture = inputProfile.current.value
            setProfileImg(inputProfile.current.value);
        }else{
            profilePicture = profilePic;
        }
        
        let phoneNumber; 
        if(inputPhone.current.value != ""){
            phoneNumber = Number(inputPhone.current.value);
        }else{
            phoneNumber = phone;
        } 
        
        let gender
        if(inputGender.current.value != ""){
            gender = inputGender.current.value
        }else{
            gender = Gender;
        }
         

        let update = {name, age, phoneNumber, gender, profilePicture};


        let result = await axios.post(`${API}/api/user/updateProfile`,
        {
            ...update
        }, 
        {
              headers:{
                    Authorization:`Bearer ${token}`
                }
        })
    }


    return (
        <>  
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <label htmlFor="profilePic">New Profile picture</label>
                <input id="profilePic" ref={inputProfile}></input>
                <br/>

                <label htmlFor="name">Name</label>
                <input id="name" ref={inputName}></input>
                <br/>

                <label htmlFor="age">Age</label>
                <input id="age" ref={inputAge}></input>
                <br/>

               <label htmlFor="phone">phone</label>
               <input id="phone" ref={inputPhone}></input>
                <br/>

                <label htmlFor="gender">Gender</label>
                <input id="gender" ref={inputGender}></input>
                <br/>

                <button type="submit">Submit</button>
            </form>
        </>
    )
}