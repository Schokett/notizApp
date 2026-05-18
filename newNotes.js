// An object containing a note
const note = {
  idnr: null,
  title: "",
  text: "",
  date: null,
};

const notes = getDataFromLocalstorage() || [];

function submitNewNote() {
  // Daten in Objekt schreiben
  if (!passDataNewNote()) {
    return;
  }
  // Daten in HTML Element schreiben
  const htmlElement = buildNewNote(note);
  // HTML Element anzeigen
  displayNewNote(htmlElement);

  notes.push({ ...note });
  saveDataLocalStorage();
}

//Build a framework note
function buildNewNote(note) {
  const div = document.createElement("div");
  const title = document.createElement("p");
  const text = document.createElement("p");
  const date = document.createElement("p");

  div.classList.add("saved-note");
  title.classList.add("title-history");
  text.classList.add("text-history");
  date.classList.add("date-history");

  title.innerText = note.title;
  text.innerText = note.text;
  date.innerText = new Date(note.date).toLocaleString();

  div.appendChild(title);
  div.appendChild(text);
  div.appendChild(date);

  return div;

  //passDataNewNote(div);
}

//Pass data from the text fields to the object
function passDataNewNote(noteElement) {
  const InputField = document.getElementById("title");
  const textareaField = document.getElementById("text");

  if (InputField.value !== "" && textareaField.value !== "") {
    note.idnr++;
    note.title = InputField.value;
    note.text = textareaField.value;
    note.date = Date.now();
    return true;
  } else if (InputField.value === "" && textareaField.value === "") {
    InputField.classList.add("border-light");
    textareaField.classList.add("border-light");
    alert("Fülle bitte beide Felder aus, um speichern zu können!");
    return false;
  } else if (textareaField.value === "") {
    textareaField.classList.add("border-light");
    alert("Fülle bitte beide Felder aus, um speichern zu können!");
    return false;
  } else if (InputField.value === "") {
    InputField.classList.add("border-light");
    alert("Fülle bitte beide Felder aus, um speichern zu können!");
    return false;
  }
}

//Display a new note
function displayNewNote(noteElement) {
  const noteContainerElement = document.getElementById("saved-note-container");
  noteContainerElement.prepend(noteElement);
}

//eventlistener domloaded
document.addEventListener("DOMContentLoaded", function () {
  const InputField = document.getElementById("title");
  const textareaField = document.getElementById("text");

  InputField.addEventListener("input", function () {
    InputField.classList.remove("border-light");
  });

  textareaField.addEventListener("input", function () {
    textareaField.classList.remove("border-light");
  });
});
