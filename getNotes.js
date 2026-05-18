const LOCAL_STORAGE_KEY = "notebook-notes";

function saveDataLocalStorage() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
}

document.addEventListener("DOMContentLoaded", function () {
  const noteContainerElement = document.getElementById("saved-note-container");
  const saveData = getDataFromLocalstorage();
  saveData.forEach((note) => {
    const div = buildNewNote(note);
    if (noteContainerElement) {
      console.log(saveData);
      noteContainerElement.prepend(div);
    }
  });
});

function getDataFromLocalstorage() {
  const saveData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  return saveData;
}
