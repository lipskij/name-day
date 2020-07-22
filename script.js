const nameBtn = document.querySelector("#name-btn");
const searchBar = document.querySelector("#searchbar");
const searchBtn = document.querySelector("#search-btn");
const searchNameApi = "https://api.abalin.net/getdate?name=&country=lt";

nameBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const loadNames = async () => {
    try {
      const res = await fetch("https://api.abalin.net/today?country=lt");
      let names = await res.json();
      generateHtml(names);
    } catch (err) {
      console.log(err);
    }
  };

  const generateHtml = (data) => {
    const html = `<p class="name">${data.data.namedays.lt}</p>`;
    const nameSpan = document.querySelector("#names");
    nameSpan.innerHTML = html;
  };
  loadNames();
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const loadDates = async () => {
    try {
      const res = await fetch(
        `https://api.abalin.net/getdate?name=${searchBar.value}&country=lt`
      );
      const dates = await res.json();
      const obj = dates.results;

      const nameDates = obj.map(
        ({ day, month, name }) => `${name}. ${month} menuo ${day} diena.`
      );

      let namesSearch = "";

      if (namesSearch === "") {
        nameDates.forEach((item) => {
          namesSearch += `<li>${item}</li>`;
        });
        document.querySelector("#names").innerHTML = namesSearch;
      }
    } catch (err) {
      console.log(err);
    }
  };
  loadDates();
});
