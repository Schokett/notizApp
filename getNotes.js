const LOCAL_STORAGE_KEY = "notebook-notes";

// Daten vom noteElement in den localStorage packen
function saveDataLocalStorage() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(note));

  //   speichert nur einen!!!
}

document.addEventListener("DOMContentLoaded", function () {
  const noteContainerElement = document.getElementById("saved-note-container");
  const saveData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  console.log(saveData);

  const div = document.createElement("div");
  const title = document.createElement("p");
  const text = document.createElement("p");
  const date = document.createElement("p");

  div.classList.add("saved-note");
  title.classList.add("title-history");
  text.classList.add("text-history");
  date.classList.add("date-history");

  title.textContent = saveData.title;
  text.textContent = saveData.text;
  date.textContent = saveData.date;

  div.appendChild(title);
  div.appendChild(text);
  div.appendChild(date);

  if (noteContainerElement) {
    noteContainerElement.appendChild(div);
  }
});
