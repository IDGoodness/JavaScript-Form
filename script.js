const form = document.getElementById('myForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent the page from refreshing
  await getData();
});


let userDataArray = [];

async function getData() {
    // Collect all inputs
    const name = document.getElementById('name').value
    const username = document.getElementById('username').value
    const email = document.getElementById('email').value
    const image = document.getElementById('image').files[0];

    // Read image from html
    const reader = new FileReader();
    await new Promise(resolve => {
        reader.onload = resolve;
        reader.readAsDataURL(image);
    })
    const imageData = reader.result;
    const userData = {
        name,
        username,
        email,
        image: imageData
    }

    // console.log(userData)


    // Firstly gets the former data from the local storage
    const storedData = localStorage.getItem('userData');


    let userDataArray = storedData ? JSON.parse(storedData) : [];

    // Check if userData is already in userDataArray
    if (!userDataArray.find((user) => user.name === userData.name && user.username === userData.username && user.email === userData.email)) {
    
        if (!Array.isArray(userDataArray)) {
        userDataArray = [userDataArray];
        }
    
        // Add the new data into our empty or previous array
        userDataArray.push(userData);
    }
    // console.log(userDataArray)

    // Store in local storage
    localStorage.setItem('userData', JSON.stringify(userDataArray))

    // console.log(localStorage.getItem('userData'));
    };
    // console.log(userDataArray);



function retrieveData() {
    // Retrieve array from local storage
    const storedData = JSON.parse(localStorage.getItem('userData'))

    // UserProfiles, to manage more than one user.
    const userProfiles = document.getElementById('user-profiles')

    // console.log(storedData)

    // Now, work with the retrieved data

    storedData.forEach(Data => {
        const userProfile = document.createElement('div');
        userProfile.className = 'user-profiles';


        // Display profile picture
        const profilePicture = document.createElement('img');
        profilePicture.src = Data.image;
        profilePicture.style.width = '200px';
        profilePicture.style.height = '200px';
        profilePicture.style.borderRadius = '50%';
        profilePicture.alt = 'Profile Picture';
        profilePicture.className = 'img-thumbnail';

        const profileInfo = document.createElement('div');
        profileInfo.innerHTML = `
            <h2>Welome, ${Data.username}!</h2>
            <p>Your profile information:</p>

            <ul>
                <li><strong>Email:</strong> ${Data.email}</li>
                <li><strong>Fullname:</strong> ${Data.name}</li>
            </ul>
        `;

        userProfile.appendChild(profilePicture);
        userProfile.appendChild(profileInfo);
        userProfiles.appendChild(userProfile);



        // // Display the username
        // const displayUserName = document.getElementById('userName')
        // displayUserName.innerHTML += `${Data.username}`

        // // Display the profile picture, but first.
        // const displayPP = document.getElementById('pp')
        // displayPP.src = Data.image;
        // displayPP.style.width = '200px';
        // displayPP.style.height = '200px';
        // displayPP.style.borderRadius = '50%';

        // // Display the email
        // const displayEmail = document.getElementById('email')
        // displayEmail.innerHTML += `${Data.email}`

        // // Display the full name of the user
        // const displayName = document.getElementById('name')
        // // console.log(displayName)
        // displayName.innerHTML += `${Data.name}`


    });





    // // console.log(displayName)
    // displayName.innerHTML += `${storedData.name}`

    
}
// retrieveData()
// getData()