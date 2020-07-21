const nameBtn = document.querySelector("#name-btn");
const apiData = {
  url: "https://api.abalin.net/today?",
  country: "country=lt",
};

nameBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const {url, country } = apiData;
  const apiUrl = `${url}${country}`;

  fetch(apiUrl)
    .then((data) => data.json())
    .then((names) => generateHtml(names));

  const generateHtml = (data) => {
    console.log(data);
    const html = `<p class="name">${data.data.namedays.lt}</p>`;
    const nameSpan = document.querySelector('#names');
    nameSpan.innerHTML = html;
  }
});
