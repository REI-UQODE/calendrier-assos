/**
 * Rediriges l'utilisateur vers une nouvelle page.
 * 
 * @param {string} url chemin absolu de la nouvelle page.
 */
export function rediriger(url){
  if (location.pathname === url){
    return;
  }
  let domaine = location.protocol+"//"+location.hostname+":"+location.port;
  location.replace(domaine+url+location.search);
}

// Prend un string représentant une couleur et renvoie une liste sur le format RGB 0-255
export function lireCouleur(couleur){
  let RGB = [0,0,0]

  // Extraire les valeurs RGB en format #RRGGBB ou rgb(r, g, b)
  if (couleur[0] === "#"){
    RGB[0] = parseInt(couleur.substring(1,3),16);
    RGB[1] = parseInt(couleur.substring(3,5),16);
    RGB[2] = parseInt(couleur.substring(5,7),16);
  } else {
    numéros = couleur.split("(")[1].split(")")[0].replace(" ","").split(","); // "rgb(A, B, C)"" → [A,B,C]
    RGB[0] = parseFloat(numéros[0])*255;
    RGB[1] = parseFloat(numéros[1])*255;
    RGB[2] = parseFloat(numéros[2])*255;
  }

  return RGB;
}

// Prend une liste sur le format RGB 0-255 et renvoie un string sur le format #RRGGBB
export function RGB2String(RGB){
  let rgb = RGB;

  rgb[0] = Math.round(rgb[0]).toString(16);
  rgb[1] = Math.round(rgb[1]).toString(16);
  rgb[2] = Math.round(rgb[2]).toString(16);

  rgb[0] = ( rgb[0].length == 1 )? "0"+rgb[0] : rgb[0];
  rgb[1] = ( rgb[1].length == 1 )? "0"+rgb[1] : rgb[1];
  rgb[2] = ( rgb[2].length == 1 )? "0"+rgb[2] : rgb[2];

  return "#"+rgb[0]+rgb[1]+rgb[2];
}

// Modifie la luminosité d'une couleur
export function luminositéCouleur(couleur, lumPourcent){
  let RGB = lireCouleur(couleur);

  // Manipulation
  RGB[0] = RGB[0] * (100 + lumPourcent) / 100;
  RGB[1] = RGB[1] * (100 + lumPourcent) / 100;
  RGB[2] = RGB[2] * (100 + lumPourcent) / 100;

  // Limitation en-dessous de 255
  RGB[0] = RGB[0]<255? RGB[0] : 255;
  RGB[1] = RGB[1]<255? RGB[1] : 255;
  RGB[2] = RGB[2]<255? RGB[2] : 255;

  return RGB2String(RGB);
}