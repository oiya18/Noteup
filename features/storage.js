function saveNote(text){


let notes =
JSON.parse(
localStorage.getItem("notes")
)
|| [];



notes.push({

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