// An object containing a note
let note = {
  idnr: null,
  title: "",
  text: "",
  date: null,
};

//Build a framework note
function buildNewNote() {
  const div = document.createElement("div");
  const title = document.createElement("p");
  const text = document.createElement("p");
  const date = document.createElement("p");

  div.classList.add("saved-note");
  title.classList.add("title-history");
  text.classList.add("text-history");
  date.classList.add("date-history");

  div.appendChild(title);
  div.appendChild(text);
  div.appendChild(date);

  passDataNewNote(div);
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

    fusion(noteElement, InputField, textareaField);
  } else if (InputField.value === "" && textareaField.value === "") {
    InputField.classList.add("border-light");
    textareaField.classList.add("border-light");
    alert("Fülle bitte beide Felder aus, um speichern zu können!");
  } else if (textareaField.value === "") {
    textareaField.classList.add("border-light");
    alert("Fülle bitte beide Felder aus, um speichern zu können!");
  } else if (InputField.value === "") {
    InputField.classList.add("border-light");
    alert("Fülle bitte beide Felder aus, um speichern zu können!");
  }
}

//Inserts the object data into the new note structure.
function fusion(noteElement, InputField, textareaField) {
  const titleTag = noteElement.querySelector(".title-history");
  const textTag = noteElement.querySelector(".text-history");
  const dateTag = noteElement.querySelector(".date-history");

  titleTag.innerText = note.title;
  textTag.innerText = note.text;
  dateTag.innerText = new Date(note.date).toLocaleString();

  displayNewNote(noteElement);
}

//Display a new note
function displayNewNote(noteElement) {
  const noteContainerElement = document.getElementById("saved-note-container");
  noteContainerElement.prepend(noteElement);

  saveDataLocalStorage();
}

//eventlistener
document.addEventListener("DOMContentLoaded", function () {
  const InputField = document.getElementById("title");
  const textareaField = document.getElementById("text");

  // Wenn man in das Titel-Feld klickt
  InputField.addEventListener("input", function () {
    InputField.classList.remove("border-light");
  });

  // Wenn man in das Text-Feld klickt
  textareaField.addEventListener("input", function () {
    textareaField.classList.remove("border-light");
  });
});
