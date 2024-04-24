// index.js

// Callbacks
const handleClick = (ramen) => {
  const detailImage = document.querySelector('.detail-image');
  const name = document.querySelector('.name');
  const restaurant = document.querySelector('.restaurant');
  const ratingDisplay = document.querySelector('#rating-display');
  const commentDisplay = document.querySelector('#comment-display');

  detailImage.src = ramen.image;
  name.textContent = ramen.name;
  restaurant.textContent = ramen.restaurant;
  ratingDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;
};

const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const newName = document.getElementById('new-name').value;
    const newRestaurant = document.getElementById('new-restaurant').value;
    const newImage = document.getElementById('new-image').value;
    const newRating = document.getElementById('new-rating').value;
    const newComment = document.getElementById('new-comment').value;

    const newRamen = {
      id: Date.now(), // Generate a unique id (not from the API)
      name: newName,
      restaurant: newRestaurant,
      image: newImage,
      rating: newRating,
      comment: newComment
    };

    await displayNewRamen(newRamen);
    form.reset();
  });
};

const displayNewRamen = async (ramen) => {
  const ramenMenu = document.getElementById('ramen-menu');
  const ramenItem = document.createElement('div');
  ramenItem.classList.add('ramen-item');
  ramenItem.innerHTML = `
    <img src="${ramen.image}" alt="${ramen.name}" data-id="${ramen.id}" />
    <h4>${ramen.name}</h4>
  `;
  ramenItem.addEventListener('click', () => handleClick(ramen));
  ramenMenu.appendChild(ramenItem);
};

const displayRamens = async () => {
  const response = await fetch('http://localhost:3000/ramens');
  const ramens = await response.json();
  
  const ramenMenu = document.getElementById('ramen-menu');
  ramenMenu.innerHTML = '';

  ramens.forEach(async (ramen, index) => {
    await displayNewRamen(ramen);
    if (index === 0) {
      handleClick(ramen);
    }
  });
};

const main = async () => {
  await displayRamens();
  addSubmitListener();
};

document.addEventListener('DOMContentLoaded', main);

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
