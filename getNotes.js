const LOCAL_STORAGE_KEY = "notebook-notes";

// Daten vom noteElement in den localStorage packen
function saveDataLocalStorage() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(note));
  console.log(note);
  //   speichert nur einen!!!
}

document.addEventListener("DOMContentLoaded", function () {
  const noteContainerElement = document.getElementById("saved-note-container");
});
