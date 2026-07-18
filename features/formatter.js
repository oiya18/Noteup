function formatNotes(text){


if(!text){

return "No notes available.";

}



// Keep line structure

let formatted =
text
.replace(/\r/g,"")
.trim();




// Fix numbered points

formatted =
formatted.replace(
/(\d+\.)/g,
"\n\n$1"
);




// Fix bullet symbols

formatted =
formatted.replace(
/[-•]/g,
"\n•"
);




// Split lines

let lines =
formatted
.split("\n")
.map(line=>line.trim())
.filter(line=>line.length>0);



let result = "";



lines.forEach(line=>{


// numbered list

if(/^\d+\./.test(line)){


result +=
line
+
"\n\n";


}


// bullet list

else if(line.startsWith("•")){


result +=
line
+
"\n";


}


// headings

else if(
line.length < 50 &&
line === line.toUpperCase()
){


result +=
"\n"
+
line
+
"\n\n";


}


// normal text

else{


line =
line.charAt(0).toUpperCase()
+
line.slice(1);



result +=
line
+
" ";


}



});




// Final cleanup

result =
result.replace(
/ +\n/g,
"\n"
);



result =
result.replace(
/\n{3,}/g,
"\n\n"
);



return result.trim();


}