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
    } else {
        alert('Error adding user.');
    }

    document.getElementById('userForm').reset();
});
