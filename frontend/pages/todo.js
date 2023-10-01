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

// Function to create Edit and Delete buttons for each todo
function createButtons(todo) {
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => openEditModal(todo));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTodo(todo._id));

    const buttonContainer = document.createElement('div');
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    return buttonContainer;
}

// Function to load todos
async function loadTodos(token) {
    const todosList = document.getElementById('todosList');
    todosList.innerHTML = '';

    try {
        const data = await fetchData('http://localhost:9000/api/todos', 'GET', null, token);
        
        data.forEach(todo => {
            const li = document.createElement('li');
            li.className = 'todoList'
            li.textContent = todo.title;
            li.dataset.id = todo._id;

            const buttons = createButtons(todo);
            li.appendChild(buttons);

            todosList.appendChild(li);
        });
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Edit Todo Modal
function openEditModal(todo) {
    const modal = document.getElementById('editModal');
    const titleInput = document.getElementById('editTitle');
    const saveButton = document.getElementById('saveEditButton');

    titleInput.value = todo.title;

    saveButton.addEventListener('click', async () => {
        const newTitle = titleInput.value;
        const token = localStorage.getItem('token');

        try {
            await fetchData(`http://localhost:9000/api/todos/${todo._id}`, 'PUT', { title: newTitle }, token);
            alert('Todo updated successfully!');
            modal.style.display = 'none';
            loadTodos(token);
            window.location.reload()
        } catch (error) {
            console.error('Error:', error.message);
        }
    });

    modal.style.display = 'block';
}

// Add Todo
document.getElementById('addTodoForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const title = document.getElementById('todoTitle').value;
    const token = localStorage.getItem('token');

    try {
        await fetchData('http://localhost:9000/api/todos', 'POST', { title }, token);
        alert('Todo added successfully!');
        document.getElementById('addTodoForm').reset();
        loadTodos(token);
    } catch (error) {
        console.error('Error:', error.message);
    }
});

// Delete Todo
async function deleteTodo(todoId) {
    const token = localStorage.getItem('token');

    if (confirm("Are you sure you want to delete this todo?")) {
        try {
            const response = await fetch(`http://localhost:9000/api/todos/${todoId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                alert('Todo deleted successfully!');
                loadTodos(token);
            } else {
                throw new Error('Error deleting todo');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
}

// Logout
document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('token');
    alert('Logged out successfully!');
    window.location.href = '../index.html'
});

// Check if user is logged in
const token = localStorage.getItem('token');
if (token) {
    loadTodos(token);
} else {
    alert('Please log in to see your todos.');
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('editModal');
    modal.style.display = 'none';
}

// Add an event listener for the close button
document.querySelector('.close').addEventListener('click', closeModal);