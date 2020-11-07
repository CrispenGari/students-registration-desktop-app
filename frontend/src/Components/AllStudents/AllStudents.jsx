import React, { useEffect, useState } from 'react'
import {StudentCard} from '../../Components'
import './AllStudents.css'
import axios from '../../data/axios'
import endpoints from '../../data/endpoints'
import Pusher from 'pusher-js'
Pusher.logToConsole = true;
const AllStudents = () => {
    const [students, setStudents] = useState([]);
    
    // setInterval()
    useEffect(()=>{
           const fetchStudents = async ()=>{
            const data =  await axios.get(endpoints.SEARCH_ALL)
            setStudents(data.data)
          } 
         fetchStudents()
    }, [])

    useEffect(()=>{
     const pusher = new Pusher('e6239a0ceef73e73f5af', {
        cluster: 'ap2'
      });
      const channel = pusher.subscribe('insert-channel');
      channel.bind('insert', (student)=> {
        // console.log(JSON.stringify(student));
        setStudents([...students, student])
        
      });
    
      return ()=>{
        channel.unbind_all();
        channel.unsubscribe();
      }
    },[students])
   
    console.log(students);
    return (
        <div className="allstudents">
            <h1>All Students</h1>
            <div className="allstudents__list">
                {
                    students.map((student, index)=>
                         <StudentCard student={student} key={index} index={index}/>
                    )
                }
            </div>
        </div>
    )
}

export default AllStudents
