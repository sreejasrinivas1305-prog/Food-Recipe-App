function getUsers(){return JSON.parse(localStorage.getItem("recipeUsers"))||[]}
function saveUsers(users){localStorage.setItem("recipeUsers",JSON.stringify(users))}

const signupForm=document.getElementById("signupForm");
if(signupForm){
  signupForm.addEventListener("submit",function(e){
    e.preventDefault();
    const name=document.getElementById("signupName").value.trim();
    const email=document.getElementById("signupEmail").value.trim().toLowerCase();
    const password=document.getElementById("signupPassword").value;
    const users=getUsers();
    if(users.some(u=>u.email===email)){
      document.getElementById("signupMessage").textContent="Email already registered. Please login.";
      return;
    }
    users.push({id:Date.now(),name,email,password});
    saveUsers(users);
    document.getElementById("signupMessage").textContent="Account created successfully! Redirecting...";
    setTimeout(()=>window.location.href="login.html",700);
  });
}

const loginForm=document.getElementById("loginForm");
if(loginForm){
  loginForm.addEventListener("submit",function(e){
    e.preventDefault();
    const email=document.getElementById("loginEmail").value.trim().toLowerCase();
    const password=document.getElementById("loginPassword").value;
    const user=getUsers().find(u=>u.email===email&&u.password===password);
    const msg=document.getElementById("loginMessage");
    if(!user){msg.textContent="Invalid email or password.";return}
    localStorage.setItem("currentUser",JSON.stringify(user));
    msg.textContent="Login successful! Redirecting...";
    setTimeout(()=>window.location.href="user.html",500);
  });
}
