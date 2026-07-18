function formatNotes(text){


if(!text){

return "No notes available.";

}


// Remove extra spaces

let formatted =
text.replace(/\s+/g," ");


// Split into sentences

let sentences =
formatted.split(".")
.filter(sentence => sentence.trim());



let result = "";



sentences.forEach(sentence=>{


let clean =
sentence.trim();



clean =
clean.charAt(0).toUpperCase()
+
clean.slice(1);



result +=
"• "
+
clean
+
".\n\n";


});



return result;


}