export class Onglet{
    #emplacement = null;
    static #url = "";
    static #modèle = null;

    static async obtenirModèle(){
        if (!this.#modèle){
            await fetch(this.#url).then(r => r.text())
                .then(données => {
                    this.#modèle = données;
                });
        }
        return this.#modèle;
    }

    constructor(emplacement, url){
        this.#emplacement = emplacement;
        this.#url = url;
    }

    afficher() {
        this.#emplacement.innerHTML = Onglet.avoirModèle();
    }
}