import React, {useState} from 'react'
import './Add.css'
import {Avatar, Button} from '@material-ui/core'
import axios from '../../data/axios'
import endpoints from '../../data/endpoints'
import {selectTab} from '../../actions'
import {useDispatch} from 'react-redux'
import constants from '../../utils/constants'
const {remote} = window.require("electron")
const Add = () => {
    const [student_name, setStudentName]= useState("")
    const [student_surname, setStudentSurname]= useState("")
    const [student_number, setStudentNumber]= useState("")
    const [student_YOB, setStudentYOB]= useState(1999)
    const [student_gender, setStudentGender]= useState("male")
    const [student_secondname, setStudentSecondName]= useState("")
    const [student_profile, setStudentProfile]= useState(null)
    const dispatch = useDispatch()
   let years=[];
   for(let i =0; i<31;i++){
      const _ = 1980+i;
      years.push(_)
   }
   const restoreHandler =()=>{
     setStudentGender("male")
     setStudentSecondName("")
     setStudentName("")
     setStudentProfile(null)
     setStudentYOB(1999)
     setStudentSurname("")
     setStudentNumber("")
    
  }
   const addStudent =async (e)=>{
      e.preventDefault();
      if(student_gender && student_name && student_surname && student_number){
      await axios.post(endpoints.INSERT, {
        "student_name": student_name, 
        "student_secondname": student_secondname,
        "student_surname": student_surname,
        "student_year_of_birth": student_YOB,
        "student_profile": student_profile,
        "student_number": Number.parseInt(student_number),
        "student_gender": student_gender
      })
      }
      remote.dialog.showMessageBox(remote.getCurrentWindow(),{
        message: "The student has been added successfuly!!",
        title: "Student Registration App",
      })
    restoreHandler()
    // redirect to all students tab
    setStudentNumber("")
    dispatch(selectTab(constants.SELECT_ALL_STUDENTS))
   }
    return (
        <div className="addcard">
          <h1>Adding students</h1> 
        <form className="addcard__form">
          <div className="addcard__left">
              <div className="addcard__form-group">
                <input type="text" placeholder="Student Name" value ={student_name} onChange={e=>setStudentName(e.target.value)}/>
                <input type="text" placeholder="Student Surname"  value ={student_surname} onChange={e=>setStudentSurname(e.target.value)}/>
              </div>
              <div className="addcard__form-group">
                <input type="text" placeholder="Student Second Name"  value ={student_secondname} onChange={e=>setStudentSecondName(e.target.value)}/>
                <input type="text" placeholder="Student Number"  value ={student_number} onChange={e=>setStudentNumber(e.target.value)}/>
              </div>
              <div className="addcard__form-group">
                <select name="" id="" value={student_gender} onChange={e=>setStudentGender(e.target.value)}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="trans-gender">Trans-Gender</option>
                </select>
                <select name="" id="" value ={student_YOB} onChange={e=>setStudentYOB(e.target.value)}>
                  {
                    years.map((year, i)=>
                      <option key={i} value={year}>{year}</option>
                    )
                  }
                </select>
              </div>
              <div className="addcard__form-group">
                <Button type="submit" className="addcard__button" onClick={addStudent}>Add</Button>
                <Button className="addcard__button" onClick={restoreHandler}>Restore</Button>
              </div>
          </div> 
          <div className="addcard__right">
                <input type="file" accept="image/*" id="add__avatarfile"/>
              <label htmlFor="add__avatarfile" className="addcard__profile">
                 <Avatar className="addcard__avatar"/>
                 <Button className="addcard__button">Profile</Button>
              </label>
          </div>
          </form>
        </div>
    )
}

export default Add
