import React from "react";
import axios from "axios";
import Messager from "../components/Messager";


export default async function login  (info) 
{
    await axios.post(`http://localhost:8080/api/v1/login`,info
    ,this.options)
    .then((res)=>{
        console.log(res);
    })
    .catch((e)=>{
        console.log(e.response.data);
    })
} 