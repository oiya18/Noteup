function formatNotes(text){

if(!text){

return "No notes available.";

}


// Keep original structure

let cleaned =
text
.replace(/\r/g,"")
.trim();



// Detect numbered points

cleaned =
cleaned.replace(
/\s+(\d+\.)\s*/g,
"\n\n$1 "
);



// Detect bullet points

cleaned =
cleaned.replace(
/\s+[-•]\s*/g,
"\n• "
);



// Split lines

let lines =
cleaned
.split("\n")
.map(line=>line.trim())
.filter(line=>line.length>0);



let result = "";

let currentNumber = "";



lines.forEach(line=>{


// Numbered item

if(/^\d+\./.test(line)){


if(currentNumber){

result += currentNumber.trim()
+
"\n\n";

}


currentNumber = line;


}


// Bullet item

else if(line.startsWith("•")){


if(currentNumber){

result += currentNumber.trim()
+
"\n\n";

currentNumber="";


}


result +=
line
+
"\n";



}


// Continuation text

else{


if(currentNumber){


currentNumber +=
" "
+
line;


}

else{


result +=
line
+
"\n";


}


}


});



// Add final numbered item

if(currentNumber){

result +=
currentNumber.trim();

}



// Capitalize beginnings

let finalText =
result
.split("\n")
.map(line=>{


if(
line.length>0 &&
!line.startsWith("•") &&
!/^\d+\./.test(line)
){

return (
line.charAt(0).toUpperCase()
+
line.slice(1)
);

}


return line;


})
.join("\n");




// Clean excessive spacing

finalText =
finalText
.replace(
/[ ]{2,}/g,
" "
)
.replace(
/\n{3,}/g,
"\n\n"
)
.trim();



return finalText;


}