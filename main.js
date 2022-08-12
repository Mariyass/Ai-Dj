var song="";
var leftWristX= 0;
var leftWristY= 0;
var rightWristX= 0;
var rightWristY= 0;
var score_leftWrist= 0;
var score_rigthWrist= 0;

function preload(){
    song=loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO)
    video.hide()

    poseNet=ml5.poseNet(video,modelLoaded)
    poseNet.on("pose",gotposes)
}

function modelLoaded(){
    console.log("Moadel is Loaded")
}

function gotposes(results){
    if(results.length>0){
        console.log(results)
        score_leftWrist=results[0].pose.keypoints[9].score;
        console.log("score left wrist = " + score_leftWrist);

        score_rigthWrist=results[0].pose.keypoints[10].score;
        console.log("score right wrist = " + score_rigthWrist);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("left wrist x = " + leftWristX + ", left wrist y = " + leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("right wrist x = " + rightWristX + ", right wrist y = " + rightWristY);
    }
}

function draw(){
    image(video,0,0,600,500)

    fill("#ff0000")
    stroke("#ff0000")

    if(score_leftWrist>0.2){
        circle(leftWristX,leftWristY,20)
        num_leftWristY=Number(leftWristY)
        remove_desemals=floor(num_leftWristY)
        volume=remove_desemals/500;
        document.getElementById("volume").innerHTML="Volume= " + volume;
        song.setVolume(volume);
    }

    if(score_rigthWrist>0.2){
        circle(rightWristX,rightWristY,20)

        if(rightWristY>0 && rightWristY<=100){
            document.getElementById("speed").innerHTML="SPEED = 0.5x";
            song.rate(0.5);
        }
        else if(rightWristY>100 && rightWristY<=200){
            document.getElementById("speed").innerHTML="SPEED = 1.0x";
            song.rate(1.0);
        }
        else if(rightWristY>200 && rightWristY<=300){
            document.getElementById("speed").innerHTML="SPEED = 1.5x";
            song.rate(1.5);
        }
        else if(rightWristY>300 && rightWristY<=400){
            document.getElementById("speed").innerHTML="SPEED = 2.0x";
            song.rate(2.0);
        }
        else if(rightWristY>400 && rightWristY<=500){
            document.getElementById("speed").innerHTML="SPEED = 2.5x";
            song.rate(2.5);
        }


        
        
    }

}

function play(){
    song.play()
    song.setVolume(1);
    song.rate(1);
}