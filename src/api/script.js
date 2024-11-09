const apiUrl = 'http://localhost:8081';

export async function registerStudent(student) {
    try {

        const response = await fetch(`${apiUrl}/registerStudent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(student),
        });

        if (!response.ok) {
            throw new Error('Failed to register student for back');
        }

        return await response.json();
    } catch (error) {
        console.error('Error registering student:', error);
        throw error;
    }
}

export async function registerResponsible(numberDocument, newTypeDocument, newName, newPhoneNumber, newEmail, newAddress) {
    try {
        console.log('Responsible data being sent:', numberDocument);

        const response = await fetch(`${apiUrl}/registerResponsible`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                document: numberDocument,
                typeDocument: newTypeDocument,
                name: newName,
                phoneNumber: newPhoneNumber,
                email: newEmail,
                address: newAddress
            })
        });

        if (!response.ok) {
            const errorDetails = await response.text();
            console.error('Server responded with error:', response.status, errorDetails);
            throw new Error(`Failed to register responsible: ${response.status} - ${errorDetails}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error registering responsible:', error);
        throw error;
    }
}


