//Alarm Section starts from here
var alarmSound = new Audio();
alarmSound.src = "alarmSounds.mp3";
var alarmTimer;

function showTime() {
	var d = new Date();
	var h = d.getHours();
	var m = d.getMinutes();
	var s = d.getSeconds();
		
	h = (h < 10) ? "0" + h : h;
	m = (m < 10) ? "0" + m : m;
	s = (s < 10) ? "0" + s : s;

	var date = d.toLocaleDateString();
	var time = h + ":"+ m + ":"+ s;
	document.getElementById("date").innerText = date;
	document.getElementById("date").textContent = date;
	document.getElementById("time").innerText = time;
	document.getElementById("time").textContent = time;

	setTimeout(showTime, 1000);
}

showTime();

function setAlarm(button) {
	var ms = document.getElementById('alarmTime').valueAsNumber;
	if(isNaN(ms)) {
		alert('Invalid Date & Time');
		return;
	}
	var alarm = new Date(ms);
	var alarmTime = new Date(alarm.getUTCFullYear(), alarm.getUTCMonth(), alarm.getUTCDate(),  alarm.getUTCHours(), alarm.getUTCMinutes(), alarm.getUTCSeconds());		
	var differenceInMs = alarmTime.getTime() - (new Date()).getTime();

	if(differenceInMs < 0) {
		alert('Specified time is already passed');
		return;
	}

	alarmTimer = setTimeout(initAlarm, differenceInMs);
	button.innerText = 'Cancel Alarm';
	button.setAttribute('onclick', 'cancelAlarm(this);');
};

function cancelAlarm(button){
	clearTimeout(alarmTimer);
	button.innerText = "Set Alarm";
	button.setAttribute('onclick', 'setAlarm(this);');
	alarmSound.pause();
	document.getElementById("alarmOptions").style.display = "none";
};

function initAlarm(){
	alarmSound.play();
	document.getElementById("alarmOptions").style.display = '';
};

function stopAlarm(){
	alarmSound.pause();
	alarmSound.currentTime = 0;
	document.getElementById("alarmOptions").style.display = "none";
	cancelAlarm(document.getElementById("alarmButton")); 
};

function snooze(){
	stopAlarm();
	alarmTimer = setTimeout(initAlarm, 300000);
}

//Stop Watch Section starts from here
var hours= 0;
var minutes= 0;
var seconds= 0;
var displaySeconds = 0;
var displayMinutes = 0;
var displayHours = 0;
var interval = null;
var status = "stopped";
	
function stopWatchFunc(){
	seconds++;
		if (seconds / 60 ===1) {
			seconds = 0;
			minutes++;
			if (minutes /60 === 1) {
				minutes = 0;
				hours++
			}
	}
	if(seconds < 10){
        displaySeconds = "0" + seconds.toString();
    }
    else{
        displaySeconds = seconds;
    }

    if(minutes < 10){
        displayMinutes = "0" + minutes.toString();
    }
    else{
        displayMinutes = minutes;
    }

    if(hours < 10){
        displayHours = "0" + hours.toString();
    }
    else{
        displayHours = hours;
    }
	var display = document.getElementById("stopWatchDisplay");
 	display.innerHTML = displayHours + ":" + displayMinutes + ":" + displaySeconds;
}

function startStop(){
	if(status === "stopped"){
		interval = window.setInterval(stopWatchFunc, 1000);
		document.getElementById("startBtn").innerHTML = "Stop";
		status = "started";
	}
	else{
		window.clearInterval(interval);
		document.getElementById("startBtn").innerHTML = "Start";
		status = "stopped";
	}
}

function reset(){
	window.clearInterval(interval);
	seconds = 0;
	minutes = 0;
	hours = 0;
	document.getElementById("stopWatchDisplay").innerHTML = "00:00:00";
	document.getElementById("startBtn").innerHTML = "Start";
}