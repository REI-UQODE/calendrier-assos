import { estSurMobile } from "/javascript/plateforme.js";
import { luminositéCouleur } from "/javascript/utilitaires.js";

export const modaleFerméeEvent = new Event("modaleFerméeEvent");

export class Modale{
    static modèle = null;

    estOuverte = false;

    emplacement = null;

    constructor(id){
        this.emplacement = document.getElementById(id);
        this.fermer();

        this.initContenus(); // méthode abstraite
    }

    static async obtenirModèle(url){
        if (!this.modèle){
            await fetch(url).then(r => r.text())
                .then(données => {
                    this.modèle = données;
                    
                });
        }
        return this.modèle;
    }

    initContenus(){throw new Error("Cette méthode est abstraite et n'est pas implémentée.");}

    /**
     * Insère une balise de style dans le document pour ajouter le CSS de la 
     * fenêtre modale.
     * 
     * @param {string} url URL vers le fichier CSS.
     * @param {string} id ID de la balise à ajouter. Permet d'empêcher l'ajout de la balise plus d'une fois.
     */
    insérerStyle(url, id){
        if (document.getElementById(id)){
            return
        }

        let cssModale = document.createElement("link");
        cssModale.setAttribute("id",id);
        cssModale.setAttribute("rel","stylesheet");
        cssModale.setAttribute("href",url+"?=v5");
        document.getElementsByTagName("head")[0].appendChild(cssModale);
    }

    fermer(){
        this.emplacement.style.display = "none";
        this.estOuverte = false;
        document.removeEventListener("keydown",this.événementÉchap);
        document.dispatchEvent(modaleFerméeEvent);
    }

    ouvrir(){
        this.emplacement.style.display = "flex";
        this.estOuverte = true;
        document.addEventListener("keydown",this.événementÉchap);
    }

    événementÉchap(e){ if(e.key === "Escape") this.fermer(); }
}

export class ÉvénementModale extends Modale{
    arrièrePlan = null;
    conteneur = null;
    enTête = null;
    titre = null;
    fermerBouton = null;
    contenuDiv = null;
    imageConteneur = null;
    image = null;
    texteDiv = null;
    date = null;
    heure = null;
    adresse = null;
    description = null;
    basDePage = null;
    lienInscription = null;
    boutonInscription = null;

    appelerMiseÀJourEnsembleSrc = () => this.miseÀJourImageEnsembleSrc(null);

    constructor(id){
        super(id);
    }

    async initContenus(){
        const modèle = await ÉvénementModale.obtenirModèle("/javascript/modale/ÉvénementModale.html");
        this.emplacement.innerHTML = modèle;
        
        this.arrièrePlan         = this.emplacement.querySelector("#événement-modale-arrière-plan");
        this.conteneur           = this.emplacement.querySelector("#événement-modale-conteneur");
        this.enTête              = this.emplacement.querySelector("#événement-modale-en-tête");
        this.fermerBouton        = this.emplacement.querySelector("#événement-modale-fermer"); 
        this.titre               = this.emplacement.querySelector("#événement-modale-titre");
        this.contenuDiv          = this.emplacement.querySelector("#événement-modale-contenu");
        this.imageConteneur      = this.emplacement.querySelector("#événement-modale-image-conteneur");
        this.image               = this.emplacement.querySelector("#événement-modale-image");
        this.texteDiv            = this.emplacement.querySelector("#événement-modale-texte");
        this.date                = this.emplacement.querySelector("#événement-modale-date");
        this.heure               = this.emplacement.querySelector("#événement-modale-heure");
        this.adresse             = this.emplacement.querySelector("#événement-modale-adresse");
        this.description         = this.emplacement.querySelector("#événement-modale-description");
        this.basDePage           = this.emplacement.querySelector("#événement-modale-bas-de-page");
        this.lienInscription     = this.emplacement.querySelector("#événement-modale-lien-inscription");
        this.boutonInscription   = this.emplacement.querySelector("#événement-modale-bouton-inscription");

        if (estSurMobile()){
            this.insérerStyle("/javascript/modale/ÉvénementModaleMobile.css","événement-modale-style");
        }else{
            this.insérerStyle("/javascript/modale/ÉvénementModalePC.css","événement-modale-style");
        }

        new ResizeObserver(() => {this.appelerMiseÀJourEnsembleSrc()}).observe(this.image);

        this.conteneur.addEventListener("click", e => {e.stopImmediatePropagation();});
        this.arrièrePlan.addEventListener("click", () => {this.fermer()});
        this.fermerBouton.addEventListener("click", () => {this.fermer()});
    }

    changerContenu(contenu){
        this.titre.textContent              = "titre"               in contenu? contenu["titre"]            : "";
        this.date.textContent               = "date"                in contenu? contenu["date"]             : "";
        this.heure.textContent              = "heure"               in contenu? contenu["heure"]            : "";
        this.adresse.textContent            = "adresse"             in contenu? contenu["adresse"]          : "";
        this.description.textContent        = "description"         in contenu? contenu["description"]      : "";

        if("image" in contenu && contenu["image"]){
            if (contenu["image"] instanceof String){
                this.image.src = contenu["image"];
            }else if (Array.isArray(contenu["image"])){

                this.appelerMiseÀJourEnsembleSrc = () => this.miseÀJourImageEnsembleSrc(contenu["image"]);
                this.appelerMiseÀJourEnsembleSrc();

            }else{
                throw new Error("L'image n'a pas pus être chargée, car son URL est mal formée.")
            }
        }

        if ("lien-inscription" in contenu){
            this.lienInscription.setAttribute("href", "lien-inscription" in contenu? contenu["lien-inscription"] : "");
            this.lienInscription.style.display = "inline-block";
        }else{
            this.lienInscription.style.display = "none";
        }

        //TODO : mettre les couleurs dans le CSS
        let couleur = "couleur" in contenu? contenu["couleur"] : "#888";
        const coulLum = luminositéCouleur(couleur,10);
        const coulSombre = luminositéCouleur(couleur, -10);
        const coulTrèsLum = luminositéCouleur(couleur, 40);

        this.conteneur.style.background = "repeating-linear-gradient(-45deg, " +coulLum+" 0px," +coulLum+" 40px," +coulSombre+" 40px," +coulSombre+" 80px)";
        this.enTête.style.backgroundColor = coulTrèsLum;
        this.basDePage.style.backgroundColor = coulTrèsLum;
    }

    ouvrir(){
        super.ouvrir();
        this.contenuDiv.scrollTop = 0;
    }

    miseÀJourImageEnsembleSrc(ensembleSrc){
        if (!ensembleSrc){
            return;
        }

        const largeur = this.image.parentNode.clientWidth - parseFloat(window.getComputedStyle(this.image.parentNode).paddingLeft) - parseFloat(window.getComputedStyle(this.image.parentNode).paddingRight);
        for (let i = 0; i < ensembleSrc.length; i++){
            if (ensembleSrc[i][0] < largeur){
            this.image.src = ensembleSrc[Math.max(i-1,0)][2];
            // console.log("Image taille : "+ensembleSrc[Math.max(i-1,0)][0]+"x"+ensembleSrc[Math.max(i-1,0)][1]);
            return;
            }
        }
        this.image.src = ensembleSrc[ensembleSrc.length-1][2];
        // console.log("Image taille : "+ensembleSrc[Math.max(i-1,0)][0]+"x"+ensembleSrc[Math.max(i-1,0)][1]);
    }
}