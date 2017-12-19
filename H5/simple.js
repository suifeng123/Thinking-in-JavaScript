//此处有一个
//document.getElementById('applecode').innerText = "sadfsadf";
function updateUI(){
   var imgs = document.getElementsByTagName('img');
   for(var i = 0,len=imgs.length; i < len ; i++){
       imgs[i].title = document.title + " image " + i;
   }

   var msg = document.getElementById('msg');
   msg.innerHTML = "Update complete";
}

