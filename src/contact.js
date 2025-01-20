export const  contact = () => {
    
    const content = document.querySelector(".content");
    content.textContent = "";
    const h1 = document.createElement("h1");
    h1.id  = "contact-title";
    h1.textContent = "Falcon's Fabolous Taverna"

    const p  = document.createElement("p");
    p.id= "contact-description";
    p.textContent = "Here you can checkout my Github";

    const link = document.createElement("a");
    link.href = "https://github.com/RubyFalcon";
    link.textContent = "Github";
    link.target = "_blank";
    content.append(h1, p , link);
  

}