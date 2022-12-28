import songid from './js.js'

let sid = songid;
let artist = document.getElementById("artists");
let oSongList = document.getElementById("oSongList");
let songCreaters = document.getElementById("songCreaters");
let sTForDetails = document.getElementById("sTForDetails");
let masterplay = document.getElementById("masterplay");
let previousplay = document.getElementById("previousplay");
let forwardplay = document.getElementById("forwardplay");
let myprogressbar = document.getElementById("myprogressbar");
let playdp = document.getElementById("playdp");
let ttl = document.getElementById("ttl");
let playbttn = document.getElementById("playbttn");

let xhr = new XMLHttpRequest();

xhr.open('GET', '../json/songs.json', true);

xhr.onload = function () {

    let data = JSON.parse(this.responseText);
    let title = data[sid].title;
    let image = data[sid].image;

    document.getElementById('songtitle').innerHTML = title;
    let dp = document.getElementById("dp");
    dp.setAttribute("src", image);

    let artistlength = data[sid].artists.length;
    let oMusics = data[sid].oMusics;
    let oSongLength = Object.keys(oMusics).length;

    //for artist data...
    for (let i = 0; i < artistlength; i++) {
        let newartist = document.createElement("li");
        newartist.innerHTML = `<li>${data[sid].artists[i]}</li>`;

        artist.appendChild(newartist);
    }
    // console.log();
    //for other songs data..........
    let str = "";
    let sindex = 6;
    if (oSongLength == 0) {
        document.getElementById("oSL").style.display = "none";
    }// <img src="${(oMusics[Object.keys(oMusics)[j]])[0]}" alt=""
                                    // style="height: 3rem; width:3rem; margin-right:2rem ;margin-left: 1rem;">
                                    //     ${Object.keys(oMusics)[j]}
    else {
        for (let j = 0; j < oSongLength; j++) {
            let newelem = `<li class="d-flex">
                                  <img class="col-lg-1" src="${(oMusics[Object.keys(oMusics)[j]])[0]}" alt=""
                                  style="height: 3.5rem; border-radius: 3rem;">
                                  <p class="col-lg-8">${Object.keys(oMusics)[j]}</p>
                                  <i style="cursor: pointer; margin-left: 12.4rem; padding-top: 1rem;" id="${sindex}" class="col-lg-1 fa-sharp songitemplay fa-2x fa-solid fa-circle-play"></i>
                                </li>`;

            str += newelem;
            sindex++;
            // oSongList.appendChild(newoSongs)
        }

        oSongList.innerHTML = str;
    }

    //for song creaters details.........
    sTForDetails.innerHTML = data[sid].title;
    songCreaters.innerHTML = `<tr>
                                <td>Album/Movie</td>
                                <td>${data[sid].musicDetails[0]}</td>
                              </tr>
                              <tr>
                                <td>Singers</td>
                                <td>${data[sid].musicDetails[1]}</td>
                              </tr>
                              <tr>
                                <td>Music Composer</td>
                                <td>${data[sid].musicDetails[2]}</td>
                              </tr>
                              <tr>
                                <td>Lyricist</td>
                                <td>${data[sid].musicDetails[3]}</td>
                              </tr>
                              <tr>
                                <td>Language</td>
                                <td>${data[sid].musicDetails[4]}</td>
                              </tr>
                              <tr>
                                <td>Music Company</td>
                                <td>${data[sid].musicDetails[5]}</td>
                              </tr>
                              <tr>
                                <td>Duration</td>
                                <td>${data[sid].musicDetails[6]}</td>
                              </tr>`;


const range = document.querySelector('.range')
const thumb = document.querySelector('.thumb')
const track = document.querySelector('.track-inner')

const updateSlider = (value) => {
  thumb.style.left = `${value}%`
  thumb.style.transform = `translate(-${value}%, -50%)`
  track.style.width = `${value}%`
}

range.oninput = (e) =>
  updateSlider(e.target.value)

 // Init value
//........................................................

let currentsongtitle = data[sid].title;
let currentsongurl = String(data[sid].music);

playdp.src = String(data[sid].image);
ttl.innerHTML = currentsongtitle;

let audioElement = new Audio(currentsongurl);

masterplay.addEventListener("click",()=>{
  if(audioElement.paused || audioElement.currentTime<=0){
    audioElement.play();
    masterplay.classList.remove("fa-play-circle");
    masterplay.classList.add("fa-pause-circle");
    // makecurrentpause();
  }
  else{
    audioElement.pause();
    masterplay.classList.remove("fa-pause-circle");
    masterplay.classList.add("fa-play-circle");
    makeAllPlays();
  }
})


audioElement.addEventListener("timeupdate",()=>{
  let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
  updateSlider(progress);
})

myprogressbar.addEventListener("change",()=>{
  audioElement.currentTime = ((myprogressbar.value*audioElement.duration)/100);
})

document.getElementById("playbttn0").addEventListener("click",(e)=>{
  audioElement.src = data[sid].music;
  audioElement.play();
  e.target.parentElement.href="#musicbar";masterplay.classList.remove("fa-play-circle");
  masterplay.classList.add("fa-pause-circle");
  playdp.src = data[sid].image;
  ttl.innerHTML = data[sid].title;
  playbttn.innerHTML = "pause";
  document.getElementById("sDuration").innerHTML =  data[sid].musicDetails[6];
  
})

playbttn.addEventListener("click",()=>{
  if(Array.from(masterplay.classList).includes("fa-pause-circle")){
    playbttn.innerHTML = "play";
    audioElement.pause();
    masterplay.classList.remove("fa-pause-circle");
    masterplay.classList.add("fa-play-circle");
  }
  else{
    playbttn.innerHTML = "pause";
    audioElement.play();
    masterplay.classList.remove("fa-play-circle");
    masterplay.classList.add("fa-pause-circle");
  }
  
})

masterplay.addEventListener("click",()=>{
  if(Array.from(masterplay.classList).includes("fa-pause-circle")){
    playbttn.innerHTML = "pause"
  }
  else{
    playbttn.innerHTML = "play"
  }

})

//..............time of music.........
document.getElementById("sDuration").innerHTML =  data[sid].musicDetails[6];

const makeAllPlays = ()=>{
  Array.from(document.getElementsByClassName("songitemplay")).forEach((element)=>{   
    element.classList.remove("fa-pause-circle");
    element.classList.add("fa-play-circle");
  })
}

Array.from(document.getElementsByClassName("songitemplay")).forEach((element)=>{

  element.addEventListener('click',(e)=>{
    makeAllPlays();
    playbttn.innerHTML = "pause";
    let index = parseInt(e.target.id);
    let i1 = index;
    if(index>5){
      playdp.src = String(`../oSongs/${data[sid].moviename}/${index}.jpg`);
    }
    else{
      playdp.src = String(`../images/trending/dp/${index}.jpg`);
    }
    ttl.innerHTML = element.parentElement.children[1].innerHTML;
    e.target.classList.remove("fa-play-circle");
    e.target.classList.add("fa-pause-circle");
    if(index>5){
      audioElement.src = `../oSongs/${data[sid].moviename}/${index}.mp3`;
    }
    else{
      audioElement.src = `../images/trending/songs/${index}.mp3`;
    }
    
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove("fa-play-circle");
    masterplay.classList.add("fa-pause-circle");
    // if(index==1){
    //   sDuration.innerHTML = "1:53"
    // }
    switch(index){
      case 1:
        sDuration.innerHTML = "1:53";
      break;

      case 2:
        sDuration.innerHTML = "5:56";
      break;

      case 3:
        sDuration.innerHTML = "2:38";
      break;

      case 4:
        sDuration.innerHTML = "3:58";
      break;

      case 5:
        sDuration.innerHTML = "4:23";
      break;

      default :
      sDuration.innerHTML = "3:47";
      break;
    }
  })
})

let arr1 = sid.split("song");
let soindex = arr1[1];
let newsid = "";
// let findex = 6;
// let lindex = Number(sindex)-1;
previousplay.addEventListener("click",()=>{
  if(soindex<=1){
    soindex = 12;
    newsid = "song" + soindex;
  }
  else{
    newsid = "song" + (soindex-1);
    soindex--;
  }
  audioElement.src = data[newsid].music;
  playdp.src = data[newsid].image;
  ttl.innerHTML = data[newsid].title;
  audioElement.play();
  masterplay.classList.remove("fa-play-circle");
  masterplay.classList.add("fa-pause-circle");
});

forwardplay.addEventListener("click",()=>{
  if(soindex>=12){
    soindex = 1;
    newsid = "song" + soindex;
  }
  else{
    newsid = "song" + (soindex+1);
    soindex++;
  }
  audioElement.src = data[newsid].music;
  playdp.src = data[newsid].image;
  ttl.innerHTML = data[newsid].title;
  audioElement.play();
  masterplay.classList.remove("fa-play-circle");
  masterplay.classList.add("fa-pause-circle");
});

// const makecurrentpause = ()=>{
//   console.log(document.getElementById("i"))
// }


}



xhr.send();
// console.log(document.getElementById("artists").children[0])

//........................................................

