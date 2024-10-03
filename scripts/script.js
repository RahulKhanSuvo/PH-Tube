// load Categories
const loadCategories = async () => {
  const uri = "https://openapi.programming-hero.com/api/phero-tube/categories";
  const res = await fetch(uri);
  const data = await res.json();
  displayCategories(data.categories);
};
// load videos
const loadVideos = async () => {
  const uri = "https://openapi.programming-hero.com/api/phero-tube/videos";
  const res = await fetch(uri);
  const data = await res.json();
  displayVideos(data.videos);
};
// display video
const displayVideos = (videos) => {
  const videosContainer = document.getElementById("videos-section");
  videos.forEach((video) => {
    const card = document.createElement("div");
    card.classList = "card card-compact shadow-xl ";
    card.innerHTML = `
       <figure class="h-[200px]">
    <img class="w-full h-full object-cover"
      src=${video.thumbnail}
      alt=${video.title} />
  </figure>
  <div class="py-5 px-3 flex gap-6">
   <div>
 <img class="h-10 w-10 rounded-full" src=${
   video.authors[0].profile_picture
 } alt="">
</div>
   <div>
    <h2 class="card-title">${video.title}</h2>
    <div class="flex gap-2 items-center"><p>${video.authors[0].profile_name}</p>
    ${
      video.authors[0].verified === true
        ? ` <img
          class="w-5"
          src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"
        />`
        : ""
    }
    </div>
    <p>${video.others.views}</p>
   </div>
  </div>`;
    videosContainer.appendChild(card);
  });
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
loadVideos();
loadCategories();
