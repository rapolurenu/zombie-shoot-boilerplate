// Iteration 1: Declare variables required for this game
let game_Body=document.getElementById("game-body");
let _lives=document.getElementById("lives");
let timein_secs=document.getElementById("timer").textContent;
let zombie_ids=0;
const zombies_imgs=[
    "zombie-1.png",
    "zombie-2.png",
    "zombie-3.png",
    "zombie-4.png",
    "zombie-5.png",
    "zombie-6.png"
]

// Iteration 1.2: Add shotgun sound
const shotgun_Audio = new Audio("./assets/shotgun.wav");
shotgun_Audio.volume = 0.5;
game_Body.onclick=()=>{
    shotgun_Audio.pause();
    shotgun_Audio.currentTime=0;
    shotgun_Audio.play();
}

// Iteration 1.3: Add background sound
let background_sound = new Audio("./assets/bgm.mp3");
background_sound.play();
background_sound.loop=true;

// Iteration 1.4: Add lives
const maxlives = 4;
let lives=4;

// Iteration 2: Write a function to make a zombie
function making_zombie(zombie_ids){
    let zombieImg=document.createElement("img");
    let randomIndex=Math.floor(Math.random()*6);
    zombieImg.src=`./assets/${zombies_imgs[randomIndex]}`
    zombieImg.setAttribute("class","zombie-image");
    zombieImg.setAttribute("id",`${zombie_ids}`);
    document.body.append(zombieImg)
    
    let randomleftProp=get_randomint(20,80);
    zombieImg.style.left=`${randomleftProp}vw`
    zombieImg.onclick=()=>{
        destroy_zombie(zombieImg);
    }
    zombie_ids++; 

}

// Iteration 3: Write a function to check if the player missed a zombie
function check_player(zombie){
    if(zombie.getBoundingClientRect().top<=0){
        lives--;
        return true;
    }else{
        return false;
    }
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function destroy_zombie(zombie){
    zombie.style.display="none";
    zombie_ids++;
    making_zombie(zombie_ids);
}


// Iteration 5: Creating timer
let timer=setInterval(()=>{
    timein_secs--;
    document.getElementById("timer").textContent=timein_secs;
    let zombie=document.getElementById(zombie_ids);
    if(check_player(zombie)){
        destroy_zombie(zombie);
    }
        if(lives==0){
            clearInterval(timer);
            location.href="./game-over.html";
        }
        console.log(timein_secs)
        if(timein_secs==0){
            location.href="./win.html";
        }
},1000);

// Iteration 6: Write a code to start the game by calling the first zombie
making_zombie(zombie_ids);

// Iteration 7: Write the helper function to get random integer
function get_randomint(min,max){
    min=Math.ceil(min);
    max=Math.floor(max);
    let random_int=Math.floor(Math.random()*(max-min)+min);
    return random_int;
}
