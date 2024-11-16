import React, { useState } from 'react';
import { registerStudent, findResponsibleByDocument } from '../api/script';

function StudentForm() {
    const [studentData, setStudentData] = useState({
        studentId: '',
        studentName: '',
        document: '',
        documentType: '',
        course: '',
        responsibleDocument: '',
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
            id: parseInt(studentData.studentId, 10),
            name: studentData.studentName,
            document: parseInt(studentData.document, 10),
            documentType: studentData.documentType,
            course: studentData.course,
            responsibleDocument: responsible ? responsible.document : null,
        };

        if (isNaN(student.id) || isNaN(student.document)) {
            setResponseMessage('Please enter valid numbers for student ID and document.');
            return;
        }

        try {
            const result = await registerStudent(student);
            setResponseMessage(result.message);
        } catch (error) {
            setResponseMessage('An error occurred while registering the student.');
        }
    };

    const handleFindResponsible = async () => {
        const documentValue = parseInt(studentData.responsibleDocument, 10);

        if (isNaN(documentValue)) {
            setResponseMessage('Please enter a valid number for the responsible document.');
            return;
        }

        try {
            const responsibleData = await findResponsibleByDocument(documentValue);
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

                <label htmlFor="document">Document:</label>
                <input type="text" id="document" value={studentData.document} onChange={handleChange} required /><br />

                <label htmlFor="documentType">Document Type:</label>
                <input type="text" id="documentType" value={studentData.documentType} onChange={handleChange} required /><br />

                <label htmlFor="course">Course:</label>
                <input type="text" id="course" value={studentData.course} onChange={handleChange} required /><br />

                <h3>Find Responsible</h3>
                <label htmlFor="responsibleDocument">Responsible Document Number:</label>
                <input
                    type="text"
                    id="responsibleDocument"
                    value={studentData.responsibleDocument}
                    onChange={handleChange}
                    required
                /><br />

                <button type="button" onClick={handleFindResponsible}>Find Responsible</button><br />

                {responsible && (
                    <div>
                        <h4>Responsible Found:</h4>
                        <p>Name: {responsible.name}</p>
                        <p>Phone: {responsible.phoneNumber}</p>
                        <p>Email: {responsible.email}</p>
                    </div>
                )}

                <button type="button" onClick={handleRegisterStudent}>Register Student</button>
            </form>

            <div>{responseMessage}</div>
        </div>
    );
}

export default StudentForm;
