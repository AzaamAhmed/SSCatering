import React, { useState } from 'react'
import axios from 'axios'

function Create() {
  const [item,setItem]=useState()

  const handleAdd = () =>{

    axios.post('http://localhost:3001/add',{item :item})
    .then(result=> {

      location.reload()
    })
    .catch(err=>console.log(err))
  }
  return (
    <div>
        <input type='text' id='' onChange={(e)=>setItem(e.target.value)}/>
        <button id='save' onClick={handleAdd}>Add</button>
    </div>
  ) 
}

export default Create