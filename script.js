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
      let dates = await res.json();
      generateDates(dates);
    } catch (err) {
      console.log(err);
    }
  };

  const generateDates = (data) => {
    const dateTxt = `<p>${data.results}</p>`;
    dateTxt.filter((date) => {
      return date.day.contains(searchBar.value);
    });
  }; // iterate through items in the array of objects.

  loadDates();
});
