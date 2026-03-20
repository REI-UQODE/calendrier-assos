let params = new URLSearchParams(location.search);
export let affichage = {
    "filtres":true,
    "btn_importation": true,
    "fc_contrôles":true,
    "fc_mode":"mois",
    "filtres_défaut":null
};

let param_noms = {
    "--couleur-principale":"cp",
    "--couleur-principale-lum-1":"cpl1",
    "--couleur-principale-lum-2":"cpl2",
    "--couleur-principale-sombre-1":"cps1",
    "--couleur-principale-sombre-2":"cps2",
    "--couleur-secondaire":"cs",
    "--couleur-secondaire-lum-1":"csl1",
    "--couleur-secondaire-lum-2":"csl2",
    "--couleur-secondaire-sombre-1":"css1",
    "--couleur-secondaire-sombre-2":"css2",
    "--couleur-tertiaire":"ct",
    "--couleur-tertiaire-lum-1":"ctl1",
    "--couleur-tertiaire-lum-2":"ctl2",
    "--couleur-tertiaire-sombre-1":"cts1",
    "--couleur-tertiaire-sombre-2":"cts2",
    "--couleur-ombre":"co",
    "--couleur-bordure-ombre":"cbo",
    "--arrière-plan":"ap"
};

let noms_params = {
    "cp":   "--couleur-principale",
    "cpl1": "--couleur-principale-lum-1",
    "cpl2": "--couleur-principale-lum-2",
    "cps1": "--couleur-principale-sombre-1",
    "cps2": "--couleur-principale-sombre-2",
    "cs":   "--couleur-secondaire",
    "csl1": "--couleur-secondaire-lum-1",
    "csl2": "--couleur-secondaire-lum-2",
    "css1": "--couleur-secondaire-sombre-1",
    "css2": "--couleur-secondaire-sombre-2",
    "ct":   "--couleur-tertiaire",
    "ctl1": "--couleur-tertiaire-lum-1",
    "ctl2": "--couleur-tertiaire-lum-2",
    "cts1": "--couleur-tertiaire-sombre-1",
    "cts2": "--couleur-tertiaire-sombre-2",
    "co":   "--couleur-ombre",
    "cbo":  "--couleur-bordure-ombre",
    "ap":   "--arrière-plan"
};

function chargerVar(nom){
    if(!params.has(nom)){
        return;
    }

    document.documentElement.style.setProperty(noms_params[nom],params.get(nom));
}

export function faireStyleURL(){
    for(let k in noms_params){
        chargerVar(k);
    }

    if(params.get("pe")){
        document.getElementById("app").style.setProperty("padding","0");
    }

    if(params.get("cf")){
        document.getElementById("filtres").style.setProperty("display","none");
        affichage["filtres"] = false;
    }

    if(params.get("ci")){
        document.getElementById("importation-modale-ouvrir").style.setProperty("display","none");
        affichage["btn_importation"] = false;
    }

    if(params.get("cc")){
        affichage["fc_contrôles"] = false;
    }

    if(params.get("fcmd") == "mois" || params.get("fcmd") == "semaine" || params.get("fcmd") == "jours"){
        affichage["fc_mode"] = params.get("fcmd");
    }

    if(params.get("fd")){
        affichage["filtres_défaut"] = JSON.parse(params.get("fd"));
    }
}