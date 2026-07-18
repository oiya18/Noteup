function createQuiz(text){


if(!text){

return "No notes available.";

}



const sentences =
text.split(".")
.filter(sentence => sentence.trim().length > 20);



let quiz="";



sentences.slice(0,5).forEach((sentence,index)=>{


quiz +=

(index+1)
+
". Explain this concept:\n\n"
+
sentence.trim()
+
"\n\n";


quiz +=
"Your answer:\n\n";


quiz +=
"____________________\n\n";


});



return quiz;


}