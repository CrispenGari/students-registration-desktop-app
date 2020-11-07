import React, {useState} from 'react'
import {Button, Avatar} from '@material-ui/core'
import axios from '../../data/axios'
import endpoints from '../../data/endpoints'
const Search = () => {
    const [student_number, setStudentNumber]= useState("")
    const [error, setError] = useState("");
    const [studentInfo, setStudentInfo] = useState({})
    const handleFind =(e)=>{
        e.preventDefault();
        if(student_number){
            const fetchStudentInfo = async ()=>{
              const data = await axios.get(`${endpoints.SEARCH}${student_number}`)
            setStudentInfo(data.data[0])
            }
            fetchStudentInfo()
            setError("")
        }
    }
    return (
        <div className="deletecard">
            <h1>Searching Existing student</h1>
        <form className="deletecard__form">
            <div className="deletcard__left">
                <h1>enter the sudent number of the student</h1>
                <div className="deletecard__form-group">
                    <input type="text" placeholder="Student Number" value={student_number} onChange={e=>setStudentNumber(e.target.value)}/>
                </div>
                <small>{error}</small>
                <div className="deletecard__form-group">
                    <Button className="deletecard__button" onClick={handleFind}>Find</Button>
                </div>
            </div>
            <div className="deletecard__right">
            <Avatar className="deletecard__avatar" 
              src={!studentInfo?.student_profile? './images/image.png': studentInfo?.student_profile} 
              title={studentInfo?.student_number} alt={studentInfo?.student_name}/>
              <p><span>Student Number</span><span>{studentInfo?.student_number}</span></p>
              <p><span>Student Name</span><span>{studentInfo?.student_name}</span></p>
              <p><span>Student Surname</span><span>{studentInfo?.student_surname}</span></p>
              <p><span>Student Second Name</span><span>{studentInfo?.student_secondname}</span></p>
              <p><span>Student Year of Birth</span><span>{studentInfo?.student_year_of_birth}</span></p>
              <p><span>Student Gender</span><span>{studentInfo?.student_gender}</span></p>
              <p><span>Student Age</span><span>{isNaN(2020 - Number.parseInt(studentInfo?.student_year_of_birth))?"" : 2020 - Number.parseInt(studentInfo?.student_year_of_birth)}</span></p>
          </div>
          </form>
        </div>
    )
}

export default Search
