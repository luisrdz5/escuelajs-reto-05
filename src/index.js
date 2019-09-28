const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';
//const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/characters'


const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {   
      setStorage(response.info.next); 
      const characters = response.results;
      let output = characters.map(character => {
        return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name}<span>${character.species}</span></h2>
      </article>
    `
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

async function loadData() {
  let url=localStorage.getItem("next_fetch");
  if(url){
    getData(url);  
  } 
  else{
    try{
      await getData(API);
    }
    catch(err){
      console.log(err)
    }
  }
}
const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});
function setStorage(value){
  localStorage.setItem("next_fetch", value);
}
document.addEventListener("beforeunload", setStorage(''));
intersectionObserver.observe($observe);