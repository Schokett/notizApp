// Key name used to store and retrieve the notes array in local storage
const LOCAL_STORAGE_KEY = "notebook-notes";

/**
 * Saves the current notes array to local storage as a JSON string.
 */
function saveDataLocalStorage() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
}

/**
 * Loads saved notes from local storage when the page loads and displays them in the sidebar.
 */
document.addEventListener("DOMContentLoaded", function () {
  const noteContainerElement = document.getElementById("saved-note-container");
  const saveData = getDataFromLocalstorage();

  // Check if there is data to prevent errors if storage is empty
  saveData.forEach((note) => {
    const div = buildNewNote(note);
    if (noteContainerElement) {
      noteContainerElement.prepend(div);
    }
  });
});

/**
 * Retrieves and parses the notes data from local storage.
 */
function getDataFromLocalstorage() {
  const saveData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  return saveData;
}
