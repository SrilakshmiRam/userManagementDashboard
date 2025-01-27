import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { useState,useEffect } from 'react'

import Home from './components/Home'
import AddPage from './components/AddPage'
import EditPage from './components/EditPage'
import DeletePage from './components/DeletePage'

import Context from './context/Context'



const App=()=>{
  const [usersData,setUsersData]=useState([])  // State to store fetched data

  useEffect(()=>{
    const getUserData=async()=>{
      try{
        const url='https://jsonplaceholder.typicode.com/users'
        const options={
            method:'GET'
        }
        const response=await fetch(url,options)
        if (response.ok) {
          const data = await response.json(); // Parse the JSON if response is successful
          const updatedData=data.map((each)=>({
            id:each.id,
            firstName:each.name.split(" ")[0],
            lastName:each.name.split(" ")[1],
            email:each.email,
            department:'Human Resources (HR)'
          }))
          console.log(updatedData)
          setUsersData(updatedData); // Update state with fetched data
        } else {
          throw new Error('Failed to fetch data'); // Throw error if response is not ok
        }
      }catch(e){
        console.log('Error',e)
        throw new Error('internal server error')  // throw new Error
      }

    }
    getUserData()
  },[]) // Empty dependency array to run only once when the component mounts


  const updateUsersData=(formData)=>{
    setUsersData((prevData)=>[...prevData,formData])
  }

  return(
  <Context.Provider value={{usersData,updateUsersData}}>
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Home/>} />
      <Route exact path='/add/' element={<AddPage/>} />
      <Route exact path='/edit/:id' element={<EditPage/>} />
      <Route exact path='delete/:id' element={<DeletePage/>} />
    </Routes>
    </BrowserRouter>
  </Context.Provider>
  )
}

export default App;
