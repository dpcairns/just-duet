import {   
    checkAuth, 
    logout,
    fetchProfile, 
    
    getUser, 
    getUserId,
    fetchMessages,
    createMessage
} from '../fetch-utils.js';


// import { renderProfile } from '../render-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const editButton = document.getElementById('edit-profile-button');
const profileContainerEl = document.querySelector('.profile-container');
const messagesContainerEl = document.querySelector('.messages-container');
const form = document.querySelector('.message-form');


// console.log(profileEl);

form.addEventListener('submit', async(e) => {
    e.preventDefault();

    const data = new FormData(form);

    await createMessage({
        message: data.get('message-text')
    });

    await displayProfile();

    form.reset();
});

window.addEventListener('load', async() => {
    await displayProfile();

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const user = await getUser();
    const userId = user.user.id;
    console.log(userId);
    
    const profile = await getUserId(userId);
    console.log(profile);
    if (+id === profile.id) {
        console.log(profile.id, id, 'match'); 
        editButton.classList.add('visible');
    }
    else {
        console.log(profile.id, id, 'no match');
        editButton.classList.add('hide');
    }
    // await displayMessages();
});

logoutButton.addEventListener('click', () => {
    logout();
});

editButton.addEventListener('click', async() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const profile = await fetchProfile(id);

    

    window.location.href = `../edit-page/?id=${profile.id}`;
});

async function displayProfile() {
    profileContainerEl.textContent = '';

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const profile = await fetchProfile(id);

    const profileEl = document.createElement('div');
    const talentsDiv = document.createElement('div');
    const aboutDiv = document.createElement('div');
    const nameEl = document.createElement('p');
    const locationEl = document.createElement('p');
    const interestsEl = document.createElement('p');
    const aboutEl = document.createElement('p');
    const haveEl = document.createElement('p');
    const wantEl = document.createElement('p');

    profileEl.classList.add('profile');
    talentsDiv.classList.add('talents');
    aboutDiv.classList.add('about');

    nameEl.textContent = profile.name;
    locationEl.textContent = profile.location;
    interestsEl.textContent = profile.interests;
    aboutEl.textContent = profile.about;
    haveEl.textContent = profile.have_talents;
    wantEl.textContent = profile.want_talents;

    talentsDiv.append(haveEl, wantEl);

    aboutDiv.append(interestsEl, aboutEl);

    profileEl.append(nameEl, talentsDiv, aboutDiv);
    profileContainerEl.append(profileEl);

}