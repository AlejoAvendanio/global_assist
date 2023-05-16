import React,{ useEffect, useState} from "react";
import DATA from "../data";
import axios from "axios";

const Context = React.createContext({})

export const DataContext= ({children})=>{
    const [guest,setGuest] = useState([])
    const [entries,setEntries] = useState([])
    const [page,setPage] = useState(1)
    const [cuantityPage,setCuantityPage] = useState(1)
    useEffect(()=>{
        const config = {
            method: "get",
            baseURL: `https://globalassist-production.up.railway.app/api/entries/all/${page}`,
        }
        axios(config).then(res=>{
            setGuest(res.data)
            setEntries(res.data)
            return
        }).catch(e=>alert(e))
    },[])
    useEffect(()=>{
        const config = {
            method: "get",
            baseURL: `${import.meta.env.VITE_API_URL}/api/entries/page`,
        }
        axios(config).then(res=>{
            setCuantityPage(new Array(res.data).fill(0));
        })
    },[])
    return <Context.Provider value={{guest,setGuest,page,setPage,entries,setEntries,cuantityPage,setCuantityPage}}>
    {children}
    </Context.Provider>
};

export default Context