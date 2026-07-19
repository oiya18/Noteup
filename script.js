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



// Elements

const imageInput =
document.getElementById("imageInput");


const preview =
document.getElementById("preview");


const convertBtn =
document.getElementById("convertBtn");


const output =
document.getElementById("output");


const status =
document.getElementById("status");


const saveBtn =
document.getElementById("saveBtn");



let imageFile = null;




// Upload image

imageInput.addEventListener("change", function(){


imageFile =
imageInput.files[0];


if(imageFile){


preview.src =
URL.createObjectURL(imageFile);


preview.style.display="block";


status.innerText =
"Image uploaded!";


}


});





// OCR

convertBtn.addEventListener("click", async function(){


if(!imageFile){

alert("Please upload an image first!");

return;

}



status.innerText =
"Reading notes...";


output.value="";



const result =
await Tesseract.recognize(

imageFile,

"eng",

{

logger:function(message){


if(message.status==="recognizing text"){


status.innerText =
"Progress: "
+
Math.round(message.progress*100)
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


});





// Format notes

const formatBtn =
document.getElementById("formatBtn");


formatBtn.addEventListener("click",function(){


output.value =
formatNotes(output.value);


});





// Save notes

saveBtn.addEventListener("click",function(){


if(output.value.trim()===""){


alert("There are no notes to save!");

return;


}



const title =
document
.getElementById("noteTitle")
.value
.trim();

saveNote(

title || "Untitled Note",

output.value

);


status.innerText =
"Note saved!";


displaySavedNotes();


});





// Study Guide

const studyBtn =
document.getElementById("studyBtn");


const studyGuide =
document.getElementById("studyGuide");



studyBtn.addEventListener("click",function(){


studyGuide.innerText =
createStudyGuide(output.value);


});





// Flashcards

const flashcardBtn =
document.getElementById("flashcardBtn");


const flashcards =
document.getElementById("flashcards");



flashcardBtn.addEventListener("click",function(){


flashcards.innerText =
createFlashcards(output.value);


});





// Quiz

const quizBtn =
document.getElementById("quizBtn");


const quiz =
document.getElementById("quiz");



quizBtn.addEventListener("click",function(){


quiz.innerText =
createQuiz(output.value);


});





// Saved Notes

const savedNotes =
document.getElementById("savedNotes");



function displaySavedNotes(){


const notes =
getNotes();



if(notes.length===0){


savedNotes.innerText =
"No saved notes.";


return;


}



savedNotes.innerHTML="";



notes.forEach((note,index)=>{


const card =
document.createElement("div");


card.className =
"note-card";


card.innerHTML = `

<h3>📘 ${note.title}</h3>

<p>${note.date}</p>

<pre>${note.content}</pre>

<button onclick="renameSavedNote(${index})">
✏ Rename
</button>

<button onclick="deleteNote(${index})">
🗑 Delete
</button>

`;

savedNotes.appendChild(card);


});


}



displaySavedNotes();

displayRecentNotes();
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



recent.innerHTML="";



notes
.slice(-3)
.reverse()
.forEach((note)=>{


const card =
document.createElement("div");


card.className =
"note-card";


card.innerText =
"📘 " + note.title

"\n\n"

note.date;



recent.appendChild(card);



});


}

window.deleteNote = function(index){

removeNote(index);

displaySavedNotes();

displayRecentNotes();

}

window.renameSavedNote = function(index){

const notes = getNotes();

const newTitle = prompt(
"Enter a new title:",
notes[index].title
);

if(newTitle && newTitle.trim() !== ""){

renameNote(index,newTitle.trim());

displaySavedNotes();

displayRecentNotes();

}

}