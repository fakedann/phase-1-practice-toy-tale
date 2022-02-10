
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
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
});

let toyCollection = document.querySelector('#toy-collection')
let form = document.querySelector('.add-toy-form')

fetch('http://localhost:3000/toys')
.then( resp => resp.json() )
.then( toysData => toysData.forEach( toy => renderToys(toy) ) )

form.addEventListener('submit', handleForm)

function renderToys(toy){

  let div = document.createElement('div')
  div.className = 'card'
  let h2 = document.createElement('h2')
  h2.innerHTML = toy.name
  let img = document.createElement('img')
  img.className = 'toy-avatar'
  img.src = toy.image
  let p = document.createElement('p')
  p.innerHTML = toy.likes
  //console.log(typeof toy.likes)
  //console.log(typeof p.innerHTML)
  let btn = document.createElement('button')
  btn.className = 'like-btn'
  btn.id = toy.id
  btn.innerHTML = 'Like ❤️'
  btn.addEventListener("click", function(e){
    toy.likes++
    p.innerHTML = toy.likes
    fetch(`http://localhost:3000/toys/${e.target.id}`,{
    method: 'PATCH',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toy)
  })
  })
  div.append(h2, img, p, btn)
  toyCollection.appendChild(div)
}

function handleForm(e){
  e.preventDefault()
  //console.log(e.target.name.value)
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      'name': `${e.target.name.value}`,
      'image': `${e.target.image.value}`,
      "likes" : 0
      }),
    })
  .then( resp => resp.json() )
  .then( toy => renderToys(toy) )
  form.reset()

}

function handleLike(e, toy){
  console.log(toy.likes)
  fetch(`http://localhost:3000/toys/${e.target.id}`,{
    method: 'PATCH',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toy)
  })
  .then(resp=> resp.json())
  .then(toy => console.log(toy))

}

function deleteObj(id){
  fetch(`http://localhost:3000/toys/${id}`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json"
  }
})
.then(res => res.json())
.then( obj => console.log(obj))
}