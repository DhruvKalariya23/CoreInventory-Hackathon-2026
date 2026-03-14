import { useState,useEffect } from "react"
import axios from "axios"

function App(){

  const [tasks,setTasks] = useState([])
  const [title,setTitle] = useState("")

  const loadTasks = ()=>{
    axios.get("http://localhost:5000/tasks")
    .then(res=>setTasks(res.data))
  }

  useEffect(()=>{
    loadTasks()
  },[])

  const addTask = ()=>{
    console.log('--------------------')
    if(!title) return

    axios.post("http://localhost:5000/tasks",{title})
    .then(()=>{
      setTitle("")
      loadTasks()
    })
  }

  const deleteTask = (id)=>{
    axios.delete(`http://localhost:5000/tasks/${id}`)
    .then(loadTasks)
  }

  return(

    <div style={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      height:"100vh",
      background:"#f4f6f8"
    }}>

      <div style={{
        width:"400px",
        background:"white",
        padding:"30px",
        borderRadius:"10px",
        boxShadow:"0 5px 15px rgba(0,0,0,0.1)"
      }}>

        <h2 style={{textAlign:"center"}}>Task Manager</h2>

        <div style={{display:"flex",gap:"10px"}}>

          <input
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            placeholder="Enter Task"
            style={{
              flex:1,
              padding:"8px"
            }}
          />

          <button
            onClick={addTask}
            style={{
              background:"#4CAF50",
              color:"white",
              border:"none",
              padding:"8px 15px",
              cursor:"pointer"
            }}
          >
            Add
          </button>

        </div>

        <ul style={{marginTop:"20px"}}>

          {tasks.map(task=>(
            <li
              key={task.id}
              style={{
                display:"flex",
                justifyContent:"space-between",
                marginBottom:"10px"
              }}
            >

              {task.title}

              <button
                onClick={()=>deleteTask(task.id)}
                style={{
                  background:"red",
                  color:"white",
                  border:"none",
                  padding:"5px 10px",
                  cursor:"pointer"
                }}
              >
                Delete
              </button>

            </li>
          ))}

        </ul>

      </div>

    </div>

  )
}

export default App