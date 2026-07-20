// ========================================
// NoteUp v2.0
// Storage Manager
// ========================================


const STORAGE_KEY = "noteup_notes";


// ========================================
// Get All Notes
// ========================================

function getNotes(){

    const notes =
        JSON.parse(
            localStorage.getItem(STORAGE_KEY)
        );

    if(!notes){

        return [];

    }


    return notes;

}




// ========================================
// Save Notes Array
// ========================================

function saveNotes(notes){

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(notes)

    );

}




// ========================================
// Create New Note
// ========================================

function saveNote(title, folder, content){


    const notes =
        getNotes();


    const now =
        new Date().toLocaleString();



    const newNote = {


        id:
        crypto.randomUUID(),


        title:
        title || "Untitled Note",


        folder:
        folder || "General",


        tags:
        [],


        favorite:
        false,


        created:
        now,


        edited:
        now,


        content:
        content || ""

    };



    notes.unshift(newNote);



    saveNotes(notes);



    return newNote;

}






// ========================================
// Find Note By ID
// ========================================

function getNoteById(id){


    return getNotes().find(

        note =>
        note.id === id

    );


}







// ========================================
// Update Note
// ========================================

function updateNote(id, updates){


    const notes =
        getNotes();



    const index =
        notes.findIndex(

            note =>
            note.id === id

        );



    if(index === -1){

        return;

    }



    notes[index] = {


        ...notes[index],


        ...updates,


        edited:
        new Date().toLocaleString()


    };



    saveNotes(notes);


}








// ========================================
// Rename Note
// ========================================

function renameNote(id,newTitle){


    updateNote(

        id,

        {

            title:
            newTitle

        }

    );

}







// ========================================
// Delete Note
// ========================================

function removeNote(id){


    const notes =
        getNotes().filter(

            note =>
            note.id !== id

        );



    saveNotes(notes);


}







// ========================================
// Toggle Favorite
// ========================================

function toggleFavorite(id){


    const note =
        getNoteById(id);



    if(!note){

        return;

    }



    updateNote(

        id,

        {

            favorite:
            !note.favorite

        }

    );


}







// ========================================
// Search Notes
// ========================================

function searchNotes(query){


    query =
    query
    .toLowerCase()
    .trim();



    if(query === ""){

        return getNotes();

    }



    return getNotes().filter(note=>{


        return (

            note.title
            .toLowerCase()
            .includes(query)



            ||

            note.folder
            .toLowerCase()
            .includes(query)



            ||

            note.content
            .toLowerCase()
            .includes(query)



            ||

            note.tags
            .join(" ")
            .toLowerCase()
            .includes(query)


        );


    });


}







// ========================================
// Get All Folders
// ========================================

function getFolders(){


    const folders =

    getNotes()

    .map(

        note =>
        note.folder

    );



    return [

        ...new Set(folders)

    ];


}







// ========================================
// Add Tag
// ========================================

function addTag(id,tag){


    const note =
    getNoteById(id);



    if(!note){

        return;

    }



    if(
        !note.tags.includes(tag)
    ){

        note.tags.push(tag);

    }



    updateNote(

        id,

        {

            tags:
            note.tags

        }

    );


}







// ========================================
// Remove Tag
// ========================================

function removeTag(id,tag){


    const note =
    getNoteById(id);



    if(!note){

        return;

    }



    note.tags =
    note.tags.filter(

        t =>
        t !== tag

    );



    updateNote(

        id,

        {

            tags:
            note.tags

        }

    );


}
