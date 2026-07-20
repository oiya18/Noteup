// ========================================
// NoteUp v2.0
// Main Script
// Part 1/3
// ========================================



// ========================================
// Navigation
// ========================================


function showPage(page){


    const pages =
    document.querySelectorAll(".page");


    pages.forEach(p=>{

        p.classList.add("hidden");

    });



    const selected =
    document.getElementById(page);



    if(selected){

        selected.classList.remove("hidden");

    }


}






// ========================================
// Elements
// ========================================


const imageInput =
document.getElementById("imageInput");


const preview =
document.getElementById("preview");


const convertBtn =
document.getElementById("convertBtn");


const formatBtn =
document.getElementById("formatBtn");


const saveBtn =
document.getElementById("saveBtn");


const output =
document.getElementById("output");


const status =
document.getElementById("status");


const noteTitle =
document.getElementById("noteTitle");


const folderSelect =
document.getElementById("folderSelect");



let imageFile = null;



// Used when editing later

let currentNoteId = null;








// ========================================
// Upload Image
// ========================================


if(imageInput){


imageInput.addEventListener(

"change",

function(){


    imageFile =
    imageInput.files[0];



    if(imageFile){


        preview.src =
        URL.createObjectURL(imageFile);



        preview.style.display =
        "block";



        status.innerText =
        "Image uploaded!";


    }


}


);


}








// ========================================
// OCR Conversion
// ========================================


if(convertBtn){


convertBtn.addEventListener(

"click",

async function(){



    if(!imageFile){


        alert(
        "Please upload an image first!"
        );


        return;


    }




    status.innerText =
    "Reading notes...";



    output.value = "";




    try{


        const result =

        await Tesseract.recognize(


            imageFile,


            "eng",


            {


            logger:function(message){



                if(

                message.status ===

                "recognizing text"

                ){


                    status.innerText =

                    "Progress: "

                    +

                    Math.round(

                    message.progress * 100

                    )

                    +

                    "%";


                }


            }


            }


        );



        output.value =
        result.data.text;



        status.innerText =
        "Finished!";


    }



    catch(error){


        console.log(error);


        status.innerText =
        "OCR failed.";


    }



}


);


}









// ========================================
// Format Notes
// ========================================


if(formatBtn){


formatBtn.addEventListener(

"click",

function(){


    output.value =

    formatNotes(

        output.value

    );


}


);


}








// ========================================
// Save Notes
// ========================================


if(saveBtn){


saveBtn.addEventListener(

"click",

function(){



    if(output.value.trim()===""){


        alert(

        "There are no notes to save!"

        );


        return;


    }




    const title =

    noteTitle.value.trim();



    const folder =

    folderSelect.value;





    // Editing existing note

    if(currentNoteId){



        updateNote(

            currentNoteId,


            {


            title:
            title || "Untitled Note",



            folder:
            folder,



            content:
            output.value


            }


        );



        status.innerText =
        "Note updated!";



    }



    else{



        saveNote(

            title || "Untitled Note",

            folder,

            output.value


        );



        status.innerText =
        "Note saved!";


    }



    currentNoteId = null;


    displaySavedNotes();

    displayRecentNotes();



}


);


}








// ========================================
// Study Tools
// ========================================


const studyBtn =
document.getElementById("studyBtn");


const studyGuide =
document.getElementById("studyGuide");



if(studyBtn){


studyBtn.addEventListener(

"click",

function(){


    studyGuide.innerText =

    createStudyGuide(

        output.value

    );


}


);


}







const flashcardBtn =
document.getElementById("flashcardBtn");


const flashcards =
document.getElementById("flashcards");



if(flashcardBtn){


flashcardBtn.addEventListener(

"click",

function(){


    flashcards.innerText =

    createFlashcards(

        output.value

    );


}


);


}







const quizBtn =
document.getElementById("quizBtn");


const quiz =
document.getElementById("quiz");



if(quizBtn){


quizBtn.addEventListener(

"click",

function(){


    quiz.innerText =

    createQuiz(

        output.value

    );


}


);


}
// ========================================
// NoteUp v2.0
// Saved Notes System
// Part 2/3
// ========================================




// ========================================
// Saved Notes Elements
// ========================================


const savedNotes =
document.getElementById("savedNotes");


const searchInput =
document.getElementById("searchInput");






// ========================================
// Display Saved Notes
// ========================================


function displaySavedNotes(){


    if(!savedNotes){

        return;

    }




    let notes;



    if(searchInput && searchInput.value.trim() !== ""){


        notes =
        searchNotes(
            searchInput.value
        );


    }


    else{


        notes =
        getNotes();


    }





    if(notes.length === 0){


        savedNotes.innerHTML =

        "<p>No saved notes.</p>";


        return;


    }






    savedNotes.innerHTML = "";






    notes.forEach(note=>{



        const card =

        document.createElement("div");



        card.className =
        "note-card";






        card.innerHTML = `



        <h3>

        ${note.favorite ? "⭐" : "📘"}

        ${note.title}

        </h3>



        <p>

        📁 ${note.folder}

        </p>



        <p>

        Created:

        ${note.created}

        </p>



        <p>

        Edited:

        ${note.edited}

        </p>



        <p>

        ${note.content.length}

        characters

        </p>




        <div class="card-buttons">



        <button class="open-btn">

        📖 Open

        </button>




        <button class="rename-btn">

        ✏ Rename

        </button>



<button class="move-btn">

📁 Move

</button>

        <button class="favorite-btn">

        ${note.favorite ? "☆ Unfavorite" : "⭐ Favorite"}

        </button>





        <button class="delete-btn">

        🗑 Delete

        </button>



        </div>



        `;








        const openBtn =

        card.querySelector(".open-btn");



        openBtn.onclick = function(){


            openNote(note.id);


        };







        const renameBtn =

        card.querySelector(".rename-btn");



        renameBtn.onclick = function(){


            renameSavedNote(note.id);


        };







        const deleteBtn =

        card.querySelector(".delete-btn");



        deleteBtn.onclick = function(){


            deleteNote(note.id);


        };





const moveBtn =
card.querySelector(".move-btn");


moveBtn.onclick=function(){


    changeNoteFolder(note.id);


};


        const favoriteBtn =

        card.querySelector(".favorite-btn");



        favoriteBtn.onclick = function(){


            toggleFavorite(note.id);



            displaySavedNotes();


            displayRecentNotes();


        };






        savedNotes.appendChild(card);



    });



}









// ========================================
// Live Search
// ========================================


if(searchInput){


searchInput.addEventListener(

"input",

function(){


    displaySavedNotes();


}


);


}








// ========================================
// Recent Notes
// ========================================


function displayRecentNotes(){



    const recent =

    document.getElementById(
        "recentNotes"
    );



    if(!recent){

        return;

    }





    const notes =
    getNotes();




    if(notes.length === 0){



        recent.innerHTML =

        "No saved notes yet.";



        return;


    }






    recent.innerHTML = "";







    notes

    .slice(0,3)

    .forEach(note=>{





        const card =

        document.createElement("div");



        card.className =
        "note-card";



        card.style.cursor =
        "pointer";





        card.innerHTML = `



        <h3>

        ${note.favorite ? "⭐" : "📘"}

        ${note.title}

        </h3>



        <p>

        📁 ${note.folder}

        </p>



        `;







        card.onclick = function(){


            openNote(note.id);


        };





        recent.appendChild(card);



    });



}









// ========================================
// Open Note
// ========================================


function openNote(id){



    const note =

    getNoteById(id);



    if(!note){

        return;

    }






    noteTitle.value =

    note.title;





    folderSelect.value =

    note.folder;





    output.value =

    note.content;





    currentNoteId =

    note.id;






    showPage(
        "scanner"
    );





    status.innerText =

    "Editing saved note.";



}









// ========================================
// Delete Note
// ========================================


function deleteNote(id){



    const confirmDelete =

    confirm(

    "Delete this note?"

    );



    if(!confirmDelete){

        return;

    }





    removeNote(id);




    displaySavedNotes();

    displayRecentNotes();



}









// ========================================
// Rename Note
// ========================================


function renameSavedNote(id){



    const note =

    getNoteById(id);



    if(!note){

        return;

    }






    const newTitle =

    prompt(

    "New title:",

    note.title

    );







    if(

    newTitle &&

    newTitle.trim() !== ""

    ){



        renameNote(

            id,

            newTitle.trim()

        );



        displaySavedNotes();

        displayRecentNotes();


    }



}






// ========================================
// Initial Load
// ========================================


displaySavedNotes();

displayRecentNotes();
// ========================================
// NoteUp v2.0
// Final Connections
// Part 3/3
// ========================================





// ========================================
// Auto Save Draft
// ========================================


function saveDraft(){


    const draft = {


        title:

        noteTitle.value,


        folder:

        folderSelect.value,


        content:

        output.value,


        saved:

        new Date().toLocaleString()


    };



    localStorage.setItem(

        "noteup_draft",

        JSON.stringify(draft)

    );


}







function loadDraft(){



    const draft =

    JSON.parse(

        localStorage.getItem(
            "noteup_draft"
        )

    );



    if(!draft){

        return;

    }





    if(

    draft.content &&

    confirm(

    "Restore unfinished note draft?"

    )

    ){



        noteTitle.value =

        draft.title || "";



        folderSelect.value =

        draft.folder || "General";



        output.value =

        draft.content;



        status.innerText =

        "Draft restored.";



    }



}








// Auto save while typing


if(output){


output.addEventListener(

"input",

function(){


    saveDraft();


}

);


}






if(noteTitle){


noteTitle.addEventListener(

"input",

function(){


    saveDraft();


}

);


}







// ========================================
// Clear Scanner
// ========================================


function clearScanner(){



    if(imageInput){

        imageInput.value = "";

    }




    if(preview){

        preview.src = "";

        preview.style.display =
        "none";

    }





    if(output){

        output.value = "";

    }





    if(noteTitle){

        noteTitle.value = "";

    }





    currentNoteId = null;



    imageFile = null;



    status.innerText =

    "Waiting for image...";



}








// ========================================
// Keyboard Shortcut
// Ctrl + S Save
// ========================================


document.addEventListener(

"keydown",

function(event){



    if(

    event.ctrlKey &&

    event.key === "s"

    ){



        event.preventDefault();



        if(saveBtn){

            saveBtn.click();

        }


    }



}

);








// ========================================
// Home Statistics
// ========================================


function updateHomeStats(){



    const notes =

    getNotes();



    const totalNotes =

    document.getElementById(
        "totalNotes"
    );



    if(totalNotes){

        totalNotes.innerText =
        notes.length;

    }




}









// ========================================
// Rename App Title
// ========================================


document.title =
"NoteUp";






// ========================================
// Start Application
// ========================================


window.onload = function(){



    showPage(
        "home"
    );



    displaySavedNotes();


    displayRecentNotes();


    loadDraft();


    updateHomeStats();



};

// ========================================
// NoteUp v2.1
// Folder System
// ========================================



const folderList =
document.getElementById("folderList");


const newFolderInput =
document.getElementById("newFolderInput");


const createFolderBtn =
document.getElementById("createFolderBtn");




// Display folders

// ========================================
// NoteUp v2.1
// Folder System Final
// ========================================



function displayFolders(){


    if(!folderList){

        return;

    }



    const folders =
    getFolders();



    folderList.innerHTML = "";



    folders.forEach(folder=>{


        const count =

        getNotes().filter(

            note =>

            note.folder === folder

        ).length;



        const container =

        document.createElement("div");



        container.className =
        "folder-card";



        container.innerHTML = `


        <button class="folder-open">

        📁 ${folder}

        (${count})

        </button>


        ${
            folder !== "General"

            ?

            `<button class="folder-delete">
            
            🗑

            </button>`

            :

            ""

        }


        `;





        container

        .querySelector(".folder-open")

        .onclick=function(){


            filterByFolder(folder);


        };





        if(folder !== "General"){


            container

            .querySelector(".folder-delete")

            .onclick=function(){


                deleteFolder(folder);



                displayFolders();


                displaySavedNotes();


                updateFolderDropdown();



            };


        }




        folderList.appendChild(container);



    });


}






// ========================================
// Move Note Folder
// ========================================


function changeNoteFolder(id){


    const folders =
    getFolders();



    const choice =

    prompt(

    "Move to folder:\n\n"

    +

    folders.join("\n")

    );



    if(

    choice &&

    folders.includes(choice)

    ){


        moveNoteToFolder(

            id,

            choice

        );



        displaySavedNotes();


        displayRecentNotes();


    }


}



// Create folder button

if(createFolderBtn){


createFolderBtn.addEventListener(

"click",

function(){


    const name =
    newFolderInput.value.trim();



    if(name===""){

        return;

    }



    createFolder(name);



    newFolderInput.value = "";



    updateFolderDropdown();


    displayFolders();


});


}






// Filter notes by folder

function filterByFolder(folder){


    const notes =

    getNotes().filter(

        note=>

        note.folder === folder

    );



    savedNotes.innerHTML = "";



    notes.forEach(note=>{


        const card =

        document.createElement("div");



        card.className =
        "note-card";



        card.innerHTML = `

        <h3>
        📘 ${note.title}
        </h3>

        <p>
        📁 ${note.folder}
        </p>

        <button>
        📖 Open
        </button>

        `;



        card.querySelector("button")

        .onclick=function(){

            openNote(note.id);

        };



        savedNotes.appendChild(card);



    });


}







// Update scanner folder dropdown

function updateFolderDropdown(){


    if(!folderSelect){

        return;

    }



    const folders =
    getFolders();



    folderSelect.innerHTML = "";



    folders.forEach(folder=>{


        const option =
        document.createElement("option");



        option.value =
        folder;



        option.innerText =
        folder;



        folderSelect.appendChild(option);


    });



}







// Start folders

displayFolders();

updateFolderDropdown();