import React, { useState } from 'react';
import { registerStudent } from '../api/script';

function StudentForm() {
    const [studentData, setStudentData] = useState({
        studentId: '',
        studentName: '',
        course: '',
        academicYear: '',
        relationWithResponsible: '',
    });

    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setStudentData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleRegisterStudent = async () => {
        const student = {
            id: studentData.studentId,
            name: studentData.studentName,
            course: studentData.course,
            academicYear: parseInt(studentData.academicYear),
            responsible: null,
            relationWithResponsible: studentData.relationWithResponsible,
        };

        try {
            const result = await registerStudent(student); // Usando la función importada
            setResponseMessage(result.message);
        } catch (error) {
            setResponseMessage('An error occurred while registering the student.');
        }
    };

    return (
        <div>
            <h2>Register Student</h2>
            <form>
                <label htmlFor="studentId">Student ID:</label>
                <input type="text" id="studentId" value={studentData.studentId} onChange={handleChange} required /><br />

                <label htmlFor="studentName">Name:</label>
                <input type="text" id="studentName" value={studentData.studentName} onChange={handleChange} required /><br />

                <label htmlFor="course">Course:</label>
                <input type="text" id="course" value={studentData.course} onChange={handleChange} required /><br />

                <label htmlFor="academicYear">Academic Year:</label>
                <input type="number" id="academicYear" value={studentData.academicYear} onChange={handleChange} required /><br />

                <label htmlFor="relationWithResponsible">Relation with Responsible:</label>
                <input type="text" id="relationWithResponsible" value={studentData.relationWithResponsible} onChange={handleChange} required /><br />

                <button type="button" onClick={handleRegisterStudent}>Register Student</button>
            </form>
            <div>{responseMessage}</div>
        </div>
    );
}

export default StudentForm;
