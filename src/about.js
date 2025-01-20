export const  about = () => {
    
    const content = document.querySelector(".content");
    content.textContent = "";
    const h1 = document.createElement("h1");
    h1.id  = "about-title";
    h1.textContent = "About"

    const p  = document.createElement("p");
    p.id= "restaurant-description";
    p.textContent = "A certain about page";
    content.append(h1, p);
  

}