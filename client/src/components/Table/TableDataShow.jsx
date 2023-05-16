import React, { useEffect, useState } from 'react'
import { UseFilter } from '../Hooks/UseFilters.jsx'
import axios from 'axios'
import "./style.css";
export const TableDataShow = () => {
    const {page,guest,deleteGuest,setPage,setGuest,setEntries} = UseFilter()
    const [showShowMore,setShowShowMore] = useState(false)
    const [cuantityPage,setCuantityPage] = useState(1)
    useEffect(()=>{
        const config = {
            method: "get",
            baseURL: `${import.meta.env.VITE_API_URL}/api/entries/all/${page}`,
        }
        axios(config).then(res=>{
            setGuest(res.data)
            setEntries(res.data)
            if(res.data.length<10){
                setShowShowMore(false)
            }else{
                setShowShowMore(true)
            }
            return
        }).catch(e=>alert(e))
    },[page])
    useEffect(()=>{
        const config = {
            method: "get",
            baseURL: `${import.meta.env.VITE_API_URL}/api/entries/page`,
        }
        axios(config).then(res=>{
            setCuantityPage(new Array(res.data).fill(0));
        })
    },[])
  return (
    
    <div>{guest.length ? 
        <div>
            <table style={{display:"flex",justifyContent:"space-between",flexDirection:"column", border:"solid 1px #646cff",padding:"10px",marginTop:10}}>
                <thead >
                    <tr>
                        <th style={{color:"#646cff"}}>name</th>
                        <th style={{color:"#646cff"}}>description</th>
                        <th style={{color:"#646cff"}}>from date</th>
                        <th style={{color:"#646cff"}}>to date</th>
                        <th style={{color:"#646cff"}}>created</th>
                        <th style={{color:"#646cff"}}>delete entry</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        guest?.map(e=>{
                            return<tr key={e.id}>
                                    <td style={{paddingRight:5,paddingLeft:5}}>{e?.firstname},{e?.lastname}</td>
                                    <td style={{paddingRight:5,paddingLeft:5}}>{e?.description}</td>
                                    <td>{e?.fromdate}</td>
                                    <td >{e?.todate}</td>
                                    <td style={{color:"#646cff"}}>{e?.created}</td>
                                    <td><button onClick={()=>deleteGuest(e.id)}>delete guest</button></td>
                                </tr>
                            }
                            )
                            
                        }
                </tbody>    
            </table>
        <div>
            {
                    cuantityPage?.map((p,i)=>
                        page===(i+1) ?
                        <strong onClick={()=>setPage(i+1)} style={{color:"#646cff", cursor:"pointer",padding:10}}>{i+1}</strong>
                        : 
                        <strong onClick={()=>setPage(i+1)} style={{color:"#fff", cursor:"pointer",padding:10}}>{i+1}</strong>
                    )
            }
        </div>
        </div>
        :<>
        <strong style={{color:"#646cff"}}>we don't have entries for show you</strong>
        </>}
    </div>
  )
}
