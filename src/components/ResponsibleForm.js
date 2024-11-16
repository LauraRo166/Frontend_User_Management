import React, { useState } from 'react';
import { registerResponsible } from '../api/script';

function ResponsibleForm() {
    const [responsibleData, setResponsibleData] = useState({
        name: '',
        document: '',
        siteDocument: '',
        phoneNumber: '',
        email: '',
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
        const documentValue = parseInt(responsibleData.document, 10);

        if (isNaN(documentValue)) {
            setResponseMessage('Please enter a valid number for the document.');
            return;
        }

        try {
            const result = await registerResponsible(
                documentValue,
                responsibleData.siteDocument,
                responsibleData.name,
                responsibleData.phoneNumber,
                responsibleData.email
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
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" value={responsibleData.name} onChange={handleChange} required /><br />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={responsibleData.email} onChange={handleChange} required /><br />

                <label htmlFor="phoneNumber">Phone Number:</label>
                <input type="text" id="phoneNumber" value={responsibleData.phoneNumber} onChange={handleChange} required /><br />

                <label htmlFor="document">Document:</label>
                <input type="text" id="document" value={responsibleData.document} onChange={handleChange} required /><br />

                <label htmlFor="siteDocument">Site of Document:</label>
                <input type="text" id="siteDocument" value={responsibleData.siteDocument} onChange={handleChange} required /><br />

                <button type="button" onClick={handleRegisterResponsible}>Register Responsible</button>
            </form>
            <div>{responseMessage}</div>
        </div>
    );
}

export default ResponsibleForm;
