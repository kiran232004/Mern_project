import {useEffect, useState} from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState("");
  const [newFoodName, setNewFoodName] = useState("");
  const [foodList, setFoodList] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:3001/read').then(response=>setFoodList(response.data))
  },[foodList]);

  const addToList=()=>{
    axios.post('http://localhost:3001/insert',{
      foodName:foodName,
      days: days
    })
  }

  const updateFood = (id)=>{
    axios.put('http://localhost:3001/update',{
      id: id,
      foodName: newFoodName,
    })
  }

  const deleteFood = (id)=>{
    axios.delete('https://localhost:3001/delete/${id}',{
    id : id})
  }


  return (
    <>
    <h1>CRUD APPLICATION</h1>
    <label >Food Name</label>
    <input type="text" onChange={(e)=>setFoodName(e.target.value)}/>
    <label >Days</label>
    <input type="number" onChange={(e)=>setDays(e.target.value)} />
    <button onClick={addToList}>Add to List</button>
    <h1>foodList</h1>
    {
      foodList.map((val,key)=>{
        return(
          <div className="food" key={key}>
            <h1>{val.foodName}</h1>
            <h1>{val.daysSinceIAte}</h1>
            <input type="text" placeholder='new food name...' onChange={(e)=>setNewFoodName(e.target.value)} />
            <button onClick={()=>updateFood(val._id)}>update</button>
            <button onClick={()=>deleteFood(val._id)}>delete</button>
          </div>
        )

      })
    }
    </>
  )
}

export default App