import { estSurMobile } from "./plateforme.js";
import { rediriger } from "./utilitaires.js";
import { ÉvénementModale, ImportationModale } from "../composantes/modale/modale.js";
import { Filtres } from "../composantes/filtres/filtres.js";
import { initialiserCalendrier } from "../composantes/calendrier.js";
import { affichage, faireStyleURL } from "./style.js";

document.addEventListener("DOMContentLoaded", ()=>{
    if (estSurMobile()){
        rediriger("/mobile/calendrier.html");
    }else{
        rediriger("/pc/calendrier.html");
    }

    faireStyleURL();

    let événementModale = new ÉvénementModale("événement-fenêtre-modale");
    let filtres = null;
    if(affichage["filtres"]){
        filtres = new Filtres();
    }
    let importationModale = null;
    if(affichage["btn_importation"]){
        importationModale = new ImportationModale("importation-modale");
    }
    initialiserCalendrier(événementModale, filtres, importationModale); 
});