import React, { useEffect, useState } from 'react'
import { UseFilter } from '../Hooks/UseFilters.jsx'
import axios from 'axios'
export const TableDataShow = () => {
    const {page,guest,deleteGuest,setPage,setGuest,setEntries} = UseFilter()
    const [showShowMore,setShowShowMore] = useState(false)
    useEffect(()=>{
        const config = {
            method: "get",
            baseURL: `${import.meta.env.VITE_API_URL}/api/entries/all/${page}`,
        }
        axios(config).then(res=>{
            setGuest(guest.concat(res.data))
            setEntries(guest.concat(res.data))
            if(res.data.length<10){
                setShowShowMore(false)
            }else{
                setShowShowMore(true)
            }
            return
        }).catch(e=>alert(e))
    },[page])
    console.log(guest)
  return (
    
    <div>{guest.length ? 
        <div>
            <table style={{display:"flex",justifyContent:"space-between",flexDirection:"column", border:"solid 1px #646cff",padding:"10px",marginTop:10}}>
                <thead>
                    <tr >
                        <td style={{color:"#646cff",padding:10}}>name</td>
                        <td style={{color:"#646cff",padding:10}}>lastname</td>
                        <td style={{color:"#646cff",padding:10}}>description</td>
                        <td style={{color:"#646cff"}}>from date</td>
                        <td style={{color:"#646cff"}}>to date</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        guest.map(e=>{
                            
                            return<tr key={e.id}>
                                    <td style={{paddingRight:5,paddingLeft:5}}>{e?.firstname}</td>
                                    <td style={{paddingRight:5,paddingLeft:5}}>{e?.lastname}</td>
                                    <td style={{paddingRight:5,paddingLeft:5}}>{e?.description}</td>
                                    <td>{e?.fromdate}</td>
                                    <td >{e?.todate}</td>
                                    <td><button onClick={()=>deleteGuest(e.id)}>delete guest</button></td>
                                    <td><button>Show</button></td>
                                </tr>
                            }
                            )
                            
                        }
                </tbody>    
            </table>
        <div>
            {
                (guest.length >= 10 && showShowMore) 
                    ?
                    <strong onClick={()=>setPage(prev=>prev+1)} style={{color:"#646cff", cursor:"pointer"}}>show more</strong>
                    : 
                    <></>
            }
        </div>
        </div>
        :<>
        <strong style={{color:"#646cff"}}>we don't have entries for show you</strong>
        </>}
    </div>
  )
}
