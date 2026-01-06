import axios from "axios";
import React, { useEffect, useState } from "react";
import "../filter/Filter.css"

export default function Filter({onFilterChange}){
    const [categorys, setCategory] = useState([]);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(()=>{
        let fetchCategory = async ()=>{
            let category = await axios.get("/api/category/getCategory")
            setCategory(category.data)
        }

        fetchCategory();
    }, []);

    let HandleSubmit = (e)=>{
        e.preventDefault();

        onFilterChange({
            minPrice:minPrice,
            maxPrice:maxPrice,
            category:selectedCategories
        })
    }
    const handleCheckboxChange = (id) => {
        setSelectedCategories((prev) => prev.includes(id)?prev.filter((catId)=>catId!=id):[...prev, id]);
        };


    return(
        <>
            <form id="FilterForm" onSubmit={HandleSubmit}>
            <div id="priceFilter">
                <label htmlFor="minPrice">Minimun price</label>
                <input id="minPrice" type="text" value={minPrice} onChange={e => setMinPrice(e.target.value)}></input>

                <label htmlFor="maxPrice">maximum price</label>
                <input id="maxPrice" type="text" value={maxPrice} onChange={e => setMaxPrice(e.target.value)}></input>
            </div>
            <div id="categoryDiv">
                {categorys.map((category)=>{
                    return(
                        <div id="categoryItem" key={category._id}>
                        <input id={category._id}  type="checkbox" value={selectedCategories} onChange={()=>handleCheckboxChange(category._id)}></input>
                        <label htmlFor={category._id}>{category.name}</label> 
                        </div>
                    )
                })}        
            </div>
            <button id="FilterSubmitBtn" type="submit">Search</button>
            </form>
        </>
    )
}