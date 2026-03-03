import { estSurMobile } from "./plateforme.js";
import { rediriger } from "./utilitaires.js";

document.addEventListener("DOMContentLoaded", ()=>{
    if (estSurMobile()){
        rediriger("/mobile/calendrier.html");
    }else{
        rediriger("/pc/calendrier.html");
    }
});