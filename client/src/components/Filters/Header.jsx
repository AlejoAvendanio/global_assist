import React, { useEffect, useState } from 'react'
import { UseFilter } from '../Hooks/UseFilters'
import ModalPortal from '../modal'
import axios from 'axios'

export const Header = () => {
    const {addGuest,dateStart,dateEnd,siteFilter} = UseFilter()
    const [showModal,setShowModal] = useState(false)
    const [data,setData] = useState({})
    const [fromDate,setFromDate] = useState();
    const [toDate,setToDate] = useState();
    const today = new Date();
    const todayISOString = today.toISOString().slice(0, 10);
    const [door,setDoor] = useState([])
    const [guest,setGuest] = useState([])

    useEffect(()=>{
        const config = {
            method: "get",
            baseURL: `http://localhost:3000/api/door`,
        }
        axios(config).then(res=>{
            setDoor(res.data)
            return
        }).catch(e=>alert(e))
    },[])
    
    const handleChance = (e)=>{
        setData({
          ...data,
          [e.target.name]:e.target.value
        })
        console.log(data)
    }

    const addVerify = ()=>{
      if(fromDate && toDate){
        if (fromDate.getTime() < toDate.getTime()) {
        addGuest(data,fromDate,toDate)
        setShowModal(false)
      }else{
        alert("The departure date must be close to the arrival date!")
      }
      }else{
        alert("add from date and to date")
      }
    }

    const handleOptions = (event)=>{
      siteFilter(event.target.value)
    }

    useEffect(()=>{
      const config = {
          method: "get",
          baseURL: `http://localhost:3000/api/guest`,
      }
      axios(config).then(res=>{
        setGuest(res.data)
          return
      }).catch(e=>alert(e))
  },[])


    return (
    <div style={{display:"flex" ,justifyContent:"space-between", border:"solid 1px #646cff",padding:"10px"}}>
        <button onClick={()=>dateStart()}>Start</button>
        <button onClick={()=>dateEnd()}>End</button>
        <select name="" id="" onChange={(e)=>handleOptions(e)}>
          <option defaultValue>state</option>
          {
            door ? door.map(d=><option key={d.id} value={d.id} >{d.description}</option>) : <></>
          }
        </select>
        <button onClick={()=>setShowModal(true)}>Add guest</button>

        {
          showModal ? 


          <ModalPortal onClose={setShowModal}>

            <select type="text" name="guestId"  onChange={(e)=>handleChance(e)} >
              <option selected>Guests</option>
              {
                guest.length ?
                  guest.map(g=><option value={g.id} key={g.id}>{g.lastname},{g.firstname}</option>)
                  :<></>
              }
            </select>


            <select name="doorId" id="" onChange={(e)=>handleChance(e)}>
              <option defaultValue>Doors</option>
              {
                door ? door.map(d=><option key={d.id} value={d.id} >{d.description}</option>) : <></>
              }
            </select>


            <strong style={{color:"#000"}}>From date</strong><input type="date" min={todayISOString} name="datefnit" onChange={(e)=>{
              setFromDate(new Date(e.target.value))
              handleChance(e)
              }}/>


              <strong style={{color:"#000"}}>To date</strong><input type="date" placeholder='fecha de salida' min={todayISOString} name="datefinish" onChange={(e)=>{
              setToDate(new Date(e.target.value))
              handleChance(e)
              }}/>


            <button onClick={()=>addVerify()}>Add!</button>


          </ModalPortal> 
          
          : <></>
        }
    </div>
  )
}
