import React, { useState } from 'react';
import { createCourse } from '../api/script';

function CourseForm() {
    const [courseName, setCourseName] = useState('');
    const [gradeName, setGradeName] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const courseData = {
            name: courseName,
            grade: { name: gradeName },
            students: []
        };

        try {
            const createdCourse = await createCourse(courseData);
            setMessage(`Course created successfully: ${createdCourse.name}`);
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
                    <input
                        type="text"
                        id="gradeName"
                        value={gradeName}
                        onChange={(e) => setGradeName(e.target.value)}
                        required
                    />
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
