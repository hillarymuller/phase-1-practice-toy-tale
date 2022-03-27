let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  getAllToys();
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  toyFormContainer.addEventListener('submit', (e) => {
    e.preventDefault();
    postToy(e.target.name.value, e.target.image.value)
  })
});

  function getAllToys() {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(data => data.map(toy => addToyInfo(toy)))
}

function addToyInfo(toy) {
  const card = `<div class="card">
  <h2>${toy.name}</h2>
  <img src= "${toy.image}" class="toy-avatar"/>
  <p>${toy.likes}Likes</p>
  <button class="like-btn" id=${toy.id}>Like &hearts;</button>
  </div>`
  let toyCollection = document.getElementById('toy-collection')
  toyCollection.innerHTML += card;
  const likeButton = document.getElementsByClassName('like-btn');
likeButton.addEventListener('click', (e) => {
  e.preventDefault();
  toy.likes = parseInt(toy.likes) + 1;
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toy),
    });
    addToyInfo(toy)
    });
}




  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ 
    "name": name,
    "image": url,
    "likes": 0
  })
  })
  .then(res => res.json())
  .then(data => addToyInfo(data))



