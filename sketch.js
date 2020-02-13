////////////////////////////////////////////////////////////////////////////
////                      Ninja vs. Lego Zoombie                        ////
////                      ----------------------                        ////
////                                                                    ////
////                                                                    ////
////     controls:           UP                                         ////
////                         ^                                          ////
////                  LEFT <-|-> RIGHT         A= SWORD ATTACK          ////
////                         v                 (must be moving)         ////
////                        DOWN                                        ////
////                                                                    ////
////    Ninja only attacks when he is moving, and only kills when       ////
////                    the sword is swinging.                          ////
////////////////////////////////////////////////////////////////////////////


/* 1.Advanced graphics
I have made new frames to the characters to look as realistic as possible,
    first I thought it would look flicking, but P5 really make it smooth. 
 The difficulty was syncronize the movement with the commands, counting the frames
 If I had more time I could make it way better, with more frames and more realistic         //    characters.
 Learned how to make frames look like the character is moving, work with multiple frames.
 */


/*  2.Sound
I captured (recorded from the speaker source with a software, all digital) 
    the sound from youtube (all sounds are free) and then I edited and cut it the 
    parts I wanted.
Then I had to syncronized with the right movement.
Learned how capture sound, how edit it and how to play in the right movement of the
character and when stop it.
*/


/*  3.Platform
First I didn't like the way platform look on the program then I had the idea to integrate with      the tree which I think looked a lot better.
The difficulty was to make it part of all trees since all of the positions are randomized.
Learned how to control char over the floor_y 
*/

/*  4.Create enemies
Enemies was a little tricke to create and control, the zoombies walk until found a canyon then
    he turn and walk back.
Randomize the speed in every movement
The difficult was to make it difficult but not impossible.
Learned how interact with multiple object at the same time
*/

/*
I really enjoy make this game lot of fun. 
I just wishI had more time to make it better.
**** There's a "Easter egg" hope you found it ****

*/

//variables on startup
//game char position x,y absolute
var gameChar_x;
var gameChar_y;
//floor position
var floorPos_y;
//position when scrolling
var scrollPos;
//game char position x relative to the scroll position
var gameChar_world_x;
//char is turning left or right
var isLeft;
var isRight;
//char is falling
var isFalling;
//char is plummeting
var isPlummeting;
//tree objects
var trees_x;
//collectables objects
var collectables;
//mountains objects
var mountains;
//canyon objects
var canyons;
//game score, set value befor setup so the score remain when player die
var game_score=0;
//lives
var lives;
//zoombie object
var Zoombies;
//frames count right
var RightMoveCount;
//frames count left
var LeftMoveCount;
//frames count jumping right
var JumpingRightCount;
//frames count jumping left
var JumpingLeftCount;
//frames count jumping up
var JumpingCount;
//frames count waiting
var WaitingCount;
//set background for lighting effect
var BackGroundColor
//lighting duration
var Lightingtime;
//time stopped before hitting ground with sword
var StopTime
//frames count attacking right
var AttackRightCount;
//frames count attacking left
var AttackLeftCount;
//variable is attacking
var isAttacking;
//counting of zoombies
var zoombiesDrawCount;
//is gamming paused. Not count dead after game is over
var GamePause;
//platform objects
var platforms;

//collectables value
var collectables_val;
//zoombies value
var zoombie_val;
//canyon value
var canyon_val;

//Load background sound
function preload()
{
    soundFormats('mp3', 'ogg');
    backsound = loadSound('Sound/monster.mp3');
}

//setup
function setup()
{   
    //collectables value
    collectables_val=10;
    //zoombies value
    zoombie_val=14;
    //canyon val
    canyon_val=5;
    
    //load game sounds
    runsound= loadSound('Sound/laufen.mp3');
    springsound= loadSound('Sound/spring.mp3');
    waitingsound= loadSound('Sound/wait.mp3');
    sword= loadSound('Sound/schwert.mp3');
    
    //set volume for sounds
    backsound.setVolume(0.4);
    runsound.setVolume(0.8);
    sword.setVolume(1);
    waitingsound.setVolume(1);
    
    //looping background sound
    backsound.loop();
    
    //create Canvas, floor position
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
    
    //setting game lives
    lives=3;
    //setting variables as array
    Zoombies=[];
    platforms=[];
    
    //beginning variables value
    //counting frames
    RightMoveCount=1;
    LeftMoveCount=1;
    JumpingRightCount=1;
    JumpingLeftCount=1;
    JumpingCount=1;
    WaitingCount=1;
    AttackLeftCount=0;
    AttackRightCount=0;
    zoombiesDrawCount=0;
    
    //trees position
    trees_x=[460];
    
    //mountains position
    mountains=[100,150,650,980,1300,1800,2200,2600,2900,3200,3500,3900,4000];
    //clouds
    clouds=[];
    
    //initializing collectables object
    collectables = [];
    
    //flagpole
    flagpole={x_pos:3800,isReached:false};
    
    //canyons
    canyons=[{x_pos:-900,y_pos: floorPos_y,size: 300},{x_pos:flagpole.x_pos+100,y_pos: floorPos_y,size: 300}];
    

    
    //set background color lighting effect
    BackGroundColor=color(116,135,171);
    
    //setting lighting time
    Lightingtime=0;
    
    //stopped time
    StopTime=0;
    
    //counting stop time
    StopTimeCount=0;
    
    //is attacking
    isAttacking=false;
    
    //gamin paused?
    GamePause=false;
    
    //flagpole
    flagpole={x_pos:3800,isReached:false};
    //create cloud object randomized
    for(var i=-800;i<3600;i+=random(0,400))
        {
        var clau={
            x_pos:i,
            y_pos:40
            }
        clouds.push(clau);
        }

    //create canyon and trees, trees are close to canyons to avoid canyon impossible to jump throu randomized
    for (var i=0;i<canyon_val; i++)
    {
        canyons.push(createCanyons());
        trees_x.push(createTrees());
    }
    //create collectables randomized
    for (var i=0; i<collectables_val; i++)
    { 
        collectables.push(collectableCreate());  
    }
    
    //creating zoombies randomized
    for (var i=0;i<zoombie_val;i++)
    {
        Zoombies.push(new CreateZoombie(random(-800,3000)));
    }

    //creating platform linked to the trees
    for (var i=0;i<trees_x.length;i++)
    {
        platforms.push(CreatePlatforms(trees_x[i]+23,floorPos_y-90,60));    
    }
    
    //beginnig the game
    startGame();        
}

//creating canyon, it begin with one canyon to limit left walk randomized
function createCanyons()
{ 
    var can={x_pos:random (-800,3000),
             y_pos:floorPos_y,
             size: random(50,100)
    }
    return can
}

//creating trees, randomized
function createTrees()
{   
    trees_x.push(canyons[canyons.length-1].x_pos-70);
    trees_x.push(canyons[canyons.length-1].x_pos+canyons[canyons.length-1].size-10);
}

//creating collectables, randomized
function collectableCreate()
{ 
    var cole= {
        x_pos:random (-350,3000),
        y_pos:floorPos_y,
        size:random(10,14),
        isFound:false
        }
    for (var i=0; i<canyons.length;i++)
    { 
        if (cole.x_pos > canyons[i].x_pos && cole.x_pos < canyons[i].x_pos+canyons[i].size)
        {
            cole.x_pos=random(-700,3000);
            i-=1;
        }
    }
    return cole                   
}

//creating zoombies objects
function CreateZoombie(x)
{
    //setting color variables shirt, pants
    this.shirtcolor=undefined,
    this.pantscolor=undefined,
    
    //setting if the are active    
    this.active=true,
    
    //position of the frame 1,2,3   
    this.picpos=1,
    
    //position in the game    
    this.gameZoombie_x=undefined,
    
    //direction of the figure 
    this.dir=undefined,
    
    //setting in array objects zoombie
    this.setup= function(x)
    {
        this.shirtcolor=color(random(0,255),random(0,255),random(0,255));
        this.pantscolor=color(random(0,255),random(0,255),random(0,255));
        this.gameZoombie_x=x;
        this.dir=random(["left","right"])
    }
 
    //draw dead zoombies
    this.draw_dead= function()       
    {          
        stroke(1);
        strokeWeight(1);
        //head
        fill("red");    
        rect(this.gameZoombie_x+4,floorPos_y-17,7,2);
        rect(this.gameZoombie_x+1,floorPos_y-15,14,16,2,2,2,2);
        //arm
        fill(0,0,0);
        rect(this.gameZoombie_x+1,floorPos_y-5,4,4,4,4,0,0);
        fill("red");
        rect(this.gameZoombie_x+1,floorPos_y-12,4,4,1,1,2,2);
        rect(this.gameZoombie_x-12,floorPos_y-3,20,4,1,1,1,1)
        rect(this.gameZoombie_x-16,floorPos_y-4,4,6,1,1,2,2)
        rect(this.gameZoombie_x-13,floorPos_y-3,11.2,5);  
    }
    
    //draw "living" zoombies   
    this.draw= function()
    {
        //draw side (right or left) and frame position(1,2,3)
        if  (this.dir=="left" && this.picpos==1)
        {
            fill("lightgrey");
            stroke(1);
            strokeWeight(1);
            //head
            rect(this.gameZoombie_x+4,floorPos_y-74,7,2);
            rect(this.gameZoombie_x+1,floorPos_y-72,14,16,2,2,2,2);
            fill(0,0,0);
            rect(this.gameZoombie_x+1,floorPos_y-62,4,4,4,4,0,0);
            //eyes
            fill("red");
            rect(this.gameZoombie_x+1,floorPos_y-69,4,4,1,1,2,2);
            //eye ball
            fill("white");
            rect(this.gameZoombie_x+1,floorPos_y-68,2,2,1,1,2,2);
            fill(this.shirtcolor);
            rect(this.gameZoombie_x+2,floorPos_y-55,11,28,1,1,1,1);
            rect(this.gameZoombie_x-12,floorPos_y-53,20,4,1,1,1,1)
            rect(this.gameZoombie_x-16,floorPos_y-54,4,6,1,1,2,2)
            //pants
            fill(this.pantscolor);
            rect(this.gameZoombie_x+3,floorPos_y-27,9,24,1,1,1,1);
            rect(this.gameZoombie_x+1,floorPos_y-3,11.2,5);
            //legs
            beginShape();
            vertex(this.gameZoombie_x+3,floorPos_y-29);
            vertex(this.gameZoombie_x-8,floorPos_y-3);
            vertex(this.gameZoombie_x-2,floorPos_y-3);
            vertex(this.gameZoombie_x+3,floorPos_y-12);
            endShape();
            //foot
            rect(this.gameZoombie_x-13,floorPos_y-3,11.2,5);     
        }
        if  (this.dir=="right" && this.picpos==1)
        {
            fill("lightgrey");
            stroke(1);
            strokeWeight(1);
            rect(this.gameZoombie_x-16,floorPos_y-74,7,2);
            rect(this.gameZoombie_x-19,floorPos_y-72,14,16,2,2,2,2);
            fill(0,0,0);
            rect(this.gameZoombie_x-9,floorPos_y-62,4,4,4,4,0,0);
            fill("red");
            rect(this.gameZoombie_x-9,floorPos_y-69,4,4,1,1,2,2);
            fill("white");
            rect(this.gameZoombie_x-9,floorPos_y-68,2,2,1,1,2,2);
            fill(this.shirtcolor);
            rect(this.gameZoombie_x-18,floorPos_y-55,11,28,1,1,1,1);
            rect(this.gameZoombie_x-12,floorPos_y-53,20,4,1,1,1,1)
            rect(this.gameZoombie_x+7,floorPos_y-54,4,6,1,1,2,2)
            fill(this.pantscolor);
            rect(this.gameZoombie_x,floorPos_y-3,11.2,5);
            rect(this.gameZoombie_x-17,floorPos_y-27,9,24,1,1,1,1);
            beginShape(close);
            vertex(this.gameZoombie_x-18,floorPos_y-29);
            vertex(this.gameZoombie_x+2,floorPos_y-3);
            vertex(this.gameZoombie_x+9,floorPos_y-3);
            vertex(this.gameZoombie_x-8,floorPos_y-27);
            endShape();
            rect(this.gameZoombie_x-17,floorPos_y-3,11.2,5);  
        }
            if  (this.dir=="left" && this.picpos==2)
            {
                fill("lightgrey");
                stroke(1);
                strokeWeight(1);
                //head
                rect(this.gameZoombie_x+4,floorPos_y-74,7,2);
                rect(this.gameZoombie_x+1,floorPos_y-72,14,16,2,2,2,2);
                fill(0,0,0);
                rect(this.gameZoombie_x+1,floorPos_y-62,4,4,4,4,0,0);
                fill("red");
                rect(this.gameZoombie_x+1,floorPos_y-69,4,4,1,1,2,2);
                fill("white");
                rect(this.gameZoombie_x+1,floorPos_y-68,2,2,1,1,2,2);
                fill(this.shirtcolor);
                rect(this.gameZoombie_x+2,floorPos_y-55,11,28,1,1,1,1);
                rect(this.gameZoombie_x-12,floorPos_y-53,20,4,1,1,1,1)
                rect(this.gameZoombie_x-16,floorPos_y-54,4,6,1,1,2,2)
                fill(this.pantscolor);
                rect(this.gameZoombie_x+3,floorPos_y-26,8,24,1,1,1,1);
                rect(this.gameZoombie_x+1,floorPos_y-2,11.2,4);
            }
            if  (this.dir=="right" && this.picpos==2)
            {
                fill("lightgrey");
                stroke(1);
                strokeWeight(1);
                //head
                rect(this.gameZoombie_x-16,floorPos_y-74,7,2);
                rect(this.gameZoombie_x-19,floorPos_y-72,14,16,2,2,2,2);
                fill(0,0,0);
                rect(this.gameZoombie_x-9,floorPos_y-62,4,4,4,4,0,0);
                fill("red");
                rect(this.gameZoombie_x-9,floorPos_y-69,4,4,1,1,2,2);
                fill("white");
                rect(this.gameZoombie_x-9,floorPos_y-68,2,2,1,1,2,2);
                fill(this.shirtcolor);
                rect(this.gameZoombie_x-18,floorPos_y-55,11,28,1,1,1,1);
                rect(this.gameZoombie_x-12,floorPos_y-53,20,4,1,1,1,1)
                rect(this.gameZoombie_x+7,floorPos_y-54,4,6,1,1,2,2)
                fill(this.pantscolor);
                rect(this.gameZoombie_x-17,floorPos_y-26,8,24,1,1,1,1);
                rect(this.gameZoombie_x-17,floorPos_y-2,11.2,4);
            }
            if  (this.dir=="left" && this.picpos==3)
            {
                fill("lightgrey");
                stroke(1);
                strokeWeight(1);
                //head
                rect(this.gameZoombie_x+4,floorPos_y-74,7,2);
                rect(this.gameZoombie_x+1,floorPos_y-72,14,16,2,2,2,2);
                fill(0,0,0);
                rect(this.gameZoombie_x+1,floorPos_y-62,4,4,4,4,0,0);
                fill("red");
                rect(this.gameZoombie_x+1,floorPos_y-69,4,4,1,1,2,2);
                fill("white");
                rect(this.gameZoombie_x+1,floorPos_y-68,2,2,1,1,2,2);
                fill(this.shirtcolor);
                rect(this.gameZoombie_x+2,floorPos_y-55,11,28,1,1,1,1);
                rect(this.gameZoombie_x-12,floorPos_y-53,20,4,1,1,1,1)
                rect(this.gameZoombie_x-16,floorPos_y-54,4,6,1,1,2,2)
                fill(this.pantscolor);
                rect(this.gameZoombie_x+3,floorPos_y-27,9,24,1,1,1,1);
                rect(this.gameZoombie_x+1,floorPos_y-3,11.2,5);
                rect(this.gameZoombie_x-13,floorPos_y-6,11.2,4);
                beginShape();
                vertex(this.gameZoombie_x+3,floorPos_y-26);
                vertex(this.gameZoombie_x-8,floorPos_y-5);
                vertex(this.gameZoombie_x-2,floorPos_y-5);
                vertex(this.gameZoombie_x+13,floorPos_y-26);
                endShape();
            }
            if  (this.dir=="right" && this.picpos==3)
            {
                fill("lightgrey");
                stroke(1);
                strokeWeight(1);
                //head
                rect(this.gameZoombie_x-16,floorPos_y-74,7,2);
                rect(this.gameZoombie_x-19,floorPos_y-72,14,16,2,2,2,2);
                fill(0,0,0);
                rect(this.gameZoombie_x-9,floorPos_y-62,4,4,4,4,0,0);
                fill("red");
                rect(this.gameZoombie_x-9,floorPos_y-69,4,4,1,1,2,2);
                fill("white");
                rect(this.gameZoombie_x-9,floorPos_y-68,2,2,1,1,2,2);
                fill(this.shirtcolor);
                rect(this.gameZoombie_x-18,floorPos_y-55,11,28,1,1,1,1);
                rect(this.gameZoombie_x-12,floorPos_y-53,20,4,1,1,1,1)
                rect(this.gameZoombie_x+7,floorPos_y-54,4,6,1,1,2,2)
                fill(this.pantscolor);
                rect(this.gameZoombie_x-17,floorPos_y-27,9,24,1,1,1,1);
                rect(this.gameZoombie_x-17,floorPos_y-3,11.2,5);
                beginShape(close);
                vertex(this.gameZoombie_x-18,floorPos_y-26);
                vertex(this.gameZoombie_x+2,floorPos_y-5);
                vertex(this.gameZoombie_x+9,floorPos_y-5);
                vertex(this.gameZoombie_x-8,floorPos_y-26);
                endShape();
                rect(this.gameZoombie_x,floorPos_y-6,11.2,4);
            }
        }
    this.setup(x);
}

//P5 loop function
function draw()
{   
    //create zoombies and draw
    if(zoombiesDrawCount<15)
    {
        zoombiesDrawCount++
    }
    else
    {   
        for (var i=0;i<Zoombies.length;i++)
        { 
            if (Zoombies[i].active==true)       
            {
                push(Zoombies[i].picpos++)
                if (Zoombies[i].picpos>3)
                {
                    push(Zoombies[i].picpos=1);
                }
                if (Zoombies[i].dir=="right")
                {
                    for(var j=0; j< canyons.length;j++)
                    { 
                        if (dist(canyons[j].x_pos,floorPos_y,Zoombies[i].gameZoombie_x,floorPos_y)<25)
                        {   
                            push(Zoombies[i].dir="left");
                        }
                    }
                    push(Zoombies[i].gameZoombie_x+=random(1,20));
                }
                else
                {
                    for(var j=0; j< canyons.length;j++)
                    { 
                        if (dist(canyons[j].x_pos+canyons[j].size,floorPos_y,Zoombies[i].gameZoombie_x,floorPos_y)<25)
                        {   
                            push(Zoombies[i].dir="right");
                        }
                    }
                    push(Zoombies[i].gameZoombie_x-=random(1,20));    
                }
            Zoombies[i].draw();
            zoombiesDrawCount=0;
            }
        }
    }
    
    // lighting
    if  (BackGroundColor.levels[0]==255)
        {
            BackGroundColor=color(116,135,171);
            Lightingtime=0;
        }
    if (Lightingtime==0)
        {
            Lightingtime=frameCount+random(1,200);     
        }
     if (frameCount>=Lightingtime)
        {
            BackGroundColor=color(255, 255, 255);
        }
    background(BackGroundColor);
	noStroke();
    fill(35, 120, 84);
	rect(0, floorPos_y, width, height/4);
    push();
    translate(scrollPos, 0);
    drawClouds();
    drawMountains();
    drawTrees();
    for (var i=0;i<platforms.length;i++)
    {
        platforms[i].draw();        
    }
    for (var i=0;i<Zoombies.length;i++)
    {
        if (Zoombies[i].active==true)
        { 
            Zoombies[i].draw();
        }
        else
        {
            Zoombies[i].draw_dead();
        }   
    }
        
    //draw canyons 
    for (var i=0;i<canyons.length;i++)
    {        
        drawCanyon(canyons[i]);
        checkCanyon(canyons[i]);
    }
    
    //draw collectables
    for (var i=0; i < collectables.length; i++)
    {   
        checkCollectable(collectables[i]);
        drawCollectable(collectables[i]);    
    }
    
    //draw and check flagpole is reached
    renderFlagpole();
    checkFlagPole();
    pop();
    
    //write score and lives on screen
    textSize(40);
    fill(255, 102, 153);
    text("SCORE: "+game_score,150,50);
    text("LIVES: "+lives,550,50);
    //check flagpole is reach
	if (flagpole.isReached==false)
    {
        drawGameChar();
    }
    checkPlayerDie();
    //check if still lives, if not game over
    if (lives < 1)
    {   
        GamePause=true;
        textSize(45);
        fill(255, 0, 0);
        text("GAME OVER",400,height/2-40);
        textSize(30);
        text("PRESS SPACE TO CONTINUE",340,height/2)
        if (keyCode==32)
        {   
            game_score=0;
            setup();
        }
    }
    
    //check if flagpole is reached if it is Level complete
    if (flagpole.isReached)
    {   
        textSize(45);
        fill(0, 0, 255);
        text("LEVEL COMPLETE",350,height/2-40);
        textSize(30);
        text("PRESS SPACE TO CONTINUE",340,height/2)
        if (keyCode == 32)
        {
            setup();
            flagpole.isReached= false;
        }
    }
    
    //move char left
	if(isLeft)
	{
		if(gameChar_x > width * 0.2)
		{
			gameChar_x -= 5;
		}
		else
		{
			scrollPos += 5;
		}
	}
    
    //move char right
	if(isRight)
	{
		if(gameChar_x < width * 0.8)
		{
			gameChar_x  += 5;
		}
		else
		{
			scrollPos -= 5;
		}
	}
    
    //check if fall canyon
    if (gameChar_y < floorPos_y)
    {   
        var isContact= false; 
        for (var i=0; i< platforms.length; i++)
        {   
            if (platforms[i].checkcontact(gameChar_world_x,gameChar_y)==true)
            {
            isContact= true;
            isFalling = false;
                    break;
            }
        }
        if (isContact==false)  
        {
            gameChar_y +=3;
            isFalling = true;
        }
    }
        else
        {
            isFalling=false; 
        }
    
    //set char position with push and pop
	gameChar_world_x = gameChar_x - scrollPos;
}

//check key pressed
function keyPressed()
{   
    //go left check lives and flagpole.isreached if true no movements  
    runsound.pause();
    if (keyCode== 65 &&  lives > 0 && flagpole.isReached== false &&(isLeft== true || isRight== true))
    {
        sword.play();
        isAttacking = true; 
    }
    if (keyCode == 37 && lives > 0 && flagpole.isReached== false)
    {   
        isLeft = true;
        StopTime=0; 
    }
    //go right check lives and flagpole.isreached if true no movements
    if (keyCode == 39  && lives > 0 && flagpole.isReached== false)
    {
        isRight = true;
        StopTime=0; 
    }
    //jump check is Plummeting, lives and flagpole.isreached if true no movements or plummeting
    if (keyCode == 32 && isPlummeting== false && isFalling== false && flagpole.isReached== false)
    {   
        springsound.play();
        gameChar_y -=100;
        StopTime=0; 
    }
}

//stop moving left, right
function keyReleased()
{  
    if (keyCode == 37  && lives > 0 && flagpole.isReached== false)
    {   
        runsound.stop();
        isLeft = false;
        StopTime=0; 
        isAttacking=false;
    }
    if (keyCode== 39  && lives > 0)
    {  
        runsound.stop();
        isRight = false;
        StopTime=0; 
        isAttacking=false;
    }
}

//draw char postion left,right,jumping,attacking,plummeting all with 3 frames
function drawGameChar()
{ 
    if (isRight && isAttacking)
    {   
        if (AttackRightCount==32)
        {
            isAttacking=false;
            runsound.play();
        }
        if (AttackRightCount>32)
        {
            AttackRightCount=1;
        }
        else
        {
            AttackRightCount++;
        }
        if (AttackRightCount>=1 && AttackRightCount<=10)
        {
            fill(0,0,0);
            //head
            stroke(105,105,105);
            ellipse(gameChar_x+1,gameChar_y-57,18,18);      
            strokeWeight(4);
            line(gameChar_x+8,gameChar_y-60,gameChar_x+4,gameChar_y-60)
            fill(0,0,0);
            stroke(0);
            strokeWeight(1);
            //body
            rect(gameChar_x-4,gameChar_y-49,10,30);
            //left leg
            stroke(0,0,0);
            strokeWeight(5);
            line(gameChar_x-2,gameChar_y-20,gameChar_x+2,gameChar_y-10);
            line(gameChar_x,gameChar_y-9,gameChar_x-14,gameChar_y-7);
            //right leg
            line(gameChar_x+4,gameChar_y-19,gameChar_x+13,gameChar_y);
            //left arm
            line(gameChar_x+4,gameChar_y-45,gameChar_x+8,gameChar_y-52);
            //right arm
            line(gameChar_x+4,gameChar_y-38,gameChar_x+8,gameChar_y-52);
            strokeWeight(2);
            //sword
            stroke(192,192,192);
            line(gameChar_x+7,gameChar_y-51,gameChar_x-20,gameChar_y-75);
            line(gameChar_x+8,gameChar_y-53,gameChar_x+5,gameChar_y-50);
            strokeWeight(1);
            }
        if (AttackRightCount>=11 && AttackRightCount<=21)
        {
            fill(0,0,0);
            //head
            stroke(105,105,105);
            ellipse(gameChar_x+1,gameChar_y-57,18,18);      
            strokeWeight(4);
            line(gameChar_x+8,gameChar_y-60,gameChar_x+4,gameChar_y-60)
            fill(0,0,0);
            stroke(0);
            strokeWeight(1);
            //body
            rect(gameChar_x-4,gameChar_y-49,10,30);
            //left leg
            stroke(0,0,0);
            strokeWeight(5);
            line(gameChar_x-2,gameChar_y-20,gameChar_x-5,gameChar_y);
            //right leg
            line(gameChar_x+4,gameChar_y-19,gameChar_x+13,gameChar_y);
            //left arm
            line(gameChar_x+4,gameChar_y-45,gameChar_x+14,gameChar_y-54);
            //right arm
            line(gameChar_x+4,gameChar_y-38,gameChar_x+15,gameChar_y-52);
            strokeWeight(2);
            //sword
            stroke(192,192,192);
            line(gameChar_x+55,gameChar_y-54,gameChar_x+15,gameChar_y-54);
            line(gameChar_x+17,gameChar_y-56,gameChar_x+17,gameChar_y-60);
            strokeWeight(1);   
        }
        if (AttackRightCount>=22 && AttackRightCount<=32)
        {
            fill(0,0,0);
            //head
            stroke(105,105,105);
            ellipse(gameChar_x+1,gameChar_y-57,18,18);      
            strokeWeight(4);
            line(gameChar_x+8,gameChar_y-60,gameChar_x+4,gameChar_y-60)
            fill(0,0,0);
            stroke(0);
            strokeWeight(1);
            //body
            rect(gameChar_x-4,gameChar_y-49,10,30);
            //left leg
            stroke(0,0,0);
            strokeWeight(5);
            line(gameChar_x-2,gameChar_y-20,gameChar_x-5,gameChar_y);
            //right leg
            stroke(0,0,0);
            strokeWeight(5);
            line(gameChar_x-2,gameChar_y-20,gameChar_x+2,gameChar_y-10);
            line(gameChar_x,gameChar_y-9,gameChar_x-14,gameChar_y-7);
            //left arm
            line(gameChar_x+4,gameChar_y-45,gameChar_x+11,gameChar_y-30);
            //right arm
            line(gameChar_x+4,gameChar_y-38,gameChar_x+10,gameChar_y-32);
            strokeWeight(2);
            //sword
            stroke(192,192,192);
            line(gameChar_x+10,gameChar_y-32,gameChar_x+25,gameChar_y+3);
            line(gameChar_x+11,gameChar_y-34,gameChar_x+10,gameChar_y-38);
            strokeWeight(1);   
        }          
    }
    if (isLeft && isAttacking)
    {
        if (AttackLeftCount==32)
        {
            isAttacking=false;
            runsound.play();
        }
        if (AttackLeftCount>32)
        {
            AttackLeftCount=1;
        }
        else
        {
            AttackLeftCount++;
        }
        if (AttackLeftCount>=1 && AttackLeftCount<=10)
        {
            fill(0,0,0);
            //head
            stroke(105,105,105);
            ellipse(gameChar_x+1,gameChar_y-57,18,18);      
            strokeWeight(4);
            line(gameChar_x-6,gameChar_y-60,gameChar_x-3,gameChar_y-60)
            fill(0,0,0);
            stroke(0);
            strokeWeight(1);
            //body
            rect(gameChar_x-4,gameChar_y-49,10,30);
            //left leg
            stroke(0,0,0);
            strokeWeight(5);
            line(gameChar_x-2,gameChar_y-20,gameChar_x-10,gameChar_y-10);
            line(gameChar_x+5,gameChar_y-5,gameChar_x-10,gameChar_y-10);
            //right leg
            line(gameChar_x+4,gameChar_y-20,gameChar_x+7,gameChar_y);
            //left arm
            line(gameChar_x-4,gameChar_y-45,gameChar_x-1,gameChar_y-60);
            //right arm
            line(gameChar_x-4,gameChar_y-38,gameChar_x-5,gameChar_y-50);
            strokeWeight(2);
            //sword
            stroke(192,192,192);
            line(gameChar_x+25,gameChar_y-78,gameChar_x,gameChar_y-55);
            line(gameChar_x+5,gameChar_y-57,gameChar_x-2,gameChar_y-57);
            strokeWeight(1);   
        }
        if (AttackLeftCount>=11 && AttackLeftCount<=21)
        {
            fill(0,0,0);
            //head
            stroke(105,105,105);
            ellipse(gameChar_x+1,gameChar_y-57,18,18);      
            strokeWeight(4);
            line(gameChar_x-6,gameChar_y-60,gameChar_x-3,gameChar_y-60)
            fill(0,0,0);
            stroke(0);
            strokeWeight(1);
            //body
            rect(gameChar_x-4,gameChar_y-49,10,30);
            //left leg
            stroke(0,0,0);
            strokeWeight(5);
            line(gameChar_x-2,gameChar_y-20,gameChar_x-5,gameChar_y);
            //right leg
            line(gameChar_x+4,gameChar_y-20,gameChar_x+7,gameChar_y);
            //left arm
            line(gameChar_x-4,gameChar_y-45,gameChar_x-20,gameChar_y-50);
            //right arm
            line(gameChar_x-4,gameChar_y-38,gameChar_x-18,gameChar_y-50);
            strokeWeight(2);
            //sword
            stroke(192,192,192);
            line(gameChar_x-20,gameChar_y-50,gameChar_x-47,gameChar_y-50);
            line(gameChar_x-23,gameChar_y-54,gameChar_x-20,gameChar_y-50);
            strokeWeight(1);  
        }
        if (AttackLeftCount>=22 && AttackLeftCount<=32)
        {
            fill(0,0,0);
            //head
            stroke(105,105,105);
            ellipse(gameChar_x+1,gameChar_y-57,18,18);      
            strokeWeight(4);
            line(gameChar_x-6,gameChar_y-60,gameChar_x-3,gameChar_y-60)
            fill(0,0,0);
            stroke(0);
            strokeWeight(1);
            //body
            rect(gameChar_x-4,gameChar_y-49,10,30);
            //left leg
            stroke(0,0,0);
            strokeWeight(5);
            line(gameChar_x-2,gameChar_y-20,gameChar_x-10,gameChar_y);
            //right leg
            stroke(0,0,0);
            strokeWeight(5);
            line(gameChar_x-2,gameChar_y-20,gameChar_x-10,gameChar_y-10);
            line(gameChar_x+5,gameChar_y-5,gameChar_x-10,gameChar_y-10);
            //left arm
            line(gameChar_x-4,gameChar_y-45,gameChar_x-10,gameChar_y-30);
            //right arm
            line(gameChar_x-4,gameChar_y-38,gameChar_x-10,gameChar_y-30);
            strokeWeight(2);
            //sword
            stroke(192,192,192);
            line(gameChar_x-20,gameChar_y,gameChar_x-10,gameChar_y-30);
            line(gameChar_x-16,gameChar_y-28,gameChar_x-8,gameChar_y-26);
            strokeWeight(1);    
        }       
    } 
	if(isLeft && isFalling)
    {   
        if (JumpingLeftCount>21)
        {
            JumpingLeftCount=1;
        }
        else
        {
            JumpingLeftCount++;
        }
    if (JumpingLeftCount>=1 && JumpingLeftCount <=6)
    {
        //head
        fill(0,0,0);
        stroke(105,105,105);
        ellipse(gameChar_x-13,gameChar_y-57,18,18);
        strokeWeight(4);
        line(gameChar_x-20,gameChar_y-60,gameChar_x-16,gameChar_y-60)
        fill(0,0,0);
        stroke(0);
        strokeWeight(1);
        //body
        fill(0,0,0);
        beginShape();
        vertex(gameChar_x-3,gameChar_y-55);
        vertex(gameChar_x+21,gameChar_y-36);
        vertex(gameChar_x+15,gameChar_y-28);
        vertex(gameChar_x-12,gameChar_y-49);
        endShape(CLOSE);
        //arms
        stroke(95,95,95);
        strokeWeight(4);
        beginShape(LINES);
        vertex(gameChar_x+16,gameChar_y-32);
        vertex(gameChar_x,gameChar_y-38);
        vertex(gameChar_x,gameChar_y-38);
        vertex(gameChar_x-5,gameChar_y-24);
        endShape();
        //legs
        strokeWeight(4);
        beginShape(LINES);
        vertex(gameChar_x-4,gameChar_y-50);
        vertex(gameChar_x+2,gameChar_y-30);
        endShape();
        //sword
        stroke(192,192,192);
        strokeWeight(2);
        line(gameChar_x-2,gameChar_y-58,gameChar_x+23,gameChar_y-37);
        line(gameChar_x+2,gameChar_y-59,gameChar_x-2,gameChar_y-55);
    }
        if (JumpingLeftCount>=7 && JumpingLeftCount <=14)
        {
            fill(0,0,0);
            //head
            ellipse(gameChar_x+2,gameChar_y-10,18,18);
            stroke(105,105,105);
            strokeWeight(4);
            line(gameChar_x-1,gameChar_y-8,gameChar_x-5,gameChar_y-8)
            fill(0,0,0);
            stroke(0);
            strokeWeight(1);
            //body
            fill(0,0,0);
            beginShape();
            vertex(gameChar_x+8,gameChar_y-10);
            vertex(gameChar_x-2,gameChar_y-10);
            vertex(gameChar_x-2,gameChar_y-50);
            vertex(gameChar_x+9,gameChar_y-50);
            endShape(CLOSE);
            //legs
            stroke(95,95,95);
            strokeWeight(4);
            beginShape(LINES);
            vertex(gameChar_x-11,gameChar_y-27);
            vertex(gameChar_x+4,gameChar_y-47);
            vertex(gameChar_x-11,gameChar_y-46);
            vertex(gameChar_x-11,gameChar_y-27);
            endShape();
            //arms
            strokeWeight(4);
            beginShape(LINES);
            vertex(gameChar_x+4,gameChar_y-23);
            vertex(gameChar_x-12,gameChar_y-35);
            endShape();
            //sword
            stroke(192,192,192);
            strokeWeight(2);
            line(gameChar_x+12,gameChar_y-16,gameChar_x+12,gameChar_y-49);
            line(gameChar_x+15,gameChar_y-18,gameChar_x+9,gameChar_y-18);
            strokeWeight(1);
        }
        if (JumpingLeftCount>=15 && JumpingLeftCount <=22)
        {
            fill(0,0,0);
            //head
            stroke(105,105,105);
            ellipse(gameChar_x+16,gameChar_y-40,18,18);
            strokeWeight(4);
            line(gameChar_x+18,gameChar_y-47,gameChar_x+18,gameChar_y-42)
            fill(0,0,0);
            stroke(0);
            strokeWeight(1);
            //body
            fill(0,0,0);
            beginShape();
            vertex(gameChar_x-23,gameChar_y-45);
            vertex(gameChar_x-23,gameChar_y-33);
            vertex(gameChar_x+7,gameChar_y-33);
            vertex(gameChar_x+7,gameChar_y-45);
            endShape(CLOSE);
            //legs
            stroke(95,95,95);
            strokeWeight(4);
            beginShape(LINES);
            vertex(gameChar_x-4,gameChar_y-57);
            vertex(gameChar_x-21,gameChar_y-40);
            vertex(gameChar_x-4,gameChar_y-57);
            vertex(gameChar_x-21,gameChar_y-58);
            endShape();
            //arms
            strokeWeight(4);
            beginShape(LINES);
            vertex(gameChar_x-7,gameChar_y-56);
            vertex(gameChar_x+2,gameChar_y-40);
            endShape();
            //sword
            stroke(192,192,192);
            strokeWeight(2);
            line(gameChar_x+8,gameChar_y-29,gameChar_x-22,gameChar_y-29);
            line(gameChar_x+5,gameChar_y-27,gameChar_x+5,gameChar_y-31);
            strokeWeight(1);
        }
    }
	else if(isRight && isFalling)
    {   
        if (JumpingRightCount>21)
        {
            JumpingRightCount=1;
        }
        else
        {
            JumpingRightCount++;
        }
        if (JumpingRightCount>=1 && JumpingRightCount<=6)
        {
                //head
                fill(0,0,0);
                stroke(105,105,105);
                ellipse(gameChar_x+13,gameChar_y-57,18,18);
                strokeWeight(4);
                line(gameChar_x+20,gameChar_y-60,gameChar_x+16,gameChar_y-60)
                fill(0,0,0);
                stroke(0);
                strokeWeight(1);
                //body
                fill(0,0,0);
                beginShape();
                vertex(gameChar_x+3,gameChar_y-55);
                vertex(gameChar_x-21,gameChar_y-36);
                vertex(gameChar_x-15,gameChar_y-28);
                vertex(gameChar_x+12,gameChar_y-49);
                endShape(CLOSE);
                //arms
                stroke(95,95,95);
                strokeWeight(4);
                beginShape(LINES);
                vertex(gameChar_x-16,gameChar_y-32);
                vertex(gameChar_x,gameChar_y-38);
                vertex(gameChar_x,gameChar_y-38);
                vertex(gameChar_x+5,gameChar_y-24);
                endShape();
                //legs
                strokeWeight(4);
                beginShape(LINES);
                vertex(gameChar_x+4,gameChar_y-50);
                vertex(gameChar_x-2,gameChar_y-30);
                endShape();
                //sword
                stroke(192,192,192);
                strokeWeight(2);
                line(gameChar_x+2,gameChar_y-58,gameChar_x-23,gameChar_y-37);
                line(gameChar_x-2,gameChar_y-59,gameChar_x+2,gameChar_y-55);
                strokeWeight(1);
            }
            if (JumpingRightCount>=7 && JumpingRightCount<=14)
            {
                fill(0,0,0);
                //head
                ellipse(gameChar_x+2,gameChar_y-10,18,18);
                stroke(105,105,105);
                strokeWeight(4);
                line(gameChar_x-1,gameChar_y-8,gameChar_x-5,gameChar_y-8)
                fill(0,0,0);
                stroke(0);
                strokeWeight(1);
                //body
                fill(0,0,0);
                beginShape();
                vertex(gameChar_x+8,gameChar_y-10);
                vertex(gameChar_x-2,gameChar_y-10);
                vertex(gameChar_x-2,gameChar_y-50);
                vertex(gameChar_x+9,gameChar_y-50);
                endShape(CLOSE);
                //legs
                stroke(95,95,95);
                strokeWeight(4);
                beginShape(LINES);
                vertex(gameChar_x-11,gameChar_y-27);
                vertex(gameChar_x+4,gameChar_y-47);
                vertex(gameChar_x-11,gameChar_y-46);
                vertex(gameChar_x-11,gameChar_y-27);
                endShape();
                //arms
                strokeWeight(4);
                beginShape(LINES);
                vertex(gameChar_x+4,gameChar_y-23);
                vertex(gameChar_x-12,gameChar_y-35);
                endShape();
                //sword
                stroke(192,192,192);
                strokeWeight(2);
                line(gameChar_x+12,gameChar_y-16,gameChar_x+12,gameChar_y-49);
                line(gameChar_x+15,gameChar_y-18,gameChar_x+9,gameChar_y-18);
                strokeWeight(1);
            }
            if (JumpingRightCount>=15 && JumpingRightCount<=22)
            {
                fill(0,0,0);
                //head
                stroke(105,105,105);
                ellipse(gameChar_x-15,gameChar_y-40,18,18);
                strokeWeight(4);
                line(gameChar_x-17,gameChar_y-47,gameChar_x-17,gameChar_y-42)
                fill(0,0,0);
                stroke(0);
                strokeWeight(1);
                //body
                fill(0,0,0);
                beginShape();
                vertex(gameChar_x-6,gameChar_y-45);
                vertex(gameChar_x-7,gameChar_y-33);
                vertex(gameChar_x+24,gameChar_y-33);
                vertex(gameChar_x+24,gameChar_y-45);
                endShape(CLOSE);
                //legs
                stroke(95,95,95);
                strokeWeight(4);
                beginShape(LINES);
                vertex(gameChar_x+8,gameChar_y-57);
                vertex(gameChar_x+22,gameChar_y-40);
                vertex(gameChar_x+9,gameChar_y-57);
                vertex(gameChar_x+22,gameChar_y-58);
                endShape();
                //arms
                strokeWeight(4);
                beginShape(LINES);
                vertex(gameChar_x+11,gameChar_y-55);
                vertex(gameChar_x-3,gameChar_y-38);
                endShape();
                //sword
                stroke(192,192,192);
                strokeWeight(2);
                line(gameChar_x+23,gameChar_y-29,gameChar_x-7,gameChar_y-29);
                line(gameChar_x-4,gameChar_y-27,gameChar_x-4,gameChar_y-31);
                strokeWeight(1);
            }       
    }
	else if(isLeft)
    {   
        if (LeftMoveCount>21)
        {
            runsound.stop();
            LeftMoveCount=1;
            runsound.play();
        }
        else
        {
            LeftMoveCount++;
        } 
        if(LeftMoveCount>=1 && LeftMoveCount<=6 && isAttacking==false)
        {
            fill(0,0,0);
            //head
            stroke(105,105,105);
            ellipse(gameChar_x+1,gameChar_y-57,18,18);      
            strokeWeight(4);
            line(gameChar_x-6,gameChar_y-60,gameChar_x-3,gameChar_y-60)
            fill(0,0,0);
            stroke(0);
            strokeWeight(1);
            //body
            rect(gameChar_x-4,gameChar_y-49,10,30);
            //left leg
            stroke(0,0,0);
            strokeWeight(5);
            line(gameChar_x-2,gameChar_y-20,gameChar_x-10,gameChar_y);
            //right leg
            line(gameChar_x+4,gameChar_y-20,gameChar_x,gameChar_y-10);
            line(gameChar_x+12,gameChar_y-5,gameChar_x,gameChar_y-10);
            //left arm
            line(gameChar_x-4,gameChar_y-45,gameChar_x-20,gameChar_y-32);
            //right arm
            line(gameChar_x-4,gameChar_y-38,gameChar_x-18,gameChar_y-29);
            strokeWeight(2);
            //sword
            stroke(192,192,192);
            line(gameChar_x-8,gameChar_y-71,gameChar_x-20,gameChar_y-34);
            line(gameChar_x-23,gameChar_y-35,gameChar_x-18,gameChar_y-35);
            strokeWeight(1);
                    
        }
        if(LeftMoveCount>=7 && LeftMoveCount<=14 && isAttacking==false)
        {         
            //head
            fill(0,0,0);
            stroke(105,105,105);
            ellipse(gameChar_x+1,gameChar_y-57,18,18);      
            strokeWeight(4);
            line(gameChar_x-6,gameChar_y-60,gameChar_x-3,gameChar_y-60)
            //arms
            fill(0,0,0);
            stroke(0);
            strokeWeight(1);
            rect(gameChar_x-4,gameChar_y-49,10,30);
            //legs
            stroke(0,0,0);
            strokeWeight(5);
            line(gameChar_x-2,gameChar_y-20,gameChar_x-10,gameChar_y);
            line(gameChar_x+4,gameChar_y-20,gameChar_x+7,gameChar_y);
            line(gameChar_x-4,gameChar_y-45,gameChar_x-20,gameChar_y-32);
            line(gameChar_x-4,gameChar_y-38,gameChar_x-18,gameChar_y-29);
            strokeWeight(2);
            //sword
            stroke(192,192,192);
            line(gameChar_x-12,gameChar_y-71,gameChar_x-20,gameChar_y-34);
            line(gameChar_x-23,gameChar_y-35,gameChar_x-18,gameChar_y-35);
            strokeWeight(1);
        }
        if(LeftMoveCount>=15 && LeftMoveCount<=22 && isAttacking==false)
        {         
            fill(0,0,0);
            //head
            stroke(105,105,105);
            ellipse(gameChar_x+1,gameChar_y-57,18,18);      
            strokeWeight(4);
            line(gameChar_x-6,gameChar_y-60,gameChar_x-3,gameChar_y-60)
            fill(0,0,0);
            stroke(0);
            strokeWeight(1);
            //body
            rect(gameChar_x-4,gameChar_y-49,10,30);
            //left leg
            stroke(0,0,0);
            strokeWeight(5);
            line(gameChar_x-2,gameChar_y-20,gameChar_x-10,gameChar_y-10);
            line(gameChar_x+5,gameChar_y-5,gameChar_x-10,gameChar_y-10);
            //right leg
            line(gameChar_x+3,gameChar_y-20,gameChar_x+7,gameChar_y);
            //left arm
            line(gameChar_x-4,gameChar_y-45,gameChar_x-20,gameChar_y-32);
            //right arm
            line(gameChar_x-4,gameChar_y-38,gameChar_x-18,gameChar_y-29);
            strokeWeight(2);
            //sword
            stroke(192,192,192);
            line(gameChar_x-6,gameChar_y-71,gameChar_x-20,gameChar_y-34);
            line(gameChar_x-23,gameChar_y-35,gameChar_x-18,gameChar_y-35);
            strokeWeight(1);
        }
    }
	else if(isRight)
    {   
        if (RightMoveCount>21)
        {   
            runsound.stop()
            RightMoveCount=1;
            runsound.play();
        }
        else
        {
            RightMoveCount++;
        }
        if(RightMoveCount>=1 && RightMoveCount<=6 && isAttacking==false)
        {
            fill(0,0,0);
            //head
            stroke(105,105,105);
            ellipse(gameChar_x+1,gameChar_y-57,18,18);      
            strokeWeight(4);
            line(gameChar_x+8,gameChar_y-60,gameChar_x+4,gameChar_y-60)
            fill(0,0,0);
            stroke(0);
            strokeWeight(1);
            //body
            rect(gameChar_x-4,gameChar_y-49,10,30);
            //left leg
            stroke(0,0,0);
            strokeWeight(5);
            line(gameChar_x-2,gameChar_y-20,gameChar_x+2,gameChar_y-10);
            line(gameChar_x,gameChar_y-9,gameChar_x-14,gameChar_y-7);
            //right leg
            line(gameChar_x+4,gameChar_y-19,gameChar_x+13,gameChar_y);
            //left arm
            line(gameChar_x+4,gameChar_y-45,gameChar_x+20,gameChar_y-32);
            //right arm
            line(gameChar_x+4,gameChar_y-38,gameChar_x+18,gameChar_y-29);
            strokeWeight(2);
            //sword
            stroke(192,192,192);
            line(gameChar_x+10,gameChar_y-71,gameChar_x+20,gameChar_y-34);
            line(gameChar_x+23,gameChar_y-35,gameChar_x+18,gameChar_y-35);
            strokeWeight(1);
        }
        if(RightMoveCount>=7 && RightMoveCount<=14 && isAttacking==false)
        {
            fill(0,0,0);
            //head
            stroke(105,105,105);
            ellipse(gameChar_x+1,gameChar_y-57,18,18);      
            strokeWeight(4);
            line(gameChar_x+8,gameChar_y-60,gameChar_x+4,gameChar_y-60)
            fill(0,0,0);
            stroke(0);
            strokeWeight(1);
            //body
            rect(gameChar_x-4,gameChar_y-49,10,30);
            //left leg
            stroke(0,0,0);
            strokeWeight(5);
            line(gameChar_x-2,gameChar_y-20,gameChar_x-5,gameChar_y);
            //right leg
            line(gameChar_x+4,gameChar_y-19,gameChar_x+13,gameChar_y);
            //left arm
            line(gameChar_x+4,gameChar_y-45,gameChar_x+20,gameChar_y-32);
            //right arm
            line(gameChar_x+4,gameChar_y-38,gameChar_x+18,gameChar_y-29);
            strokeWeight(2);
            //sword
            stroke(192,192,192);
            line(gameChar_x+12,gameChar_y-71,gameChar_x+20,gameChar_y-34);
            line(gameChar_x+23,gameChar_y-35,gameChar_x+18,gameChar_y-35);
            strokeWeight(1);
        }
        if(RightMoveCount>=15 && RightMoveCount<=22 && isAttacking==false)
        {
            fill(0,0,0);
            //head
            stroke(105,105,105);
            ellipse(gameChar_x+1,gameChar_y-57,18,18);      
            strokeWeight(4);
            line(gameChar_x+8,gameChar_y-60,gameChar_x+4,gameChar_y-60)
            fill(0,0,0);
            stroke(0);
            strokeWeight(1);
            //body
            rect(gameChar_x-4,gameChar_y-49,10,30);
            //left leg
            stroke(0,0,0);
            strokeWeight(5);
            line(gameChar_x+2,gameChar_y-20,gameChar_x+10,gameChar_y-10);
            line(gameChar_x-5,gameChar_y-5,gameChar_x+10,gameChar_y-10);
            //right leg
            line(gameChar_x-2,gameChar_y-19,gameChar_x-6
                 ,gameChar_y);
            //left arm
            line(gameChar_x+4,gameChar_y-45,gameChar_x+20,gameChar_y-32);
            //right arm
            line(gameChar_x+4,gameChar_y-38,gameChar_x+18,gameChar_y-29);
            strokeWeight(2);
            //sword
            stroke(192,192,192);
            line(gameChar_x+10,gameChar_y-71,gameChar_x+20,gameChar_y-34);
            line(gameChar_x+23,gameChar_y-35,gameChar_x+18,gameChar_y-35);
            strokeWeight(1);   
        }

    }
	else if(isFalling || isPlummeting)
    {   
        if (JumpingCount>23)
        {
            JumpingCount=1;
        }
        else
        {
            JumpingCount++;
        }
        if (JumpingCount>=1 && JumpingCount<=7)
        {
            //head
            fill(0,0,0);
            stroke(105,105,105);
            ellipse(gameChar_x+1,gameChar_y-57,18,18);  
            strokeWeight(4);
            line(gameChar_x-5,gameChar_y-60,gameChar_x+6,gameChar_y-60)
            fill(0,0,0);
            stroke(0);
            strokeWeight(1);
            //body
            rect(gameChar_x-6,gameChar_y-49,13,30);
            stroke(95,95,95);
            strokeWeight(4);
            line(gameChar_x-7,gameChar_y-47,gameChar_x-2,gameChar_y-32);
            //left leg
            line(gameChar_x+7,gameChar_y-47,gameChar_x+2,gameChar_y-32);
            strokeWeight(2);
            strokeWeight(5);
            line(gameChar_x-4,gameChar_y-20,gameChar_x-5,gameChar_y-40);
            //right leg
            line(gameChar_x+5,gameChar_y-20,gameChar_x+5,gameChar_y-40);
            strokeWeight(1);
        }
        if (JumpingCount>=8 && JumpingCount<=15)
        {
            //head
            fill(0,0,0);
            stroke(105,105,105);
            ellipse(gameChar_x+1,gameChar_y-40,18,18);  
            strokeWeight(4);
            line(gameChar_x-5,gameChar_y-45,gameChar_x+6,gameChar_y-45)
            fill(0,0,0);
            stroke(0);
            strokeWeight(1);
            //body
            rect(gameChar_x-11,gameChar_y-36,24,10);
            //left arm
            stroke(95,95,95);
            strokeWeight(4);
            line(gameChar_x-14,gameChar_y-55,gameChar_x-10,gameChar_y-35);
            //right arm
            line(gameChar_x+23,gameChar_y-50,gameChar_x+13,gameChar_y-35);
            //left leg
            strokeWeight(5);
            line(gameChar_x-4,gameChar_y-28,gameChar_x-10,gameChar_y-11);
            //right leg
            line(gameChar_x+10,gameChar_y-10,gameChar_x+10,gameChar_y-27);
            strokeWeight(1);
        }
        if (JumpingCount>=16 && JumpingCount<=23)
            {
                fill(0,0,0);
                stroke(95,95,95);
                strokeWeight(4);
                line(gameChar_x-7,gameChar_y-47,gameChar_x-2,gameChar_y-32);
                //right arm
                line(gameChar_x+7,gameChar_y-47,gameChar_x+2,gameChar_y-32);
                strokeWeight(2);
                //left leg
                strokeWeight(5);
                line(gameChar_x-4,gameChar_y-20,gameChar_x-5,gameChar_y-40);
                //right leg
                line(gameChar_x+5,gameChar_y-20,gameChar_x+5,gameChar_y-40);
                strokeWeight(1);
                //head
                stroke(105,105,105);
                ellipse(gameChar_x+1,gameChar_y-57,18,18);  
                strokeWeight(4);
                fill(0,0,0);
                stroke(0);
                strokeWeight(1);
                //body
                rect(gameChar_x-6,gameChar_y-49,13,30);

            }
            
        }
        else
        {
            runsound.stop();
            if (StopTime==0)
            {
                StopTime=frameCount+600;
            }
            if (StopTime>frameCount)
            {
                fill(0,0,0);
                stroke(105,105,105);
                ellipse(gameChar_x+1,gameChar_y-57,18,18);  
                strokeWeight(4);
                line(gameChar_x-5,gameChar_y-60,gameChar_x+6,gameChar_y-60)
                fill(0,0,0);
                stroke(0);
                strokeWeight(1);
                //body
                rect(gameChar_x-6,gameChar_y-49,13,30);
                stroke(0,0,0);
                strokeWeight(5);
                line(gameChar_x-4,gameChar_y-20,gameChar_x-10,gameChar_y);
                //left leg
                line(gameChar_x+5,gameChar_y-20,gameChar_x+7,gameChar_y);
                line(gameChar_x-7,gameChar_y-47,gameChar_x-20,gameChar_y-32);
                line(gameChar_x+7,gameChar_y-47,gameChar_x+20,gameChar_y-32);
                strokeWeight(2);
                //right leg
                stroke(192,192,192);
                line(gameChar_x-20,gameChar_y-71,gameChar_x-21,gameChar_y-34);
                line(gameChar_x-23,gameChar_y-35,gameChar_x-18,gameChar_y-35);
                strokeWeight(1);
            }
            else
            {   
                if (WaitingCount<20)
                {
                    fill(0,0,0);
                    //head
                    stroke(105,105,105);
                    ellipse(gameChar_x+1,gameChar_y-57,18,18);  
                    strokeWeight(4);
                    line(gameChar_x-5,gameChar_y-60,gameChar_x+6,gameChar_y-60)
                    fill(0,0,0);
                    stroke(0);
                    strokeWeight(1);
                    //body
                    rect(gameChar_x-6,gameChar_y-49,13,30);
                    //left leg
                    stroke(0,0,0);
                    strokeWeight(5);
                    line(gameChar_x-4,gameChar_y-20,gameChar_x-10,gameChar_y);
                    //right leg
                    line(gameChar_x+5,gameChar_y-20,gameChar_x+7,gameChar_y);
                    //left arm
                    line(gameChar_x-7,gameChar_y-47,gameChar_x-21,gameChar_y-47);
                    //right arm
                    line(gameChar_x+7,gameChar_y-47,gameChar_x+15,gameChar_y-40);
                    line(gameChar_x+7,gameChar_y-30,gameChar_x+15,gameChar_y-40);
                    strokeWeight(2);
                    //sword
                    stroke(192,192,192);
                    line(gameChar_x-20,gameChar_y-8,gameChar_x-21,gameChar_y-47);
                    line(gameChar_x-23,gameChar_y-40,gameChar_x-18,gameChar_y-40);
                    strokeWeight(1);
                    WaitingCount++;
                }
                if (WaitingCount<40 && WaitingCount>=20)
                {       
                    fill(0,0,0);
                    //head
                    ellipse(gameChar_x+1,gameChar_y-57,18,18); 
                    stroke(105,105,105);
                    strokeWeight(4);
                    line(gameChar_x-5,gameChar_y-60,gameChar_x+6,gameChar_y-60)
                    fill(0,0,0);
                    stroke(0);
                    strokeWeight(1);
                    //body
                    rect(gameChar_x-6,gameChar_y-49,13,30);
                    //left leg
                    stroke(0,0,0);
                    strokeWeight(5);
                    line(gameChar_x-4,gameChar_y-20,gameChar_x-10,gameChar_y);
                    //right leg
                    line(gameChar_x+5,gameChar_y-20,gameChar_x+7,gameChar_y);
                    //left arm
                    line(gameChar_x-7,gameChar_y-47,gameChar_x-21,gameChar_y-34);
                    //right arm
                    line(gameChar_x+7,gameChar_y-47,gameChar_x+15,gameChar_y-40);
                    line(gameChar_x+7,gameChar_y-30,gameChar_x+15,gameChar_y-40);
                    strokeWeight(2);
                    //sword
                    stroke(192,192,192);
                    line(gameChar_x-20,gameChar_y,gameChar_x-21,gameChar_y-32);
                    line(gameChar_x-23,gameChar_y-30,gameChar_x-18,gameChar_y-30);
                    strokeWeight(1);
                    WaitingCount++;
                }
                if (WaitingCount==40)
                {   
                    waitingsound.play();
                    StopTime=0; 
                    WaitingCount=1
                }
            }
        }
}

//loop draw clouds
function drawClouds()
{   
    for (var i=0; i<clouds.length;i++)
    {
        fill(181, 181, 181);
        ellipse(clouds[i].x_pos,90,45*3.35,45*1.65);
        ellipse(clouds[i].x_pos+90,90,45*3.1,45*1.9);
        ellipse(clouds[i].x_pos+150,90,45*3.4,45*1.65);
        ellipse(clouds[i].x_pos,130,30*3.35,45*1.65);
        ellipse(clouds[i].x_pos+130,50,45*3.1,45*1.9);
        ellipse(clouds[i].x_pos+190,50,45*3.4,45*1.65);
    }
}

//loop draw mountains
function drawMountains()
{   
    for (var i=0;i<mountains.length;i++)
    {
        fill("darkgrey");
        triangle(mountains[i]-40*3,floorPos_y-279+40 *7,mountains[i]-40*9,floorPos_y-279,mountains[i]-40*15.45,floorPos_y-278+40 * 7);
        beginShape();
        fill(255,255,255,200);
        vertex(mountains[i]-40*9,floorPos_y-279);
        vertex(mountains[i]-40*7.5,floorPos_y-279+40*1.8);
        vertex(mountains[i]-40*8.9,floorPos_y-279+40);
        vertex(mountains[i]-40*8.5,floorPos_y-279+40*0.95);
        vertex(mountains[i]-40*9.2,floorPos_y-279+40*1.55);
        vertex(mountains[i]-40*9.4,floorPos_y-279+40*0.95);
        vertex(mountains[i]-40*10.35,floorPos_y-279+40*1.5);
        endShape(CLOSE);
        fill("darkgrey");
        triangle(mountains[i]-40*7.5,floorPos_y-279+40*7,mountains[i]-40*1.1,floorPos_y-282+40*7.1,mountains[i]-40*4,floorPos_y-279-40/3.8);
        beginShape();
        fill(255,255,255,200);
        vertex(mountains[i]-40*4.56,floorPos_y-279+40*0.85); 
        vertex(mountains[i]-40*4.06,floorPos_y-279-40*0.4);
        vertex(mountains[i]-40*3.46,floorPos_y-279+40*1.15); 
        endShape(CLOSE);
        noStroke();   
    }
}

//loop draw trees
function drawTrees()
{   
    for(var i=0; i<trees_x.length; i++)
    {
        stroke(139,69,19,100);
        strokeWeight(4);
        fill(84, 42, 25);
        triangle(trees_x[i],floorPos_y,trees_x[i]+15,floorPos_y-150,trees_x[i]+30,floorPos_y);
        noStroke();
        fill(5, 48, 30);
        ellipse(trees_x[i]+50,floorPos_y-150,90,70);
        ellipse(trees_x[i]-20,floorPos_y-150,90,60);
        ellipse(trees_x[i]+10,floorPos_y-150,90,90);
        noStroke();
        fill(255);
        strokeWeight(0);
    }
}

//loop draw canyons
function drawCanyon(t_canyon)
{   
    noStroke();
    fill(139,69,19);  
    rect(t_canyon.x_pos,t_canyon.y_pos+1.5,t_canyon.size,height);
}

//check has fall in canyon, down 3 pixels
function checkCanyon(t_canyon)
{   
    if (dist(t_canyon.x_pos+(t_canyon.size/2),t_canyon.y_pos,gameChar_world_x,gameChar_y)<=t_canyon.size/2 || isPlummeting==true)
    {   
        isPlummeting=true;
        gameChar_y+=3
    }
    else
    {
        isPlummeting=false;
    }
}

//loop draw collectables
function drawCollectable(t_collectable)
{  
    if (t_collectable.isFound==false)
    {
        noStroke();
        fill("purple");
        triangle(t_collectable.x_pos,t_collectable.y_pos-t_collectable.size/2,t_collectable.x_pos+t_collectable.size,t_collectable.y_pos-t_collectable.size,t_collectable.x_pos-t_collectable.size,t_collectable.y_pos-t_collectable.size );
        strokeWeight(t_collectable.size/4);
        stroke(255,255,0);
        fill(100, 155, 255,5);
        ellipse(t_collectable.x_pos,t_collectable.y_pos,t_collectable.size,t_collectable.size);
        noStroke();
        strokeWeight(0);
    }
}

//loop check collectables +1 game score
function checkCollectable(t_collectable)
{       
    if (dist(t_collectable.x_pos-scrollPos,t_collectable.y_pos,gameChar_world_x-scrollPos,gameChar_y)<=15 && t_collectable.isFound==false)
    { 
        t_collectable.isFound = true;
        game_score ++;
    }
}

//draw flag if is reached change state and draw 
function renderFlagpole()
{
    if (flagpole.isReached)
    { 
        strokeWeight(random(0,50));
        stroke(random(0,255),random(0,255),random(0,255));
        fill(random(0,255),random(0,255),random(0,255));
        ellipse(flagpole.x_pos,floorPos_y-45,-90,-90);
        strokeWeight(0);
        noStroke();
    }
    else
    {   
        fill(255,215,0);
        ellipse(flagpole.x_pos,floorPos_y-45,-90,-90);
        if (frameCount % 4 === 0)
        {
            strokeWeight(random(0,10));
            stroke(random(0,255),random(0,255),random(0,255),random(0,255));
            fill(255,215,0);
            ellipse(flagpole.x_pos,floorPos_y-45,-90,-90);
            strokeWeight(0);
            noStroke();
        }
    }
}

//check flagpole change isreached
function checkFlagPole()
{
    if (dist(flagpole.x_pos,floorPos_y,gameChar_world_x,floorPos_y)<=5)
    { 
        flagpole.isReached = true;
        keyCode=0;
    }
}

//check fall canyon lives -1
function checkPlayerDie()
{
    if (gameChar_y>floorPos_y+210 && GamePause==false)
    {
        lives-=1;
        runsound.pause();
        startGame();
    }   
    for (var i=0;i<Zoombies.length;i++)
    {  
        if (dist(gameChar_world_x,gameChar_y,Zoombies[i].gameZoombie_x,floorPos_y)<10 && Zoombies[i].active==true && GamePause==false)
        {   
            if (isAttacking==true)
            {
                game_score++;
                push(Zoombies[i].active=false);
            }
            else
            {
                lives-=1;
                runsound.pause();
                startGame(); 
            }
        }
    }
}

//create plataform linked to the trees
function CreatePlatforms(x,y,length)
{
    var plat={
        x: x,
        y: y,
        length: length,
        draw: function(){
        stroke(139,69,19,100);
        strokeWeight(4);
        fill(84, 42, 25);
        rect(this.x,this.y,this.length,5)},
        checkcontact: function(char_x,char_y){
            if (char_x> this.x && char_x< this.x + this.length) 
            {   
                var d = this.y - char_y
                if (d>= 0 && d < 3)
                {
                    return true;
                }
            }
            
            return false;
                                            }
    }
    return plat;
}

//start variables game and arrays and objects
function startGame()
{
    gameChar_x = width/2;
	gameChar_y = floorPos_y-100; 
	scrollPos = 0;
	gameChar_world_x = gameChar_x - scrollPos;
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
}
