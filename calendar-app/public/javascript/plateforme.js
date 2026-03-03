export function estSurMobile() {
    //Détecter si l'appareil est sur mobile
    return navigator.userAgent.indexOf("Android") != -1 || navigator.userAgent.indexOf("like Mac") != -1
}