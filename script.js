const imageInput =
document.getElementById("imageInput");


const preview =
document.getElementById("preview");


const convertBtn =
document.getElementById("convertBtn");


const copyBtn =
document.getElementById("copyBtn");


const downloadBtn =
document.getElementById("downloadBtn");


const clearBtn =
document.getElementById("clearBtn");


const output =
document.getElementById("output");


const status =
document.getElementById("status");



let imageFile = null;



// Upload image

imageInput.addEventListener("change", function(){


imageFile = imageInput.files[0];


if(imageFile){


preview.src =
URL.createObjectURL(imageFile);


preview.style.display="block";


status.innerText =
"Image uploaded!";


}


});





// OCR

convertBtn.addEventListener("click", async function(){


if(!imageFile){


alert("Please upload an image first!");

return;


}



status.innerText =
"Reading notes...";


output.value="";



const result =
await Tesseract.recognize(

imageFile,

"eng",

{

logger:function(message){


console.log(message);


if(message.status==="recognizing text"){


status.innerText =
"Progress: "
+
Math.round(message.progress*100)
+
"%";


}


}

}

);



output.value =
result.data.text;


status.innerText =
"Finished!";


});





// Copy text

copyBtn.addEventListener("click", function(){


if(output.value===""){

alert("No text to copy!");

return;

}



navigator.clipboard.writeText(output.value);


status.innerText =
"Copied!";


});





// Download text file

downloadBtn.addEventListener("click", function(){


if(output.value===""){

alert("No notes available!");

return;

}



const file =
new Blob(

[output.value],

{
type:"text/plain"
}

);



const link =
document.createElement("a");


link.href =
URL.createObjectURL(file);


link.download =
"my-notes.txt";


link.click();


});





// Clear everything

clearBtn.addEventListener("click", function(){


imageInput.value="";


preview.src="";


preview.style.display="none";


output.value="";


imageFile=null;


status.innerText =
"Waiting for image...";


});

const studyBtn =
document.getElementById("studyBtn");


const studyGuide =
document.getElementById("studyGuide");



studyBtn.addEventListener("click",function(){


const notes =
output.value;



studyGuide.innerText =
createStudyGuide(notes);



});