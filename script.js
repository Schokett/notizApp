// An object containing a note
let note = {
  idnr: 0,
  title: "TestTitle",
  text: "Hier habe ich etwas geschrieben",
  date: Date.now(),
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

  note.idnr++;
  note.title = InputField.value;
  note.text = textareaField.value;

  fusion(noteElement, InputField, textareaField);
}

//setzt die Objekt daten ins neue note Gerüst
function fusion(noteElement, InputField, textareaField) {
  noteElement.id = "saved-note-" + note.idnr;
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
  const noteContainer = document.getElementById("saved-note-container");
  noteContainer.prepend(noteElement);
  console.log(noteContainer);
}
//die Notizen müssen nach timestamp sortiert werden, neu nach oben!
