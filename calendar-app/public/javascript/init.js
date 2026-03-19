import { estSurMobile } from "./plateforme.js";
import { rediriger } from "./utilitaires.js";
import { ÉvénementModale, ImportationModale } from "../composantes/modale/modale.js";
import { Filtres } from "../composantes/filtres/filtres.js";
import { initialiserCalendrier } from "../composantes/calendrier.js";

document.addEventListener("DOMContentLoaded", ()=>{
    if (estSurMobile()){
        rediriger("/mobile/calendrier.html");
    }else{
        rediriger("/pc/calendrier.html");
    }

    const événementModale = new ÉvénementModale("événement-fenêtre-modale");
    const filtres = new Filtres();
    const importationModale = new ImportationModale("importation-modale");
    initialiserCalendrier(événementModale, filtres, importationModale); 
});