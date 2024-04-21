import { submittingform } from './firebase-init.js';

// console.log(add(1, 2)); // Output: 3

const tagInput = document.getElementById('tag-input');
const tagList = document.getElementById('tag-list');

tagInput.addEventListener('keyup', (event) => {
  const inputValue = event.target.value;
  const tags = inputValue.split(',');

  tagList.innerHTML = ''; // Clear the tag list before adding new tags

  tags.forEach(tag => {
    const trimmedTag = tag.trim(); // Remove leading/trailing spaces
    if (trimmedTag) {
      const tagElement = document.createElement('span');
      tagElement.classList.add('tag');
      tagElement.textContent = trimmedTag;
      tagList.appendChild(tagElement);
    }
  });
});

const submitButton = document.getElementById("submitButton");
// submitButton.preventDefault;
// submitButton.addEventListener("click", () => {
  
//   submittingform(); // Assuming the function is defined elsewhere
// });






document.getElementById("submitButton").addEventListener("click", submittingform);