const nameBtn = document.querySelector(".name-btn");
const searchBar = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");

// empty seach bar handling
function emptyField() {
  if (searchBar.value === '') {
    document.querySelector('label').innerText = 'Field is empty';
    document.querySelector('label').classList.add('error');
  } else {
    document.querySelector('label').innerText = 'Search for a name';
    document.querySelector('label').classList.remove('error');
  }
}

const generateHtml = (data) => {
  const html = `<p class="name">${data.data.namedays.lt}</p>`;
  const nameSpan = document.querySelector(".names");
  nameSpan.innerHTML = html;
};

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
        ({ day, month, name }) => `${month}-${day}<br>${name}.`
      );

      let namesSearch = "";

      if (namesSearch === "") {
        nameDates.forEach((item) => {
          namesSearch += `<li>${item}</li>`;
        });
        document.querySelector(".names").innerHTML = namesSearch;
      }
    } catch (err) {
      let error = 'Ups, something went wrong';
      if (err) {
        document.querySelector('.names').innerHTML = error;
      }
    }
  };
  loadDates();
  emptyField();
});
