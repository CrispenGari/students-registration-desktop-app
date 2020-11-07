import React from 'react'
import './Update.css'
import axios from '../../data/axios'
import endpoints from '../../data/endpoints'
import {Button, Avatar} from '@material-ui/core'
import { useState } from 'react'
const remote = window.require('electron').remote

const Update = () => {
    const [error, setError] = useState("")
    const [studentInfo, setStudentInfo] = useState({})
    const [student_name, setStudentName]= useState("")
    const [student_number_search, setStudentNumberSearch]= useState("")
    const [student_surname, setStudentSurname]= useState("")
    const [student_number, setStudentNumber]= useState("")
    const [student_YOB, setStudentYOB]= useState(1999)
    const [student_gender, setStudentGender]= useState("male")
    const [student_secondname, setStudentSecondName]= useState("")
    const [student_profile, setStudentProfile]= useState(null)
    let years=[];
    for(let i =0; i<31;i++){
        const _ = 1980+i;
        years.push(_)
    }
    const updateStudent = (e)=>{
        e.preventDefault()
        remote.dialog.showMessageBox(remote.getCurrentWindow(),{
          buttons: ["Yes", "No", "Cancel"],
          cancelId: 2,
          defaultId: 0,
          message: "Are you sure you want to update the Student with sudent number: " + student_number_search,
          title: "Student Registration App",
          checkboxChecked: false,
          checkboxLabel: "Do not ask me again."
        }).then(response=>{
            if(response.response === 0){
               axios.put(`${endpoints.UPDATE}${student_number_search}`, {
                "student_name": student_name, 
                "student_secondname": student_secondname,
                "student_surname": student_surname,
                "student_year_of_birth": student_YOB,
                "student_profile": student_profile,
                "student_number": Number.parseInt(student_number),
                "student_gender": student_gender
              })
              remote.dialog.showMessageBox(remote.getCurrentWindow(),{
                message: "The student has been updated successfuly!!",
                title: "Student Registration App",
              })
              restoreHandler()
            }else{
              remote.app.focus()
            }
        })
       
    }
    const restoreHandler = ()=>{
        setStudentYOB(1999)
        setStudentProfile(null)
        setStudentName("")
        setStudentSurname("")
        setStudentGender("male")
        setStudentSecondName("")
        setStudentNumber("")
        setStudentNumberSearch("")
        setError("")
    }
    const findStudent =()=>{
       if(student_number_search){
        const fetchStudentInfo = async ()=>{
          const data = await axios.get(`${endpoints.SEARCH}${student_number_search}`)
          setStudentInfo(data.data[0])
        }
        fetchStudentInfo()
        setStudentYOB(studentInfo?.student_year_of_birth)
        setStudentName(studentInfo?.student_name)
        setStudentSurname(studentInfo?.student_surname)
        setStudentGender(studentInfo?.student_gender)
        setStudentSecondName(studentInfo?.student_secondname)
        setStudentNumber(studentInfo?.student_number)
      }
    }
    return (
        <div className="updatecard">
        <h1>Updating A Student</h1>
      <form className="updatecard__form">
        <div className="updatecard__left">
        <div className="updatecard__studentquery">
            <h1>ENTER THE student number</h1>
            <div className="updatecard__form-group">
              <input type="text" placeholder="Student Number" value={student_number_search} onChange={e=>setStudentNumberSearch(e.target.value)}/>
              <Button className="updatecard__button" onClick={findStudent}>Find</Button>
            </div>
            <small>{error}</small>
        </div>
            <div className="updatecard__form-group">
              <input type="text" placeholder="Student Name" value={student_name} onChange={e=>setStudentName(e.target.value)}/>
              <input type="text" placeholder="Student Surname" value={student_surname} onChange={e=>setStudentSurname(e.target.value)}/>
            </div>
            <div className="updatecard__form-group">
              <input type="text" placeholder="Student Second Name" value={student_secondname} onChange={e=>setStudentSecondName(e.target.value)}/>
              <input type="text" placeholder="Student Number" value={student_number} onChange={e=>setStudentNumber(e.target.value)}/>
            </div>
            <div className="updatecard__form-group">
              <select name="" id="" value={student_gender} onChange={e=>setStudentGender(e.target.value)}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="trans-gender">Trans-Gender</option>
              </select>
              <select name="" id="" value={student_YOB} onChange={e=>setStudentYOB(e.target.value)}>
                {
                  years.map((year, i)=>
                    <option key={i} value={year}>{year}</option>
                  )
                }
              </select>
            </div>
            <div className="updatecard__form-group">
              <Button className="updatecard__button" type="submit" onClick={updateStudent}>Update</Button>
              <Button className="updatecard__button" onClick={restoreHandler}>Restore</Button>
            </div>
        </div> 
        <div className="updatecard__right">
              <input type="file" name="" accept="image/*" id="add__avatarfile"/>
            <label htmlFor="add__avatarfile" className="updatecard__profile">
            <Avatar className="updatecard__avatar" 
              src={!studentInfo?.student_profile? './images/image.png': studentInfo?.student_profile} 
              title={studentInfo?.student_number} alt={studentInfo?.student_name}/>
            
               <Button className="updatecard__button">Profile</Button>
            </label>
        </div>
        </form>
      </div>
    )
}

export default Update
