// Helper function to fetch data
async function fetchData(url, method, body, token) {
    const headers = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        method: method,
        headers: headers,
        body: body ? JSON.stringify(body) : null
    });
    return response.json();
}

// Function to load todos
async function loadTodos(token) {
    const todosList = document.getElementById('todosList');
    todosList.innerHTML = '';

    try {
        const data = await fetchData('http://localhost:9000/api/todos', 'GET', null, token);
        
        data.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo.title;
            li.dataset.id = todo._id;
            li.addEventListener('click', deleteTodo);
            todosList.appendChild(li);
        });
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// User Registration
document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
        await fetchData('http://localhost:9000/api/users/register', 'POST', { name, email, password });
        alert('Registration successful!');
        document.getElementById('registerForm').reset();
        window.location.href = '../index.html'
    } catch (error) {
        console.error('Error:', error.message);
    }
});