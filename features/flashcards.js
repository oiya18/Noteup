function createFlashcards(text){


if(!text){

return "No notes available.";

}


const sentences =
text.split(".")
.filter(sentence => sentence.trim().length > 20);



let cards = "";



sentences.slice(0,5).forEach((sentence,index)=>{


cards += 
"Card " 
+ (index+1)
+ "\n\n";


cards +=
"Front:\nWhat is related to:\n"
+
sentence.trim()
+
"?\n\n";


cards +=
"Back:\n"
+
sentence.trim()
+
"\n\n";


cards +=
"----------------\n\n";


});


return cards;


}