function saveNote(title,text) {


let notes =
JSON.parse(
localStorage.getItem("notes")
)
|| [];



notes.push({

title:title,

date:
new Date().toLocaleString(),

content:text

});



localStorage.setItem(
"notes",
JSON.stringify(notes)

);


}





function getNotes(){


return JSON.parse(
localStorage.getItem("notes")
)
|| [];


}
function deleteNote(index){

let notes =
getNotes();

notes.splice(index,1);

localStorage.setItem(

"notes",

JSON.stringify(notes)

);

}