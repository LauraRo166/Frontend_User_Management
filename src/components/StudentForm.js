import React, { useState, useEffect } from 'react';
import { registerStudent, findResponsibleByDocument, findGradeByName, findCoursesByGrade } from '../api/script';

function StudentForm() {
    const [studentData, setStudentData] = useState({
        studentId: '',
        studentName: '',
        document: '',
        documentType: '',
        grade: '',
        course: '', // Iniciar con un valor vacío en vez de null
        responsibleDocument: '',
    });

    const [responseMessage, setResponseMessage] = useState('');
    const [responsible, setResponsible] = useState(null);
    const [grades, setGrades] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const gradeList = [
            'Prejardin', 'Jardin', 'Transición', 'Primero', 'Segundo', 'Tercero', 'Cuarto',
            'Quinto', 'Sexto', 'Séptimo', 'Octavo', 'Noveno', 'Décimo', 'Undécimo',
        ];
        setGrades(gradeList);
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setStudentData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleGradeChange = async (e) => {
        const selectedGrade = e.target.value;
        setStudentData((prevState) => ({
            ...prevState,
            grade: selectedGrade,
            course: '', // Restablecer curso al cambiar el grado
        }));

        if (selectedGrade) {
            try {
                const courses = await findCoursesByGrade(selectedGrade);
                if (courses.length > 0) {
                    setCourses(courses);
                    setResponseMessage(`Courses for ${selectedGrade} loaded successfully.`);
                } else {
                    setCourses([]);
                    setResponseMessage(`No courses found for the selected grade.`);
                }
            } catch (error) {
                setCourses([]);
                setResponseMessage('Error fetching courses for the selected grade.');
            }
        } else {
            setCourses([]);
        }
    };

    const handleRegisterStudent = async () => {
        const student = {
            id: studentData.studentId,
            name: studentData.studentName,
            document: studentData.document,
            documentType: studentData.documentType,
            courseName: studentData.course,
            responsibleDocument: responsible ? responsible.document : null,
        };
        console.log(student);
        if (!student.id || !student.document || !student.name || !student.documentType || !student.courseName) {
            setResponseMessage('Please fill in all the fields.');
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
        const documentValue = studentData.responsibleDocument;

        if (!documentValue) {
            setResponseMessage('Please enter a valid document for the responsible.');
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

                <label htmlFor="grade">Grade:</label>
                <select id="grade" value={studentData.grade} onChange={handleGradeChange} required>
                    <option value="">Select Grade</option>
                    {grades.map((grade, index) => (
                        <option key={index} value={grade}>{grade}</option>
                    ))}
                </select><br />

                {studentData.grade && (
                    <>
                        <label htmlFor="course">Course:</label>
                        <select
                            id="course"
                            value={studentData.course}
                            onChange={(e) => {
                                setStudentData((prevState) => ({
                                    ...prevState,
                                    course: e.target.value,
                                }));
                            }}
                            required
                        >
                            <option value="">Select Course</option>
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>{course.name}</option>
                            ))}
                        </select><br />
                    </>
                )}

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
