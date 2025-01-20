export const menu = () => {
    
    const content = document.querySelector(".content");
    const menuPage= document.createElement("div");
    menuPage.classList = "menu-page";

    const foods = document.createElement("div");
    foods.className = "foods";


    const createItem = (name, desc, price)=> {
        const foodItem = document.createElement("div");
        foodItem.className = "food-card";
        const foodName = document.createElement("h2");
        foodName.textContent = name;
        const foodDesc = document.createElement("p");
        foodDesc.textContent = desc;
        const foodPrice = document.createElement("p");
        foodPrice.textContent = price;
        foodItem.append(foodName, foodDesc,foodPrice);

        return foodItem;
    }

    foods.append(createItem("Mousaka", "Tasty greek Mousaka",  "£12.00"));
    foods.append(createItem("Pita Gyros",  "Greek pita wrap made with pork gyros, tzatziki, tomatoes, and fries", "£8.00"));
    foods.append(createItem("Pastitsio" , "Greek style lasagna", "£12.00"));
    foods.append(createItem("Ceasar Salad", "Authentic Greek chicken Ceasar salad ", "£10.00"));

    content.textContent = "";
    const h1 = document.createElement("h1");
    h1.id  = "menu-title";
    h1.textContent = "Menu"

    const p  = document.createElement("p");
    p.id= "menu-description";
    p.textContent = "We have our menu";
    menuPage.append(h1, foods);
    content.append(menuPage );
  
}