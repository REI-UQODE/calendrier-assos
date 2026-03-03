import { estSurMobile } from "/javascript/plateforme.js";
import { luminositéCouleur } from "/javascript/utilitaires.js";

export class Filtres{
    #emplacement = document.getElementById("filtres");
    #contenu = `
        <div id="étiquette-filtres">Filtres :</div>
        <div id="filtres-liste">Chargement des filtres</div>
    `;

    #liste = null;
    #boutons = [];
    #filtresActifs = {};

    constructor(){
        this.#emplacement.innerHTML = this.#contenu;
        this.#liste = this.#emplacement.querySelector("#filtres-liste");

        const style = document.createElement("link");
        style.rel = "stylesheet";
        if(estSurMobile()){
            style.href = "/javascript/filtres/filtresMobile.css";
        }else{
            style.href = "/javascript/filtres/filtresPC.css";
        }
        document.getElementsByTagName("head")[0].appendChild(style);
    }

    initialiserListe(événements, assocColors){
        // Extrait la liste d'association de la liste des événement. Ainsi, une association qui n'a pas d'événements n'aura pas de bouton de filtre en haut.
        const assocs = Array.from(new Set(événements.map(e => e.extendedProps.association)));
        this.#liste.innerHTML = '';
        assocs.forEach(assoc => {

          if(!(assoc in assocColors)){
            console.error("L'association "+assoc+" n'a pas de couleur associée. Le nom du calendrier correspond-il à la clé du dictionnaire dans 'assoc-colors.json'?");
            return;
          }

          const id = `f-${assoc}`;
          const cb = document.createElement('div');
          cb.id = id;
          cb.classList.add("filtres-bouton");
          cb.innerText = assoc;
          cb.style.background = assocColors[assoc];
          cb.style.boxShadow = "0.2em 0.3em 0 "+luminositéCouleur(assocColors[assoc],-40);

          this.#liste.append(cb);

          cb.addEventListener('change', () => calendar.refetchEvents());
          cb.addEventListener('click', () => this.boutonClique(cb));

          this.#boutons.push(cb);
          this.#filtresActifs[id] = true;
        });
    }

    vider(){
        this.#liste.innerHTML = "";
    }

    boutonClique(bouton){
        console.log("clique");
        if (this.#filtresActifs[bouton.id]){
            this.#filtresActifs[bouton.id] = false;
            bouton.style.opacity = "0.5";
        }else {
            this.#filtresActifs[bouton.id] = true;
            bouton.style.opacity = "1";
        }

        calendar.refetchEvents();
    }

    avoirFiltresActifs(){
        let actifs = [];
        for (const [clée, valeur] of Object.entries(this.#filtresActifs)){
            if (valeur){
                actifs.push(clée.substring(2));
            }
        }
        return actifs;
    }

}