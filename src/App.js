import React from 'react';
import './styles/App.css';
import StudentForm from './components/StudentForm';
import ResponsibleForm from './components/ResponsibleForm';
import CourseForm from './components/CourseForm';

function App() {
    return (
        <div>
            <div className="content-form">
                <StudentForm />  {}
                <ResponsibleForm />  {}
                <CourseForm/> {}
            </div>
        </div>
    );
}

export default App;
