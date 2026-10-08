const defaultRecipes=[
{id:1,name:"Veg Biryani",category:"Indian",diet:"Vegetarian",emoji:"🍛",ingredients:["Basmati rice","Mixed vegetables","Onion","Biryani spices"],steps:["Wash and soak rice.","Saute onion and vegetables with spices.","Add rice and water.","Cook until rice is fluffy."]},
{id:2,name:"Masala Dosa",category:"Indian",diet:"Vegetarian",emoji:"🥞",ingredients:["Dosa batter","Potato","Onion","Green chilli"],steps:["Prepare potato masala.","Heat a dosa pan.","Spread batter into a thin circle.","Add masala and fold the dosa."]},
{id:3,name:"Pasta Arrabbiata",category:"Italian",diet:"Vegetarian",emoji:"🍝",ingredients:["Pasta","Tomato","Garlic","Chilli flakes"],steps:["Boil pasta.","Prepare tomato-garlic sauce.","Mix pasta with sauce.","Serve hot."]},
{id:4,name:"Fruit Oat Bowl",category:"Healthy",diet:"Vegetarian",emoji:"🥣",ingredients:["Oats","Milk","Banana","Apple","Nuts"],steps:["Add oats to a bowl.","Pour milk and mix.","Top with fruits and nuts.","Serve fresh."]},
{id:5,name:"Pancakes",category:"Breakfast",diet:"Vegetarian",emoji:"🥞",ingredients:["Flour","Milk","Egg","Sugar"],steps:["Mix all ingredients.","Heat a pan.","Pour batter and cook both sides.","Serve with fruit or honey."]},
{id:6,name:"Chocolate Mug Cake",category:"Dessert",diet:"Vegetarian",emoji:"🍰",ingredients:["Flour","Cocoa powder","Milk","Sugar"],steps:["Mix ingredients in a mug.","Microwave until cooked.","Cool for a minute.","Serve."]}
];

function getRecipes(){
  const saved=JSON.parse(localStorage.getItem("recipes"));
  if(!saved){localStorage.setItem("recipes",JSON.stringify(defaultRecipes));return defaultRecipes}
  return saved;
}
function saveRecipes(r){localStorage.setItem("recipes",JSON.stringify(r))}
function getFavorites(){return JSON.parse(localStorage.getItem("favorites"))||[]}
function setFavorites(f){localStorage.setItem("favorites",JSON.stringify(f))}
function isFav(id){return getFavorites().includes(Number(id))}
function toggleFavorite(id){
  const n=Number(id), f=getFavorites(), i=f.indexOf(n);
  if(i>=0)f.splice(i,1);else f.push(n);
  setFavorites(f);
  renderRecipes();
  renderFavorites();
}
function recipeCard(r){
  return `<article class="recipe-card">
    <div class="recipe-emoji">${r.emoji||"🍽️"}</div>
    <div class="recipe-content">
      <span class="tag">${r.category}</span><span class="tag">${r.diet}</span>
      <h3>${r.name}</h3>
      <p>${r.ingredients.slice(0,3).join(", ")}...</p>
      <div class="card-actions">
        <button class="btn" onclick="viewRecipe(${r.id})">View Recipe</button>
        <button class="btn outline" onclick="toggleFavorite(${r.id})">${isFav(r.id)?"❤️ Saved":"♡ Save"}</button>
      </div>
    </div>
  </article>`;
}
function renderRecipes(){
  const grid=document.getElementById("recipeGrid"); if(!grid)return;
  const q=(document.getElementById("searchInput")?.value||"").toLowerCase();
  const cat=document.getElementById("categoryFilter")?.value||"all";
  const data=getRecipes().filter(r=>{
    const text=(r.name+" "+r.category+" "+r.diet+" "+r.ingredients.join(" ")).toLowerCase();
    return text.includes(q)&&(cat==="all"||r.category===cat);
  });
  grid.innerHTML=data.length?data.map(recipeCard).join(""):"<p>No recipes found.</p>";
}
function viewRecipe(id){window.location.href="recipe-details.html?id="+id}
function renderDetails(){
  const box=document.getElementById("recipeDetails");if(!box)return;
  const id=Number(new URLSearchParams(location.search).get("id"));
  const r=getRecipes().find(x=>x.id===id);
  if(!r){box.innerHTML="<h2>Recipe not found.</h2>";return}
  box.innerHTML=`<article class="details">
    <div class="big-emoji">${r.emoji||"🍽️"}</div>
    <span class="tag">${r.category}</span><span class="tag">${r.diet}</span>
    <h1>${r.name}</h1>
    <h2>Ingredients</h2><ul>${r.ingredients.map(x=>`<li>${x}</li>`).join("")}</ul>
    <h2>Preparation</h2><ol>${r.steps.map(x=>`<li>${x}</li>`).join("")}</ol>
    <button class="btn" onclick="toggleFavorite(${r.id})">${isFav(r.id)?"❤️ Remove from Favourites":"❤️ Save to Favourites"}</button>
  </article>`;
}
function renderFavorites(){
  const grid=document.getElementById("favoritesGrid");if(!grid)return;
  const fav=getFavorites(), data=getRecipes().filter(r=>fav.includes(r.id));
  grid.innerHTML=data.length?data.map(recipeCard).join(""):"<p>You have no saved recipes yet. <a href='recipes.html'>Explore recipes →</a></p>";
}
document.getElementById("searchInput")?.addEventListener("input",renderRecipes);
document.getElementById("categoryFilter")?.addEventListener("change",renderRecipes);
renderRecipes();renderDetails();renderFavorites();
