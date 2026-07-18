function formatNotes(text){


if(!text){

return "No notes available.";

}


// Normalize spaces

let formatted =
text
.replace(/\r/g," ")
.replace(/\s+/g," ")
.trim();



// Add spacing before numbered items

formatted =
formatted.replace(
/(\d+\.)/g,
"\n\n$1"
);



// Split into pieces

let parts =
formatted
.split("\n")
.filter(line => line.trim());



let result = "";



parts.forEach(part=>{


let line =
part.trim();



//
// Numbered list
//

if(/^\d+\./.test(line)){


result +=
line
+
"\n\n";


}


//
// Bullet list
//

else if(line.startsWith("-")){


result +=
"• "
+
line.substring(1).trim()
+
"\n";


}


//
// Normal sentence
//

else{


line =
line.charAt(0).toUpperCase()
+
line.slice(1);



result +=
line
+
"\n\n";


}



});



return result.trim();


}