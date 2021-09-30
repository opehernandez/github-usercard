const { default: axios } = require("axios");

/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/


/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3 (line 34).
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/



/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/
function createGitCard (data) {
  let outterDiv = document.createElement('div')
  outterDiv.classList.add('card')
  let img = document.createElement('img')
  img.src = data.avatar_url
  let innerDiv = document.createElement('div')
  innerDiv.classList.add('card-info')
  let h3 = document.createElement('h3')
  h3.classList.add('name')
  h3.textContent = data.name
  let userP = document.createElement('p')
  userP.classList.add('username')
  userP.textContent = data.login
  let locP = document.createElement('p')
  data.location ? locP.textContent = `Location: ${data.location}` : locP.textContent = 'Location: UNKNOWN'
  let profileP = document.createElement('p')
  profileP.textContent = `Profile: `
  let link = document.createElement('a')
  link.textContent = data.html_url
  link.href = data.html_url
  let followersP = document.createElement('p')
  followersP.textContent = `Followers: ${data.followers}`
  let followingP = document.createElement('p')
  followingP.textContent = `Following: ${data.following}`
  let bioP = document.createElement('p')
  data.bio ? bioP.textContent = `Bio: ${data.bio}` : bioP.textContent = `Bio: The user has no Bio`
  profileP.appendChild(link)
  innerDiv.append(h3, userP, locP, profileP, followersP, followingP, bioP )
  outterDiv.append(img, innerDiv)
  return outterDiv
}

const followersArray = ['tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell', 'VABIII', 'opehernandez'];

let cont = document.querySelector('.cards')
followersArray.forEach(item => {
  axios.get(`https://api.github.com/users/${item}`)
  .then( resp => {
  let info = resp.data
  cont.appendChild(createGitCard(info))
  })
})