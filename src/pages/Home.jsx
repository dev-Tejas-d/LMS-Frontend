import BrowseCategory from "../component/BrowseCategory"
import Featured from "./Featured.jsx"
import Hero from "../component/Hero"

export default function Home(){
    return (
        <>
            <Hero/>
            <BrowseCategory/>
            <Featured/>
        </>
    )
}