const apiUrl = 'http://localhost:8081';

export async function registerStudent(studentData) {
    try {
        console.log('Student data being sent:', studentData);

        const response = await fetch(`${apiUrl}/registerStudent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                studentId: studentData.id,
                name: studentData.name,
                course: studentData.course,
                academicYear: studentData.academicYear,
                responsible: studentData.responsible,
                relationWithResponsible: studentData.relationWithResponsible
            })
        });

        if (!response.ok) {
            const errorDetails = await response.text();
            console.error('Server responded with error:', response.status, errorDetails);
            throw new Error(`Failed to register student: ${response.status} - ${errorDetails}`);
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

export async function findResponsibleByDocument(typeDocumentResponsible, numberDocument) {
    try {
        const url = new URL(`${apiUrl}/findResponsibleByDocument`);
        const params = {
            responsibleDocType: typeDocumentResponsible,
            responsibleDocNumber: numberDocument
        };
        url.search = new URLSearchParams(params).toString();

        console.log(numberDocument);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorDetails = await response.text();
            console.error('Server responded with error:', response.status, errorDetails);
            throw new Error(`Failed to find responsible: ${response.status} - ${errorDetails}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error finding responsible:', error);
        throw error;
    }
}

