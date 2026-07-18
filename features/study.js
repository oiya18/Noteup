function createStudyGuide(text){


if(!text){

return "No notes available.";

}



const sentences =
text.split(".")
.filter(sentence => sentence.trim().length > 20);



let guide = "";



guide += "⭐ Important Ideas\n\n";



sentences.slice(0,5).forEach(sentence=>{


guide += "• " 
+ sentence.trim()
+ ".\n";


});



return guide;


}