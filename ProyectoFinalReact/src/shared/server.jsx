export async function getData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}

export async function getElement(url, id) {
    const elementUrl = `${url}/${id}`;
    try {
        const response = await fetch(elementUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching element: ${response.status}`);
        }

        console.log('Element fetched successfully');

        const data = await response.text();
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error fetching element: ', error);
        throw error;
    }
}

export async function deleteData(url, id) {
    const deleteUrl = `${url}/${id}`;
    try {
        const response = await fetch(deleteUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Error deleting: ${response.status}`);
        }

        console.log('Element deleted successfully');

        const data = await response.text();
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error deleting element: ', error);
        throw error;
    }
}

export async function putData(url, task) {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Error ' + response.statusText);
        }

        const result = await response.json();
        console.log('Element updated:', result);
        return result;
    } catch (error) {
        console.error('Error updating element:', error);
    }
}

export async function postData(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        return { response, result };
    } catch (error) {
        console.log('Could not add the element: ', error);
    }
}