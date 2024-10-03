// load all videos
const loadCategories = async () => {
  const uri = "https://openapi.programming-hero.com/api/phero-tube/categories";
  const res = await fetch(uri);
  const data = await res.json();
  displayCategories(data.categories);
};
// display categories
const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories-container");
  categories.forEach((element) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
      <button class="btn">${element.category}</button>
      `;
    categoriesContainer.appendChild(buttonContainer);
  });
};
loadCategories();
