var video_out = document.getElementById("vid-box");

// this is the person who iniated the call
var vid_thumb = document.getElementById("vid-thumb"); 

// onclick change class of video_out


function login(form) {

  console.log("hi")
  var phone = window.phone = PHONE({
      number        : form.username.value || "Anonymous", // listen on username line else Anonymous
      publish_key   : 'pub-c-566d8d42-99d0-4d21-bc72-6d376ed70567',
      subscribe_key : 'sub-c-107b4e72-082d-11e6-996b-0619f8945a4f',
      ssl : (('https:' == document.location.protocol) ? true : false)
  }); 
  
  //wrapper that attaches methods to phone
  var ctrl = window.ctrl = CONTROLLER(phone);
  
  // Called when ready to receive call
  ctrl.ready(function(){
    form.username.style.background="#55ff5b"; // Turn input green
    form.login_submit.hidden="true";  // Hide login button
    ctrl.addLocalStream(vid_thumb);   // Place local stream in div
  });        


  ctrl.receive(function(session){
      // if too many users on the line, than should not be able to connect

      session.connected(function(session){ 
        video_out.appendChild(session.video)

      });
      session.ended(function(session) {
        ctrl.getVideoElement(session.number).remove(); 
      });

  });// Called on incoming call/call ended
  ctrl.videoToggled(function(session, isEnabled){
    ctrl.getVideoElement(session.number).toggle(isEnabled); // Hide video is stream paused
  });
  
  ctrl.audioToggled(function(session, isEnabled){
    ctrl.getVideoElement(session.number).css("opacity",isEnabled ? 1 : 0.75); // 0.75 opacity is audio muted
  });
    
  return false;
}

// function makeCall(form){
//   if (!window.phone) alert("Login First!");
//   var num = form.number.value;
//   if (phone.number()==num) return false; // No calling yourself!
//   ctrl.isOnline(num, function(isOn){    // Check if other user is listening for calls
//     if (isOn) ctrl.dial(num);   // Dial if they are online
//     else alert("User if Offline");  // Alert if not
//   });
//   return false; // So form does not submit
// }

function makeCall(form){
    if (!window.phone) alert("Login First!");
    else phone.dial(form.number.value);
    return false;
}

function end(){
  ctrl.hangup();
}

function mute(){
  var audio = ctrl.toggleAudio();
  if (!audio) $("#mute").html("Unmute");
  else $("#mute").html("Mute");
}

function pause(){
  var video = ctrl.toggleVideo();
  if (!video) $('#pause').html('Unpause');
  else $('#pause').html('Pause');
}