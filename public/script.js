document.getElementById('userForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    console.log(document.getElementById('name').value);
    console.log(document.getElementById('email').value);
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

document.getElementById('updateForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const id = document.getElementById('updateId').value;
    const name = document.getElementById('updateName').value;
    const email = document.getElementById('updateEmail').value;

    const query = `
        mutation {
            updateUser(id: ${id}, name: "${name}", email: "${email}") {
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

    if (result.data && result.data.updateUser) {
        alert('User updated successfully!');
        loadUsers();
    } else {
        alert('Error updating user.');
    }

    document.getElementById('updateForm').reset();
    document.getElementById('updateId').readOnly = true;
});

document.getElementById('postForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const userId = document.getElementById('postUserId').value;
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;

    const query = `
        mutation {
            addPost(userId: ${userId}, title: "${title}", content: "${content}") {
                id
                title
                content
                user {
                    id
                    name
                }
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

    if (result.data && result.data.addPost) {
        alert('Post added successfully!');
        loadUsers();
    } else {
        alert('Error adding post.');
    }

    document.getElementById('postForm').reset();
});

document.getElementById('orderForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const userId = document.getElementById('orderUserId').value;
    const title = document.getElementById('orderTitle').value;
    const content = document.getElementById('orderContent').value;

    const query = `
        mutation {
            addPost(userId: ${userId}, title: "${title}", content: "${content}") {
                id
                title
                content
                user {
                    id
                    name
                }
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

    if (result.data && result.data.addPost) {
        alert('order added successfully!');
        loadUsers();
    } else {
        alert('Error adding post.');
    }

    document.getElementById('orderForm').reset();
});

async function loadUsers() {
    const query = `
        {
            users {
                id
                name
                email
                posts {
                    id
                    title
                    content
                }
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
            li.innerHTML = `<strong>${user.name} (${user.email})</strong>`;
            const userPosts = document.createElement('ul');
            user.posts.forEach(post => {
                const postLi = document.createElement('li');
                postLi.textContent = `${post.title}: ${post.content}`;
                userPosts.appendChild(postLi);
            });
            li.appendChild(userPosts);
            const updateButton = document.createElement('button');
            updateButton.textContent = 'Update';
            updateButton.addEventListener('click', () => populateUpdateForm(user));
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteUser(user.id));
            li.appendChild(updateButton);
            li.appendChild(deleteButton);
            userList.appendChild(li);
        });
    }
}

function populateUpdateForm(user) {
    document.getElementById('updateId').value = user.id;
    document.getElementById('updateId').readOnly = true;
    document.getElementById('updateName').value = user.name;
    document.getElementById('updateEmail').value = user.email;
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
