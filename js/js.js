let musics = document.getElementsByClassName("musics");

let arr = Array.from(musics)
let abc = "";

for (const element of arr) {
    
    element.addEventListener('click',(e)=>{
        var index = 'song' + String(arr.indexOf(element)+1);
        localStorage.setItem('id',index);
    })
    
}

let songid = localStorage.getItem('id');
// console.log(songid);

export default songid;


