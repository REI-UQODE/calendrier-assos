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
    #arrièrePlan = null;
    #conteneur = null;
    #enTête = null;
    #titre = null;
    #fermerBouton = null;
    #contenuDiv = null;
    #imageConteneur = null;
    #image = null;
    #texteDiv = null;
    #date = null;
    #heure = null;
    #adresse = null;
    #description = null;
    #basDePage = null;
    #lienInscription = null;
    #boutonInscription = null;

    appelerMiseÀJourEnsembleSrc = () => this.miseÀJourImageEnsembleSrc(null);

    constructor(id){
        super(id);
    }

    async initContenus(){
        const modèle = await ÉvénementModale.obtenirModèle("/javascript/modale/ÉvénementModale.html");
        this.emplacement.innerHTML = modèle;
        
        this.#arrièrePlan         = this.emplacement.querySelector("#événement-modale-arrière-plan");
        this.#conteneur           = this.emplacement.querySelector("#événement-modale-conteneur");
        this.#enTête              = this.emplacement.querySelector("#événement-modale-en-tête");
        this.#fermerBouton        = this.emplacement.querySelector("#événement-modale-fermer"); 
        this.#titre               = this.emplacement.querySelector("#événement-modale-titre");
        this.#contenuDiv          = this.emplacement.querySelector("#événement-modale-contenu");
        this.#imageConteneur      = this.emplacement.querySelector("#événement-modale-image-conteneur");
        this.#image               = this.emplacement.querySelector("#événement-modale-image");
        this.#texteDiv            = this.emplacement.querySelector("#événement-modale-texte");
        this.#date                = this.emplacement.querySelector("#événement-modale-date");
        this.#heure               = this.emplacement.querySelector("#événement-modale-heure");
        this.#adresse             = this.emplacement.querySelector("#événement-modale-adresse");
        this.#description         = this.emplacement.querySelector("#événement-modale-description");
        this.#basDePage           = this.emplacement.querySelector("#événement-modale-bas-de-page");
        this.#lienInscription     = this.emplacement.querySelector("#événement-modale-lien-inscription");
        this.#boutonInscription   = this.emplacement.querySelector("#événement-modale-bouton-inscription");

        if (estSurMobile()){
            this.insérerStyle("/javascript/modale/ÉvénementModaleMobile.css","événement-modale-style");
        }else{
            this.insérerStyle("/javascript/modale/ÉvénementModalePC.css","événement-modale-style");
        }

        new ResizeObserver(() => {this.appelerMiseÀJourEnsembleSrc()}).observe(this.#image);

        this.#conteneur.addEventListener("click", e => {e.stopImmediatePropagation();});
        this.#arrièrePlan.addEventListener("click", () => {this.fermer()});
        this.#fermerBouton.addEventListener("click", () => {this.fermer()});
    }

    changerContenu(contenu){
        this.#titre.textContent              = "titre"               in contenu? contenu["titre"]            : "";
        this.#date.textContent               = "date"                in contenu? contenu["date"]             : "";
        this.#heure.textContent              = "heure"               in contenu? contenu["heure"]            : "";
        this.#adresse.textContent            = "adresse"             in contenu? contenu["adresse"]          : "";
        this.#description.textContent        = "description"         in contenu? contenu["description"]      : "";

        if("image" in contenu && contenu["image"]){
            if (typeof contenu["image"] === "string"){
                this.#image.src = contenu["image"];
            }else if (Array.isArray(contenu["image"])){

                this.appelerMiseÀJourEnsembleSrc = () => this.miseÀJourImageEnsembleSrc(contenu["image"]);
                this.appelerMiseÀJourEnsembleSrc();

            }else{
                throw new Error("L'image n'a pas pus être chargée, car son URL est mal formée.")
            }
        }

        if ("lien-inscription" in contenu && contenu["lien-inscription"]){
            this.#lienInscription.setAttribute("href", "lien-inscription" in contenu? contenu["lien-inscription"] : "");
            this.#lienInscription.style.display = "inline-block";
        }else{
            this.#lienInscription.style.display = "none";
        }

        //TODO : mettre les couleurs dans le CSS
        let couleur = "couleur" in contenu? contenu["couleur"] : "#888";
        const coulLum = luminositéCouleur(couleur,10);
        const coulSombre = luminositéCouleur(couleur, -10);
        const coulTrèsLum = luminositéCouleur(couleur, 40);

        this.#conteneur.style.background = "repeating-linear-gradient(-45deg, " +coulLum+" 0px," +coulLum+" 40px," +coulSombre+" 40px," +coulSombre+" 80px)";
        this.#enTête.style.backgroundColor = coulTrèsLum;
        this.#basDePage.style.backgroundColor = coulTrèsLum;
    }

    ouvrir(){
        super.ouvrir();
        this.#contenuDiv.scrollTop = 0;
    }

    miseÀJourImageEnsembleSrc(ensembleSrc){
        if (!ensembleSrc){
            return;
        }

        const largeur = this.#image.parentNode.clientWidth - parseFloat(window.getComputedStyle(this.#image.parentNode).paddingLeft) - parseFloat(window.getComputedStyle(this.#image.parentNode).paddingRight);
        for (let i = 0; i < ensembleSrc.length; i++){
            if (ensembleSrc[i][0] < largeur){
            this.#image.src = ensembleSrc[Math.max(i-1,0)][2];
            // console.log("Image taille : "+ensembleSrc[Math.max(i-1,0)][0]+"x"+ensembleSrc[Math.max(i-1,0)][1]);
            return;
            }
        }
        this.#image.src = ensembleSrc[ensembleSrc.length-1][2];
        // console.log("Image taille : "+ensembleSrc[Math.max(i-1,0)][0]+"x"+ensembleSrc[Math.max(i-1,0)][1]);
    }
}

export class ImportationModale extends Modale{
    #arrièrePlan = null;
    #conteneur = null;
    #fermerBouton = null;
    #liste = null;
    #items = [];
    static #itemModèle = null;

    constructor(id){
        super(id);
    }

    static async obtenirItemModèle(url){
        if (!this.#itemModèle){
            await fetch(url).then(r => r.text())
                .then(données => {
                    this.#itemModèle = données;
                    
                });
        }
        return this.#itemModèle;
    }

    async initContenus(){
        const modèle = await ImportationModale.obtenirModèle("/javascript/modale/ImportationModale.html");
        this.emplacement.innerHTML = modèle;

        this.#arrièrePlan   = this.emplacement.querySelector("#importation-modale-arrière-plan");
        this.#conteneur     = this.emplacement.querySelector("#importation-modale-conteneur");
        this.#fermerBouton  = this.emplacement.querySelector("#importation-modale-fermer");
        this.#liste         = this.emplacement.querySelector("#importation-modale-liste");

        if (estSurMobile()){
            this.insérerStyle("/javascript/modale/ImportationModaleMobile.css");
        }else{
            this.insérerStyle("/javascript/modale/ImportationModalePC.css");
        }

        this.#conteneur.addEventListener("click", e => e.stopImmediatePropagation());
        this.#arrièrePlan.addEventListener("click", () => this.fermer());
        this.#fermerBouton.addEventListener("click", () => this.fermer());
    }

    async initListe(événements, assocColors){
        // Extrait la liste d'association de la liste des événement. Ainsi, une association qui n'a pas d'événements n'aura pas de lien d'importation.
        const assocs = Array.from(new Set(événements.map(e => e.extendedProps.association)));
        const domaine = location.protocol+"//"+location.hostname+":"+location.port;
        const itemModèle = await ImportationModale.obtenirItemModèle("/javascript/modale/CalendrierImporterItem.html");
        assocs.forEach(asso => {
            if(!(asso in assocColors)){
                console.error("L'association "+assoc+" n'a pas de couleur associée. Le nom du calendrier correspond-il à la clé du dictionnaire dans 'assoc-colors.json'?");
                return;
            }

            const url = domaine+"/abonnement/"+asso+".ical"
            
            const item = document.createElement("li");
            item.innerHTML = itemModèle;
            
            const bouton = item.getElementsByTagName("button")[0];
            const nom = bouton.getElementsByClassName("asso")[0];
            const copie = bouton.getElementsByClassName("copie")[0];
            const lien = bouton.getElementsByTagName("p")[0];

            bouton.addEventListener("click", () => {this.miseÀJourCopie(item);});
            nom.textContent = asso;
            nom.style.backgroundColor = assocColors[asso];
            nom.style.boxShadow = "0.2em 0.3em 0 "+luminositéCouleur(assocColors[asso], -40);
            copie.textContent = '📋';
            lien.textContent = url;

            this.#items.push(item);
            this.#liste.appendChild(item);
        });
    }

    miseÀJourCopie(item){

        this.#items.forEach(i => {
            if (i !== item){
                i.childNodes[0].getElementsByClassName("copie")[0].textContent = '📋';
            }else{
                i.childNodes[0].getElementsByClassName("copie")[0].textContent = '✔';
                try{
                    navigator.clipboard.writeText( i.childNodes[0].getElementsByTagName("p")[0].textContent );
                }catch(e){
                    alert("Une erreur est survenue dans la copie de l'URL. Voici le texte à copier : \n\n"+i.childNodes[0].getElementsByTagName("p")[0].textContent+"\n\nVoici l'erreur :\n\n"+e);
                }
            }
        });
    }
}