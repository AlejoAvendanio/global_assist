import { useContext } from 'react'
import Context from '../dataContext'
import axios from 'axios'

export const UseFilter = () => {
  const {setGuest,guest,page,setPage,entries,setEntries,cuantityPage,setCuantityPage} = useContext(Context)

  
    const setPages = ()=>{
      const config = {
        method: "get",
        baseURL: `${import.meta.env.VITE_API_URL}/api/entries/page`,
    }
    axios(config).then(res=>{
        setCuantityPage(new Array(res.data).fill(0));
    })
    }

  const getEntries = ()=>{
    const config = {
      method: "get",
      baseURL: `${import.meta.env.VITE_API_URL}/api/entries/all/${page}`,
  }
    axios(config).then(res=>{
      setGuest(res.data)
      setEntries(res.data)
      setPages()
      return
  }).catch(e=>alert(e))
  }




  const addGuest = (data,fromDate,toDate)=>{
    const config = {
      method: "get",
      baseURL: `${import.meta.env.VITE_API_URL}/api/entries?DoorId=${data.doorId}&FromDate=${fromDate}&ToDate=${toDate}&GuestId=${data.guestId}`,
  }
  axios(config)
    .then(res=> {
      if(res.data){
      alert("entrie created")
      getEntries()
      setPages()
      }
      else{
        alert("an error occurred")
      }
      })
      .catch(err=>{
        alert(err)
      })
      return
  }


  const dateStart = () => {
    const orderdata = guest.reduce((acc, item) => {
      const dateItem = new Date(item.created).getTime();
      const index = acc.findIndex((obj) => new Date(obj.created).getTime() < dateItem);
      if (index === -1) {
        return [...acc, item];
      } else {
        return [...acc.slice(0, index), item, ...acc.slice(index)];
      }
    }, []);
    setGuest(orderdata)
    return
  }


  const dateEnd = () => {
    const orderdata = guest.reduce((acc, item) => {
      const dateItem = new Date(item.created).getTime();
      const index = acc.findIndex((obj) => new Date(obj.created).getTime() > dateItem);
      if (index === -1) {
        return [...acc, item];
      } else {
        return [...acc.slice(0, index), item, ...acc.slice(index)];
      }
    }, []);
    setGuest(orderdata)
    return
  }

  const siteFilter = (id)=>{
    if(id=="state"){
      setGuest(entries)
    }else{
      const orderData = entries.filter(data => data.doorid == id)
      setGuest(orderData)
    }
    return
  }

  const deleteGuest = (id)=>{
    const config={
      method: "DELETE",
      baseURL: `${import.meta.env.VITE_API_URL}/api/entries/delete/${id}`,
    }
    axios(config).then(res=>{
      alert("delete successfully")
      const filtered = guest.filter(e=>e.id!==id)
      getEntries()
      setGuest(filtered)
      setEntries(filtered)
      setPages()
      setPage(1)
  }).catch(e=>alert(e))
    return
  }


  return {setEntries,siteFilter,page,setPage,guest,setGuest,addGuest,deleteGuest,dateStart,dateEnd,cuantityPage,setCuantityPage}
}
