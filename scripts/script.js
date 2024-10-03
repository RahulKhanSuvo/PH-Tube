function getTimeString(time) {
  const days = Math.floor(time / 86400);
  time %= 86400;
  const hours = Math.floor(time / 3600);
  time %= 3600;
  const minutes = Math.floor(time / 60);
  const secund = time % 60;
  return days > 0
    ? `${days} days ${hours} hrs ago`
    : `${hours} hrs ${minutes} min ${secund} sec ago`;
}
const removeActiveClass = () => {
  const btn = document.getElementsByClassName("category-btn");
  for (const item of btn) {
    item.classList.remove("active");
  }
};
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
// loadDetails
const loadDetails = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${id}`)
    .then((res) => res.json())
    .then((data) => displayDetails(data.video));
};
const displayDetails = (id) => {
  const detailContainer = document.getElementById("modal-content");
  detailContainer.innerHTML = `
  <img class="w-full rounded-md" src=${id.thumbnail} alt="">
   <p >${id.description}</p>
  `;
  document.getElementById("customModal").showModal();
};
const loadCategoriesVideos = async (id) => {
  const uri = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  const res = await fetch(uri);
  const data = await res.json();
  removeActiveClass();
  const activeBtn = document.getElementById(`btn-${id}`);
  activeBtn.classList.add("active");
  displayVideos(data.category);
};
// display video
const displayVideos = (videos) => {
  sortByViews = () => {
    const sortedVideos = videos.sort((a, b) => {
      return parseFloat(b.others.views) - parseFloat(a.others.views);
    });

    displayVideos(sortedVideos);
  };
  const videosContainer = document.getElementById("videos-section");
  videosContainer.innerHTML = "";
  if (videos.length === 0) {
    videosContainer.classList.remove("grid");
    videosContainer.innerHTML = `
    <div class="min-h-[500px] w-full flex flex-col gap-5 justify-center items-center">
    <img src="./images/Icon.png" alt="">
    <h3 class="font-bold text-xl">Oops!! Sorry, There is no content here</h3>
    </div>
  `;
    return;
  } else {
    videosContainer.classList.add("grid");
  }
  videos.forEach((video) => {
    const card = document.createElement("div");
    card.classList =
      "card card-compact shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer";
    card.innerHTML = `
       <figure class="h-[200px] relative">
    <img class="w-full h-full object-cover"
      src=${video.thumbnail}
      alt=${video.title} />
      ${
        video.others.posted_date?.length === 0
          ? ""
          : `<p class="absolute text-white text-sm px-2 bottom-1 right-2 rounded-lg bg-black">${getTimeString(
              video.others.posted_date
            )}</p>`
      }
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
    card.onclick = () => {
      loadDetails(video.video_id);
    };
    videosContainer.appendChild(card);
  });
};
// display categories
const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories-container");
  categories.forEach((element) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
      <button id="btn-${element.category_id}" onclick="loadCategoriesVideos(${element.category_id})" class="btn category-btn">${element.category}</button>
      `;
    categoriesContainer.appendChild(buttonContainer);
  });
};
function reloadPage() {
  location.reload();
}
loadVideos();
loadCategories();
