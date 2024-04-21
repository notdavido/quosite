

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

// const submitButton = document.getElementById("submitButton");
// submitButton.addEventListener("click", (e) => {
//   e.preventDefault();}
// )