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
                id: studentData.id,
                name: studentData.name,
                document: studentData.document,
                documentType: studentData.documentType,
                course: studentData.course,
                responsibleDocument: responsible ? responsible.document : null,
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

export async function registerResponsible(numberDocument, newTypeDocument, newName, newPhoneNumber, newEmail) {
    try {
        console.log('Responsible data being sent:', {
            document: numberDocument,
            siteDocument: newTypeDocument,
            name: newName,
            phoneNumber: newPhoneNumber,
            email: newEmail
        });

        const response = await fetch(`${apiUrl}/registerResponsible`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                document: numberDocument,
                siteDocument: newTypeDocument,
                name: newName,
                phoneNumber: newPhoneNumber,
                email: newEmail
            })
        });

        if (!response.ok) {
            const errorDetails = await response.text();
            console.error('Server responded with error:', response.status, errorDetails);
            throw new Error(`Failed to register responsible: ${response.status} - ${errorDetails}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error registering responsible:', error.message);
        throw new Error('An error occurred while registering the responsible person.');
    }
}


export async function findResponsibleByDocument(numberDocument) {
    try {
        const url = new URL(`${apiUrl}/findResponsibleByDocument`);
        const params = {
            responsibleDocNumber: numberDocument
        };
        url.search = new URLSearchParams(params).toString();

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

export async function findGradeByName(gradeName) {
    try {
        const url = new URL(`${apiUrl}/findGradeByName`);
        const params = {
            gradeName: gradeName
        };
        url.search = new URLSearchParams(params).toString();

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorDetails = await response.text();
            console.error('Server responded with error:', response.status, errorDetails);
            throw new Error(`Failed to find grade: ${response.status} - ${errorDetails}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error finding grade:', error);
        throw error;
    }
}

export async function createCourse(courseName, gradeName) {
    const requestBody = {
        name: courseName,
        grade: {
            name: gradeName
        },
        students: []
    };

    try {
        const response = await fetch('/api/courses/createCourse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error);
        }

        const createdCourse = await response.json();
        console.log('Course created successfully:', createdCourse);
    } catch (error) {
        console.error('Error creating course:', error.message);
    }
}
