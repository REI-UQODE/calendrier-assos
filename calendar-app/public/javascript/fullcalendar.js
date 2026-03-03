import { Filtres } from "/javascript/filtres/filtres.js";
import { ÉvénementModale,ImportationModale } from "/javascript/modale/modale.js"

async function trouverURLImage(url){
  if (!url){
    return null;
  }

  const parties = url.split("/");
  if (parties[parties.length - 1] !== "tailles.txt"){
    return url;
  }else{
    try{
      const ext = parties[parties.length - 2].split("_").at(-1);
      const nom = parties[parties.length - 2].substring(0, parties[parties.length - 2].length - ext.length - 1);
      const rép = url.substring(0, url.length - parties[parties.length - 1].length - 1);
      const réponse = await fetch(url);
      if (!réponse.ok){
        throw new Error("Impossible de télécharger le registres de tailles de "+parties[parties.length-2]);
      }

      const contenus = await réponse.text();
      const lignes = contenus.split("\n");
      let ensembleSrc = []
      for (let i = 0; i < lignes.length; i++){
        if (lignes[i].length == 0){
          continue;
        }
        let nombres = lignes[i].split("x");
        let source = rép + "/" + nom + "-" + nombres[0] + "." + ext;
        ensembleSrc.push( [parseInt(nombres[0]), parseInt(nombres[1]), source] );
      }

      return ensembleSrc;
    }catch(error){
      console.error(error.message);
      return null;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let eventsData = [];
  let assocColors = {};
  const LOCALE = 'fr-CA';
  const calEl = document.getElementById('calendrier');
  const événementModale = new ÉvénementModale("événement-fenêtre-modale");
  const importationModale = new ImportationModale("importation-modale");
  const filtres = new Filtres();

  // Load colors then events
  fetch('/assoc-colors.json', { cache: 'no-store' })
    .then(r => r.json())
    .then(colors => {
      assocColors = colors;
      return fetch('/events.json', { cache: 'no-store' }).then(r => r.json());
    })
    .then(data => {

      if (!(data instanceof Array)){

        console.error("Le fichier 'events.json' n'est pas bien construit.");
        filtres.vider();
        eventsData = [];
      } else {

        eventsData = data.map(e => {
          try {
            const c = assocColors[e.extendedProps.association] || '#3788d8';
            return { ...e, backgroundColor: c, borderColor: c };
          } catch {
            console.error("Événement mal formé.");
            return null;
          }
        });

        eventsData = eventsData.filter( e => e===null?false:true );
        filtres.initialiserListe(eventsData, assocColors);
        importationModale.initListe(eventsData, assocColors);
      }

      // Calendar
      window.calendar = new FullCalendar.Calendar(calEl, {
        initialView: 'dayGridMonth',
        headerToolbar: { left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay' },
        locale: 'fr',
        firstDay: 1,
        buttonText: { today:'Aujourd’hui', month:'Mois', week:'Semaine', day:'Jour', list:'Liste' },
        weekText: 'Sem.',
        allDayText: 'Toute la journée',
        noEventsText: 'Aucun événement à afficher',

        eventSources: [{
          events: (info, success) => {
            const chosen = filtres.avoirFiltresActifs();
            success(eventsData.filter(e => chosen.includes(e.extendedProps.association)));
          }
        }],

        eventClick: async info => {
          const e = info.event;

          const fmtDate = d => d?.toLocaleDateString(LOCALE, { year:'numeric', month:'long', day:'numeric' });
          const fmtTime = d => d?.toLocaleTimeString(LOCALE, { hour:'2-digit', minute:'2-digit' });
          const sameDay = e.end && e.start && e.start.toDateString() === e.end.toDateString();

          const dateStr = e.allDay
            ? fmtDate(e.start)
            : (e.end && !sameDay ? `${fmtDate(e.start)} → ${fmtDate(e.end)}` : fmtDate(e.start));

          const timeStr = e.allDay
            ? 'Toute la journée'
            : `${fmtTime(e.start)}${e.end ? ` → ${fmtTime(e.end)}` : ''}`;
          
          let modaleContenu = {
            "titre": e.title,
            "date": dateStr,
            "heure": timeStr,
            "adresse": e.extendedProps.location || '—',
            "description": e.extendedProps.description || '',
            "image": await trouverURLImage(e.extendedProps.image),
            "lien-inscription": e.extendedProps.registrationLink || e.url,

            "couleur": assocColors[e.extendedProps.association],
          }

          événementModale.changerContenu(modaleContenu);
          événementModale.ouvrir();
        }
      });

      calendar.render();
    })
    .catch(err => console.error('Loading error:', err));

    document.getElementById("importation-modale-ouvrir").addEventListener("click", () => importationModale.ouvrir());
});

