// Global variable for the EasyMDE editor instance
let easyMDE;

// Object structure for a single note
let note = {
  idnr: null,
  title: "",
  text: "",
  date: null,
};

// Retrieve existing notes from local storage or initialize an empty array
const notes = getDataFromLocalstorage() || [];

/**
 * Handles the submission of a new or edited note, updates the array, and refreshes the UI.
 */
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
/**
 * Generates the HTML structure for a note card to be displayed in the history list.
 */
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

/**
 * Validates form fields and transfers input data into the global note object.
 */
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

/**
 * Prepends a generated note HTML element to the sidebar container.
 */
function displayNewNote(noteElement) {
  const noteContainerElement = document.getElementById("saved-note-container");
  noteContainerElement.prepend(noteElement);
}

/**
 * Initializes the application, sets up the text editor, and attaches basic event listeners.
 */
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

/**
 * Calculates and returns the next available unique ID for a new note.
 */
function getNextId() {
  const sortedNotes = notes.sort((noteA, noteB) => noteA.idnr - noteB.idnr);

  let nextId = 1;

  for (let noteX of sortedNotes) {
    if (nextId < noteX.idnr) break;
    nextId = noteX.idnr + 1;
  }
  return nextId;
}

/**
 * Attaches click event listeners to all note cards in the list to load them into the editor.
 */
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

/**
 * Toggles CSS classes to visually highlight the currently selected note card.
 */
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

/**
 * Clears the editor input fields and resets the global note object for a fresh entry.
 */
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

/**
 * Deletes the currently selected note from the array, DOM, and local storage.
 */
function deleteNote() {
  const existingIndex = notes.findIndex((n) => n.idnr === note.idnr);
  if (existingIndex !== -1) {
    notes.splice(existingIndex, 1);

    document.getElementById(note.idnr)?.remove();

    saveDataLocalStorage();
    createNewNote();
  }
}

/**
 * Filters and rerenders the notes list based on the search input query.
 */
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
