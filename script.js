// ===============================
// Navigation
// ===============================

const searchInput =
document.getElementById("searchInput");


if(searchInput){

searchInput.addEventListener(
"input",
function(){

displaySavedNotes();

});

}



function showPage(page){


const pages =
document.querySelectorAll(".page");


pages.forEach(p=>{

p.classList.add("hidden");

});


document
.getElementById(page)
.classList.remove("hidden");


}


// ===============================
// Elements
// ===============================


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



let imageFile = null;





// ===============================
// Upload Image
// ===============================


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


});





// ===============================
// OCR Conversion
// ===============================


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
message.progress*100
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


});






// ===============================
// Format Notes
// ===============================


formatBtn.addEventListener(
"click",
function(){


output.value =
formatNotes(output.value);


});







// ===============================
// Save Notes
// ===============================


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
document
.getElementById("folderSelect")
.value;

saveNote(

title || "Untitled Note",

folder,

output.value

);



status.innerText =
"Note saved!";



displaySavedNotes();

displayRecentNotes();



});






// ===============================
// Study Tools
// ===============================


const studyBtn =
document.getElementById("studyBtn");


const studyGuide =
document.getElementById("studyGuide");



studyBtn.addEventListener(
"click",
function(){


studyGuide.innerText =
createStudyGuide(output.value);


});





const flashcardBtn =
document.getElementById("flashcardBtn");


const flashcards =
document.getElementById("flashcards");



flashcardBtn.addEventListener(
"click",
function(){


flashcards.innerText =
createFlashcards(output.value);


});






const quizBtn =
document.getElementById("quizBtn");


const quiz =
document.getElementById("quiz");



quizBtn.addEventListener(
"click",
function(){


quiz.innerText =
createQuiz(output.value);


});







// ===============================
// Saved Notes Display
// ===============================


const savedNotes =
document.getElementById("savedNotes");



function displaySavedNotes(){


const search =
searchInput.value
.toLowerCase();

const notes =
getNotes().filter(note=>{

return(

note.title.toLowerCase().includes(search)

||

note.folder.toLowerCase().includes(search)

||

note.content.toLowerCase().includes(search)

||

note.tags.join(" ")
.toLowerCase()
.includes(search)

);

});


if(notes.length===0){


savedNotes.innerText =
"No saved notes.";


return;


}



savedNotes.innerHTML = "";



notes.forEach(
(note,id)=>{



const card =
document.createElement("div");


card.className =
"note-card";



card.innerHTML = `

<h3>
📘 ${note.title}
</h3>


<p>📁 ${note.folder}</p>

<p>Created: ${note.created}</p>

<p>Edited: ${note.edited}</p>

<p>${note.content.length} characters</p>


<div class="card-buttons">


<button onclick="openNote(${note.id})">

📖 Open

</button>



<button onclick="renameSavedNote(${note.id})">

✏ Rename

</button>



<button onclick="deleteNote(${note.id})">

🗑 Delete

</button>


</div>

`;



savedNotes.appendChild(card);



}

);


}








// ===============================
// Recent Notes
// ===============================


function displayRecentNotes(){


const recent =
document.getElementById("recentNotes");



const notes =
getNotes();



if(notes.length===0){


recent.innerText =
"No saved notes yet.";


return;


}



recent.innerHTML = "";



notes
.slice(-3)
.reverse()
.forEach(
(note)=>{


const id =
notes.idOf(note);



const card =
document.createElement("div");



card.className =
"note-card";



card.style.cursor =
"pointer";



card.innerHTML = `

<h3>
📘 ${note.title}
</h3>

<p>
${note.created}
</p>

`;



card.onclick =
function(){


openNote(note.id);


};



recent.appendChild(card);



}

);


}







// ===============================
// Open Note
// ===============================


window.openNote =
function(id){


const notes =
getNotes();



const note =

getNoteById(id);



noteTitle.value =
note.title;



output.value =
note.content;



showPage("scanner");



status.innerText =
"Opened saved note.";



};








// ===============================
// Delete Note
// ===============================


window.deleteNote =
function(id){


removeNote(id);



displaySavedNotes();

displayRecentNotes();



};







// ===============================
// Rename Note
// ===============================


window.renameSavedNote =
function(id){


const notes =
getNotes();



const newTitle =
prompt(

"Enter a new title:",

notes[id].title

);



if(
newTitle &&
newTitle.trim() !== ""
){


window.renameSavedNote =
function(id){


const note =
getNoteById(id);



const newTitle =
prompt(
"Enter a new title:",
note.title
);



if(
newTitle &&
newTitle.trim() !== ""
){


note.title =
newTitle.trim();


note.edited =
new Date().toLocaleString();



updateNote(
id,
note
);



displaySavedNotes();

displayRecentNotes();


}

}



}


};







// ===============================
// Start App
// ===============================


displaySavedNotes();

displayRecentNotes();

showPage("home");