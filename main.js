song1="";
song2="";
var left_wrist_x=0;
var left_wrist_y=0;
var right_wrist_x=0;
var right_wrist_y=0;
song1_status="";
song2_status="";
score_left_wrist=0;
score_right_wrist=0;

function preload(){
song1=loadSound("music.mp3");
song2=loadSound("song2.mp3");

}
function setup(){
canvas=createCanvas(450,350);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet= ml5.poseNet(video, modelLoaded);
poseNet.on("pose", gotPoses)
}
function play(){
    song1.play();
    song.setVolume(1);
    song.rate(1);

    
}
function modelLoaded(){
    console.log("poseNet is initialized");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        score_left_wrist=results[0].pose.keypoints[9].score;
        score_right_wrist=results[0].pose.keypoints[10].score;
        console.log(score_left_wrist,score_right_wrist);
        left_wrist_x = results[0].pose.leftWrist.x;
        left_wrist_y = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = "+left_wrist_x + " Left Wrist Y = "+left_wrist_y);
        right_wrist_x = results[0].pose.rightWrist.x;
        right_wrist_y = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = "+right_wrist_x + " Right Wrist Y = "+right_wrist_y);
    }
}
function draw(){
image(video,0,0,450,350);
song1_status=song1.isPlaying();
song2_status=song2.isPlaying();
fill("#FF0000");
stroke("#FF0000");
if(score_left_wrist>0.2){
circle(left_wrist_x,left_wrist_y,20);
song1.stop();
if(song2_status==false){
song2.play();
document.getElementById("song").innerHTML="playing Roar";
}
}
if(score_right_wrist>0.2){
    circle(right_wrist_x,right_wrist_y,20);
    song2.stop();
    if(song1_status==false){
    song1.play();
    document.getElementById("song").innerHTML="playing Lost Boy";
    }
    }
}