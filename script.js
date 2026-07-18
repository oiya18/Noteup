const imageInput = document.getElementById("imageInput");

const preview = document.getElementById("preview");

const convertBtn = document.getElementById("convertBtn");

const output = document.getElementById("output");

const status = document.getElementById("status");


let imageFile;



imageInput.addEventListener("change", function(){

imageFile = imageInput.files[0];


if(imageFile){

const imageURL = URL.createObjectURL(imageFile);

preview.src = imageURL;

preview.style.display="block";

status.innerText="Image uploaded!";

}

});





convertBtn.addEventListener("click", async function(){


if(!imageFile){

alert("Please upload a note image first!");

return;

}



status.innerText="Reading notes...";

output.value="";



const result = await Tesseract.recognize(

imageFile,

"eng",

{

logger: function(message){

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



output.value=result.data.text;


status.innerText="Finished!";


});