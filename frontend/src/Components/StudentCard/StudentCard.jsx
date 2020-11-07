import React from 'react'
import './StudentCard.css'
import {Avatar} from '@material-ui/core'
const StudentCard = ({student}) => {
    return (
        <div className="studentcard">
                <Avatar className="studentcard__avatar" src={!student?.student_profile? './images/image.png': student?.student_profile} title={student?.student_number} alt={student?.student_name}/>
            <small><span>Student Number</span><span>({student?.id}){student?.student_number}</span></small>
            <small><span>First Name</span><span>{student?.student_name}</span></small>
            <small><span>Surname</span><span>{student?.student_surname}</span></small>
            <small><span>Second Name</span><span>{student?.student_secondname}</span></small>
            <small><span>Gender</span><span>{student?.student_gender}</span></small>
           <small>Year of Birth<span></span><span>{student?.student_year_of_birth}</span></small>
           <small>Age<span></span><span>{2020 - Number.parseInt(student?.student_year_of_birth)}</span></small>
        </div>
    )
}

export default StudentCard
