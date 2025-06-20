const breedListEl = document.getElementById('breed-list');
const breedDetailEl = document.getElementById('breed-detail');
const breedNameEl = document.getElementById('breed-name');
const breedImageEl = document.getElementById('breed-image');
const backButton = document.getElementById('back-button');

async function fetchBreeds() {
  try {
    const res = await fetch('https://dog.ceo/api/breeds/list/all');
    const data = await res.json();

    const breeds = Object.keys(data.message);
    renderBreedList(breeds);
  } catch (error) {
    breedListEl.innerHTML = '<li>Ошибка загрузки пород собак.</li>';
  }
}

function renderBreedList(breeds) {
  breedListEl.innerHTML = '';
  breeds.forEach(breed => {
    const li = document.createElement('li');
    li.textContent = breed;
    li.addEventListener('click', () => showBreedDetail(breed));
    breedListEl.appendChild(li);
  });
}

async function showBreedDetail(breed) {
  try {
    const res = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
    const data = await res.json();

    breedNameEl.textContent = breed;
    breedImageEl.src = data.message;
    breedImageEl.alt = `Фото породы ${breed}`;

    breedListEl.style.display = 'none';
    breedDetailEl.style.display = 'block';
  } catch (error) {
    alert('Ошибка при загрузке изображения породы.');
  }
}

backButton.addEventListener('click', () => {
  breedDetailEl.style.display = 'none';
  breedListEl.style.display = 'block'; // исправлено с 'grid' на 'block'
});

fetchBreeds();
