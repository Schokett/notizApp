// An object containing a note
let easyMDE;
let note = {
  idnr: null,
  title: "",
  text: "",
  date: null,
};

const notes = getDataFromLocalstorage() || [];

function submitNewNote() {
  if (!passDataNewNote()) {
    return;
  }

  const existingIndex = notes.findIndex((n) => n.idnr === note.idnr);
  if (existingIndex !== -1) {
    notes.splice(existingIndex, 1);

    document.getElementById(note.idnr)?.remove();
  }
  const htmlElement = buildNewNote(note);
  displayNewNote(htmlElement);

  notes.push({ ...note });
  saveDataLocalStorage();

  const inputField = document.getElementById("title");
  const textareaField = document.getElementById("text");
  //
  // inputField.value = "";
  // textareaField.value = "";

  noteListeners();
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

  div.id = note.idnr;

  return div;
}

//Pass data from the text fields to the object
function passDataNewNote(noteElement) {
  const inputField = document.getElementById("title");
  const editorText = easyMDE.value();
  const mdeContainer = document.querySelector(".EasyMDEContainer");

  if (inputField.value !== "" && editorText !== "") {
    if (note.idnr === null) {
      note.idnr = getNextId();
    }
    note.title = inputField.value;
    note.text = editorText;
    note.date = Date.now();
    return true;
  } else if (inputField.value === "" && editorText === "") {
    inputField.classList.add("border-light");
    mdeContainer?.classList.add("border-light");
    alert("Fülle bitte beide Felder aus, um speichern zu können!");
    return false;
  } else if (editorText === "") {
    mdeContainer?.classList.add("border-light");
    alert("Fülle bitte beide Felder aus, um speichern zu können!");
    return false;
  } else if (inputField.value === "") {
    // .value hinzugefügt!
    inputField.classList.add("border-light");
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
  easyMDE = new EasyMDE({
    element: document.getElementById("text"),
    spellChecker: false,
    renderingConfig: {
      singleLineBreaks: false,
      codeSyntaxHighlighting: true,
    },
  });
  const inputField = document.getElementById("title");

  inputField.addEventListener("input", function () {
    inputField.classList.remove("border-light");
  });

  easyMDE.codemirror.on("change", function () {
    document.querySelector(".EasyMDEContainer")?.classList.remove("border-light");
  });

  const searchField = document.querySelector(".search");
  searchField.addEventListener("input", searchNote);

  noteListeners();
});

function getNextId() {
  const sortedNotes = notes.sort((noteA, noteB) => noteA.idnr - noteB.idnr);

  let nextId = 1;

  for (let noteX of sortedNotes) {
    if (nextId < noteX.idnr) break;
    nextId = noteX.idnr + 1;
  }
  return nextId;
}
function noteListeners() {
  const noteEntrysEl = document.querySelectorAll(".saved-note");
  noteEntrysEl.forEach((noteEntry) => {
    noteEntry.addEventListener("click", (e) => {
      document.getElementById("title").value = noteEntry.querySelector(".title-history").innerText;

      easyMDE.value(noteEntry.querySelector(".text-history").innerText);

      note.idnr = Number(noteEntry.id);

      highlightActivNote(noteEntry);
    });
  });
}
function highlightActivNote(noteEntry) {
  const currentActive = document.querySelector(".saved-note.selected-note");

  if (currentActive && currentActive !== noteEntry) {
    currentActive.classList.remove("selected-note");
  }

  if (noteEntry) {
    if (!noteEntry.classList.contains("selected-note")) {
      noteEntry.classList.add("selected-note");
    }
  }
}
function createNewNote() {
  const inputField = document.getElementById("title");

  inputField.value = "";
  easyMDE.value("");

  note = {
    idnr: null,
    title: "",
    text: "",
    date: null,
  };
  highlightActivNote();
}
function deleteNote() {
  const existingIndex = notes.findIndex((n) => n.idnr === note.idnr);
  if (existingIndex !== -1) {
    notes.splice(existingIndex, 1);

    document.getElementById(note.idnr)?.remove();

    saveDataLocalStorage();
    createNewNote();
  }
}

function searchNote() {
  const noteContainer = document.getElementById("saved-note-container");
  const searchField = document.querySelector(".search");
  const query = searchField.value.toLowerCase();

  noteContainer.innerHTML = "";

  for (let i = 0; i < notes.length; i++) {
    const currentNote = notes[i];

    const noteTitle = (currentNote.title || "").toLowerCase();
    const noteText = (currentNote.text || "").toLowerCase();

    if (noteTitle.includes(query) || noteText.includes(query)) {
      const noteHtml = buildNewNote(currentNote);

      noteContainer.append(noteHtml);
    }
  }

  noteListeners();
}
