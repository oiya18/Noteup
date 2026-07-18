function formatNotes(text){

if(!text){

return "No notes available.";

}


// Normalize line endings

let cleaned =
text.replace(/\r/g,"").trim();



// Put numbered points on separate lines

cleaned =
cleaned.replace(
/\s+(\d+\.)\s*/g,
"\n$1 "
);



// Put bullets on separate lines

cleaned =
cleaned.replace(
/\s+([-•])\s*/g,
"\n• "
);



// Split into lines

let lines =
cleaned
.split("\n")
.map(line=>line.trim())
.filter(line=>line.length>0);



let result = "";



let currentPoint = "";



lines.forEach(line=>{


// Numbered point detected

if(/^\d+\./.test(line)){


// Save previous point

if(currentPoint){

result += currentPoint + "\n\n";

}


// Start new point

currentPoint = line;


}


// Bullet detected

else if(line.startsWith("•")){


if(currentPoint){

result += currentPoint + "\n";

currentPoint="";

}


result +=
"• "
+
line.substring(1).trim()
+
"\n";


}


// Normal continuation

else{


if(currentPoint){

currentPoint +=
" "
+
line;

}

else{


result +=
line
+
" ";


}


}


});



// Add remaining numbered point

if(currentPoint){

result +=
currentPoint;

}



// Clean extra spaces

result =
result
.replace(
/ {2,}/g,
" "
)
.replace(
/\n{3,}/g,
"\n\n"
)
.trim();



return result;

}