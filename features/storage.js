function saveNote(title, folder, content){

    let notes = getNotes();

    const now = new Date().toLocaleString();

    notes.push({

        id: Date.now(),

        title: title,

        folder: folder,

        tags: [],

        favorite: false,

        created: now,

        edited: now,

        content: content

    });

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

}



function getNotes(){

    const notes =
        JSON.parse(localStorage.getItem("notes")) || [];

    return notes.map(note=>({

        id: note.id || Date.now() + Math.random(),

        title: note.title || "Untitled Note",

        folder: note.folder || "General",

        tags: note.tags || [],

        favorite: note.favorite || false,

        created: note.created || note.date || "Unknown",

        edited: note.edited || note.date || "Unknown",

        content: note.content || ""

    }));

}


function removeNote(id){

let notes = getNotes();

notes = notes.filter(

note=>note.id!==id

);

localStorage.setItem(

"notes",

JSON.stringify(notes)

);

}


function renameNote(index,newTitle){

    let notes = getNotes();

    notes[index].title = newTitle;

    notes[index].edited =
        new Date().toLocaleString();

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

}

function getNoteById(id){

return getNotes().find(

note=>note.id===id

);

}
function updateNote(id,newNote){

let notes = getNotes();

notes = notes.map(note=>

note.id===id

?

newNote

:

note

);

localStorage.setItem(

"notes",

JSON.stringify(notes)

);

}