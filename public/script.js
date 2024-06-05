// script.js
document.getElementById('userForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const query = `
        mutation {
            addUser(name: "${name}", email: "${email}") {
                id
                name
                email
            }
        }
    `;

    const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
    });

    const result = await response.json();
    console.log(result);

    if (result.data && result.data.addUser) {
        alert('User added successfully!');
        loadUsers();
    } else {
        alert('Error adding user.');
    }

    document.getElementById('userForm').reset();
});

async function loadUsers() {
    const query = `
        {
            users {
                id
                name
                email
            }
        }
    `;

    const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
    });

    const result = await response.json();
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    if (result.data && result.data.users) {
        result.data.users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `${user.name} (${user.email})`;
            const button = document.createElement('button');
            button.textContent = 'Delete';
            button.addEventListener('click', () => deleteUser(user.id));
            li.appendChild(button);
            userList.appendChild(li);
        });
    }
}

async function deleteUser(id) {
    const query = `
        mutation {
            deleteUser(id: ${id}) {
                id
            }
        }
    `;

    const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
    });

    const result = await response.json();
    console.log(result);

    if (result.data && result.data.deleteUser) {
        alert('User deleted successfully!');
        loadUsers();
    } else {
        alert('Error deleting user.');
    }
}

document.addEventListener('DOMContentLoaded', loadUsers);
