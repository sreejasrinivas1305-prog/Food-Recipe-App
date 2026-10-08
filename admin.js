function adminIsLogged(){return localStorage.getItem("adminLoggedIn")==="true"}
const adminLogin=document.getElementById("adminLoginForm");
if(adminLogin){
  adminLogin.addEventListener("submit",function(e){
    e.preventDefault();
    const u=document.getElementById("adminUser").value.trim();
    const p=document.getElementById("adminPassword").value;
    if(u==="admin"&&p==="admin123"){
      localStorage.setItem("adminLoggedIn","true");
      window.location.href="admin.html";
    }else document.getElementById("adminMessage").textContent="Invalid admin credentials.";
  });
}
const adminPage=document.getElementById("recipeForm");
if(adminPage){
  if(!adminIsLogged()){alert("Please login as admin.");window.location.href="admin-login.html";}
  let recipes=JSON.parse(localStorage.getItem("recipes"))||[];
  function save(){localStorage.setItem("recipes",JSON.stringify(recipes));}
  function renderAdmin(){
    const box=document.getElementById("adminRecipeList");
    box.innerHTML=recipes.map(r=>`<div class="admin-item"><strong>${r.emoji||"🍽️"} ${r.name}</strong><br><small>${r.category} • ${r.diet}</small><div class="card-actions"><button class="btn outline" onclick="editRecipe(${r.id})">Edit</button><button class="btn" onclick="deleteRecipe(${r.id})">Delete</button></div></div>`).join("")||"<p>No recipes.</p>";
  }
  adminPage.addEventListener("submit",function(e){
    e.preventDefault();
    const id=Number(document.getElementById("editId").value);
    const item={id:id||Date.now(),name:document.getElementById("recipeName").value.trim(),category:document.getElementById("recipeCategory").value.trim(),diet:document.getElementById("recipeDiet").value.trim(),emoji:"🍽️",ingredients:document.getElementById("recipeIngredients").value.split(",").map(x=>x.trim()).filter(Boolean),steps:document.getElementById("recipeSteps").value.split(/
/).map(x=>x.trim()).filter(Boolean)};
    if(id){const i=recipes.findIndex(r=>r.id===id);recipes[i]=item}else recipes.push(item);
    save();renderAdmin();adminPage.reset();document.getElementById("editId").value="";document.getElementById("formTitle").textContent="Add New Recipe";document.getElementById("cancelEdit").classList.add("hidden");document.getElementById("adminActionMessage").textContent="Recipe saved successfully.";
  });
  window.editRecipe=function(id){
    const r=recipes.find(x=>x.id===id);if(!r)return;
    document.getElementById("editId").value=r.id;document.getElementById("recipeName").value=r.name;document.getElementById("recipeCategory").value=r.category;document.getElementById("recipeDiet").value=r.diet;document.getElementById("recipeIngredients").value=r.ingredients.join(", ");document.getElementById("recipeSteps").value=r.steps.join("\n");document.getElementById("formTitle").textContent="Edit Recipe";document.getElementById("cancelEdit").classList.remove("hidden");
  }
  window.deleteRecipe=function(id){
    if(confirm("Delete this recipe?")){recipes=recipes.filter(r=>r.id!==id);save();renderAdmin();}
  }
  document.getElementById("cancelEdit").addEventListener("click",function(){adminPage.reset();document.getElementById("editId").value="";document.getElementById("formTitle").textContent="Add New Recipe";this.classList.add("hidden")});
  document.getElementById("adminLogout").addEventListener("click",function(){localStorage.removeItem("adminLoggedIn");window.location.href="index.html"});
  renderAdmin();
}
