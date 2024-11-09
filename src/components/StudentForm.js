import React, { useState } from 'react';
import { registerStudent, findResponsibleByDocument} from '../api/script';

function StudentForm() {
    const [studentData, setStudentData] = useState({
        studentId: '',
        studentName: '',
        course: '',
        academicYear: '',
        relationWithResponsible: '',
        responsibleDocumentNumber: '',
        responsibleDocumentType: '',
    });

    const [responseMessage, setResponseMessage] = useState('');
    const [responsible, setResponsible] = useState(null);

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
            responsible: responsible ? responsible.id : null,
            relationWithResponsible: studentData.relationWithResponsible,
        };

        try {
            const result = await registerStudent(student);
            setResponseMessage(result.message);
        } catch (error) {
            setResponseMessage('An error occurred while registering the student.');
        }
    };

    const handleFindResponsible = async () => {
        const documentValues = parseInt(studentData.responsibleDocumentNumber, 10);
        if (isNaN(documentValues)) {
            setResponseMessage('Please enter a valid number for the document.');
            return;
        }
        try {
            const responsibleData = await findResponsibleByDocument(studentData.responsibleDocumentType, documentValues);
            if (responsibleData) {
                setResponsible(responsibleData);
                setResponseMessage('Responsible found successfully!');
            } else {
                setResponsible(null);
                setResponseMessage('No responsible found with the provided document.');
            }
        } catch (error) {
            setResponseMessage('An error occurred while finding the responsible.');
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

                <h3>Find Responsible</h3>
                <label htmlFor="responsibleDocumentType">Document Type:</label>
                <input
                    type="text"
                    id="responsibleDocumentType"
                    value={studentData.responsibleDocumentType}
                    onChange={handleChange}
                    required
                /><br />

                <label htmlFor="responsibleDocumentNumber">Document Number (Long):</label>
                <input
                    type="text"
                    id="responsibleDocumentNumber"
                    value={studentData.responsibleDocumentNumber}
                    onChange={handleChange}
                    required
                /><br />

                <button type="button" onClick={handleFindResponsible}>Find Responsible</button><br />

                {responsible && (
                    <div>
                        <h4>Responsible Found:</h4>
                        <p>Name: {responsible.name}</p>
                        <p>Phone: {responsible.phoneNumber}</p>
                    </div>
                )}

                <button type="button" onClick={handleRegisterStudent}>Register Student</button>
            </form>

            <div>{responseMessage}</div>
        </div>
    );
}

export default StudentForm;
