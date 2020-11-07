import React, {useState} from 'react'
import {Button, Avatar} from '@material-ui/core'
import axios from '../../data/axios'
import endpoints from '../../data/endpoints'
import './Delete.css'
import {selectTab} from '../../actions'
import {useDispatch} from 'react-redux'
import constants from '../../utils/constants'
const remote = window.require("electron").remote
const Delete = () => {
    const [student_number, setStudentNumber]= useState("")
    const [error, setError] = useState("")
    const [studentInfo, setStudentInfo] = useState({})
    const dispatch = useDispatch()
    const handleReview =()=>{
        if(student_number){
            const fetchStudentInfo = async ()=>{
              const data = await axios.get(`${endpoints.SEARCH}${student_number}`)
            setStudentInfo(data.data[0])
            }
            fetchStudentInfo()
            setError("")
        }
    }
    const deleteStudent =(e)=>{
        e.preventDefault();
        if(student_number){
            remote.dialog.showMessageBox(remote.getCurrentWindow(),{
                buttons: ["Yes", "No", "Cancel"],
                cancelId: 2,
                defaultId: 0,
                message:`Are you sure you want delete the student with student number : ${student_number}`,
                title: "Student Registration App",
                checkboxChecked: false,
                checkboxLabel: "Do not ask me again."
              }).then(response=>{
                  if(response.response === 0){
                    axios.delete(`${endpoints.DELETE}${student_number}`)
                    // redirect
                    remote.dialog.showMessageBox(remote.getCurrentWindow(),{
                        message: "The student has been deleted successfuly!!",
                        title: "Student Registration App",
                    })
                    setStudentNumber("")
                    dispatch(selectTab(constants.SELECT_ALL_STUDENTS))
                  }else{
                    remote.app.focus()
                  }
              })
            
        }
    }
    return (
        <div className="deletecard">
            <h1>Deleting Existing student</h1>
        <form className="deletecard__form">
            <div className="deletcard__left">
                <h1>enter the sudent number of the student</h1>
                <div className="deletecard__form-group">
                    <input type="text" placeholder="Student Number" value ={student_number} onChange={e=>setStudentNumber(e.target.value)}/>
                </div>
                <small>{error}</small>
                <div className="deletecard__form-group">
                    <Button className="deletecard__button" onClick={handleReview}>Review</Button>
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
              <Button className="deletecard__button" type="submit" onClick={deleteStudent}>Delete</Button>
          </div>
          </form>
        </div>
    )
}

export default Delete
