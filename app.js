var video_out = document.getElementById("vid-box");

function login(form) {
  var phone = window.phone = PHONE({
      number        : form.username.value || "Anonymous", // listen on username line else Anonymous
      publish_key   : 'pub-c-566d8d42-99d0-4d21-bc72-6d376ed70567',
      subscribe_key : 'sub-c-107b4e72-082d-11e6-996b-0619f8945a4f',
      ssl : (('https:' == document.location.protocol) ? true : false)
  }); 
  phone.ready(function(){ form.username.style.background="#55ff5b"; });
  phone.receive(function(session){
      session.connected(function(session) { video_out.appendChild(session.video); });
      session.ended(function(session) { video_out.innerHTML=''; });
  });
  return false;   // So the form does not submit.
}

function makeCall(form){
  if (!window.phone) alert("Login First!");
  else phone.dial(form.number.value);
  return false;
}

