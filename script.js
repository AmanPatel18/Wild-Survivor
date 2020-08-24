score=0;       //game score
cross=true;     // to check whther avatar has crossed obstacle

audio_bk=new Audio('music.mp3');           // to play background music
audio_shout = new Audio('gameover.mp3');    // to play sound while game over
fail=new Audio('Fail.mp3');

// to play the background music after 100 mili seconds
setTimeout(() => {          
    audio_bk.play()
}, 100);

// to check which key has been pressed
document.onkeydown=function(e){
    
    // check whether up arrow key has been pressed
    if(e.keyCode==38)
    {
        avatar=document.querySelector('.avatar');
        avatar.classList.add('avatarJump');
        setTimeout(function(){
            avatar.classList.remove('avatarJump');
        },700);
    }

    // check whether right arrow key has been pressed
    if(e.keyCode==39){
        avatar = document.querySelector('.avatar');
        avatarX=parseInt(window.getComputedStyle(avatar,null).getPropertyValue('left'));
        avatar.style.left=avatarX+112+"px";
    }

    // check whether left arrow key has been pressed
    if (e.keyCode == 37) {
        avatar = document.querySelector('.avatar');
        avatarX = parseInt(window.getComputedStyle(avatar, null).getPropertyValue('left'));
        avatar.style.left = (avatarX - 112) + "px"
    }
}
// time interval of 10 seconds to update the score
setInterval(() => {
    avatar=document.querySelector('.avatar');       //getting avatar class
    gameOver=document.querySelector('.gameOver');   //getting gameOver class
    obstacle=document.querySelector('.obstacle');  //getting obstacle class
    reload=document.querySelector('.reload');       // getting reload class

    // getting specific css properties of some classes
    ax=parseInt(window.getComputedStyle(avatar,null).getPropertyValue('left'));
    ay=parseInt(window.getComputedStyle(avatar, null).getPropertyValue('top'));
    ox=parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy=parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));
    
    // getting the difference between offsets of avatar and Obstacle
    offsetX=Math.abs(ax-ox);
    offsetY=Math.abs(ay-oy);
    
    if(offsetX<93 && offsetY<170){

        // updating the text of gameOver class        
        gameOver.innerHTML='Game Over';
        reload.innerHTML ="Reload to play again!";
       
        // stopping the obstacle to animate
        obstacle.classList.remove('obstacleAni');
       
        // starting the animation of avatar when it dies
        avatar.classList.add('avatarDied');
       
        // removing the avatar from on-screen when it dies after 0.8 seconds
        setTimeout(() => {
            avatar.classList.remove('avatar')
        },1800);
        

        // stop background music
        audio_bk.pause();

        // playing sound effect when avatar dies
        audio_shout.play();

        // playing fail song
        setTimeout(() => {
            fail.play();
        },500);

        // stopping the sound effect when game gets over after 1 second
        setTimeout(() => {
            audio_shout.pause();
        }, 1000);
    
    }

    else if(offsetX<93 && cross){
        // updating the score with 10
        score+=10;
        
        // calling function updateScore() to display score on the screen
        updateScore(score);
       
        // making cross false
        cross=false;
       
        // making cross true after 1 second 
        setTimeout(() => {
            cross=true;
        }, 1000);

        // increasing the speed of an obstacle 
        setTimeout(() => {
            aniDur = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
        }, 500);
    }
}, 10);

// displaying the score on the screen
function updateScore(score){
    scoreCount.innerHTML="Score:"+score;
}