import React, { useState } from 'react';
import { createCourse, findGradeByName } from '../api/script';

function CourseForm() {
    const [courseName, setCourseName] = useState('');
    const [gradeName, setGradeName] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const grades = [
        'Prejardín', 'Jardín', 'Transición', 'Primero', 'Segundo',
        'Tercero', 'Cuarto', 'Quinto', 'Sexto', 'Séptimo',
        'Octavo', 'Noveno', 'Décimo', 'Undécimo'
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const grade = await findGradeByName(gradeName);

            if (!grade) {
                throw new Error('Grade not found');
            }

            const courseData = {
                name: courseName,
                grade,
                students: []
            };

            console.log('Created course:', grade);
            const newCourse = await createCourse(courseData);

            setMessage(`Course created successfully: ${newCourse.name}`);
            setError('');
        } catch (error) {
            setError(`Error creating course: ${error.message}`);
            setMessage('');
        }
    };

    return (
        <div>
            <h2>Create Course</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="courseName">Course Name:</label>
                    <input
                        type="text"
                        id="courseName"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="gradeName">Grade Name:</label>
                    <select
                        id="gradeName"
                        value={gradeName}
                        onChange={(e) => setGradeName(e.target.value)}
                        required
                    >
                        <option value="">Select a grade</option>
                        {grades.map((grade) => (
                            <option key={grade} value={grade}>
                                {grade}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <button type="submit">Create Course</button>
                </div>
            </form>

            {message && <div style={{ color: 'green', marginTop: '20px' }}>{message}</div>}
            {error && <div style={{ color: 'red', marginTop: '20px' }}>{error}</div>}
        </div>
    );
}

export default CourseForm;
