import React, { useState } from 'react';
import { registerResponsible } from '../api/script';

function ResponsibleForm() {
    const [responsibleData, setResponsibleData] = useState({
        responsibleName: '',
        responsibleEmail: '',
        responsiblePhone: '',
        responsibleAddress: '',
        responsibleDocument: '',
        typeDocument: '',
    });

    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setResponsibleData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleRegisterResponsible = async () => {
        const documentValue = parseInt(responsibleData.responsibleDocument, 10);

        if (isNaN(documentValue)) {
            setResponseMessage('Please enter a valid number for the document.');
            return;
        }

        try {
            const result = await registerResponsible(
                documentValue,
                responsibleData.typeDocument,
                responsibleData.responsibleName,
                responsibleData.responsiblePhone,
                responsibleData.responsibleEmail,
                responsibleData.responsibleAddress
            );
            setResponseMessage(result.message);
        } catch (error) {
            setResponseMessage('An error occurred while registering the responsible.');
        }
    };

    return (
        <div>
            <h2>Register Responsible</h2>
            <form>
                <label htmlFor="responsibleName">Name:</label>
                <input type="text" id="responsibleName" value={responsibleData.responsibleName} onChange={handleChange} required /><br />

                <label htmlFor="responsibleEmail">Email:</label>
                <input type="email" id="responsibleEmail" value={responsibleData.responsibleEmail} onChange={handleChange} required /><br />

                <label htmlFor="responsiblePhone">Phone Number:</label>
                <input type="text" id="responsiblePhone" value={responsibleData.responsiblePhone} onChange={handleChange} required /><br />

                <label htmlFor="responsibleAddress">Address:</label>
                <input type="text" id="responsibleAddress" value={responsibleData.responsibleAddress} onChange={handleChange} required /><br />

                <label htmlFor="responsibleDocument">Document:</label>
                <input type="text" id="responsibleDocument" value={responsibleData.responsibleDocument} onChange={handleChange} required /><br />

                <label htmlFor="typeDocument">Type of Document:</label>
                <input type="text" id="typeDocument" value={responsibleData.typeDocument} onChange={handleChange} required /><br />

                <button type="button" onClick={handleRegisterResponsible}>Register Responsible</button>
            </form>
            <div>{responseMessage}</div>
        </div>
    );
}

export default ResponsibleForm;
