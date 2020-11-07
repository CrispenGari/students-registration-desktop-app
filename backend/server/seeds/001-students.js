
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      return knex('students').insert([
        {student_name: 'Jonh', 
        student_secondname: "Sarah",
        student_surname: "Doe",
        student_year_of_birth: 1999,
        student_profile: null,
        student_number:100,
        student_gender: "male"
      },
      {student_name: 'Jonh', 
      student_secondname: "Sarah",
      student_surname: "Doe",
      student_year_of_birth: 1999,
      student_profile: null,
      student_number:101,
      student_gender: "male"
    }
    , {student_name: 'Jonh', 
    student_secondname: "Sarah",
    student_surname: "Doe",
    student_year_of_birth: 1999,
    student_profile: null,
    student_number:102,
    student_gender: "male"
  }
         ]);
    });
};
