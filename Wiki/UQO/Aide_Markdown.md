# Aide Markdown

- [Aide Markdown](#aide-markdown)
  - [Markdown](#markdown)
  - [Paragraphes](#paragraphes)
  - [Titres](#titres)
  - [Formattage](#formattage)
  - [Bloc de citation](#bloc-de-citation)
  - [Listes](#listes)
  - [Diviseurs](#diviseurs)
  - [Images](#images)
  - [Liens](#liens)
  - [Tableaux](#tableaux)
  - [HTML](#html)


## Markdown

Les événements du calendrier supportent le formatage Markdown dans l'application Web. Ce formattage peut aider à rendre le texte plus lisible dans certaines applications, en format texte pur, mais il demeurera affiché en format brut dans toute autre application que l'application web.

Le Markdown est un langage de formattage de texte léger mais puissant. Ce document est par exemple écrit en Markdown.

Voici une petite démonstration des capacités de l'application web :

# Titre <!-- omit in toc -->

## Sous-titre <!-- omit in toc -->

Paragraphe *italique*, **gras**, ***italique gras***, ~~barré~~, `code`

Paragraphe

---

Paragraphe divisé

> Citation
> > Citation dans une citation

- Liste
- Liste
  - Liste
    - Liste

1. Liste
2. Liste

- [ ] Liste
- [ ] Liste
- [x] Liste
- [x] Liste

- Lien : <https://calendrier.rei-uqode.ca>
- Courriel : <uqode@uqo.ca>
- [Lien caché](https://calendrier.rei-uqode.ca)

### Image <!-- omit in toc -->

![Texte alternatif](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F30994370%2Fpexels-photo-30994370.jpeg%3Fcs%3Dsrgb%26dl%3Dpexels-optical-chemist-340351297-30994370.jpg%26fm%3Djpg&f=1&nofb=1&ipt=b072acc34316a0905d7ea32c2e0ffeca030c4097e487e0990b39226cf5c52db1)

### Tableau <!-- omit in toc -->

| A | B | C |
|:--|:-:|--:|
| 1 | 2 | 3 |
| 4 | 5 | 6 |

### Version brute :  <!-- omit in toc -->

```Markdown
# Titre <!-- omit in toc -->

## Sous-titre <!-- omit in toc -->

Paragraphe *italique*, **gras**, ***italique gras***, ~~barré~~, `code`

Paragraphe

---

Paragraphe divisé

> Citation
> > Citation dans une citation

- Liste
- Liste
  - Liste
    - Liste

1. Liste
2. Liste

- [ ] Liste
- [ ] Liste
- [x] Liste
- [x] Liste

- Lien : <https://calendrier.rei-uqode.ca>
- Courriel : <uqode@uqo.ca>
- [Lien caché](https://calendrier.rei-uqode.ca)

### Image <!-- omit in toc -->

![Texte alternatif](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F30994370%2Fpexels-photo-30994370.jpeg%3Fcs%3Dsrgb%26dl%3Dpexels-optical-chemist-340351297-30994370.jpg%26fm%3Djpg&f=1&nofb=1&ipt=b072acc34316a0905d7ea32c2e0ffeca030c4097e487e0990b39226cf5c52db1)

### Tableau <!-- omit in toc -->

| A | B | C |
|:--|:-:|--:|
| 1 | 2 | 3 |
| 4 | 5 | 6 |
```

## Paragraphes

Ceci est un paragraphe
sur plusieurs lignes
qui n'apparaît que sur
une ligne.

Ceci est un deuxième
paragraphe qui est
séparé du premier

Ceci est un troisième paragraphe <br>
contenant un retour à la ligne

```Markdown
Ceci est un paragraphe
sur plusieurs lignes
qui n'apparaît que sur
une ligne.

Ceci est un deuxième
paragraphe qui est
séparé du premier

Ceci est un troisième paragraphe <br>
contenant un retour à la ligne
```

## Titres

# Titre 1 <!-- omit in toc -->
## Titre 2 <!-- omit in toc -->
### Titre 3 <!-- omit in toc -->
#### Titre 4 <!-- omit in toc -->
##### Titre 5 <!-- omit in toc -->
###### Titre 6 <!-- omit in toc -->

Titre 1 <!-- omit in toc -->
=======

Titre 2 <!-- omit in toc -->
-------

```Markdown
# Titre 1
## Titre 2
### Titre 3
#### Titre 4
##### Titre 5
###### Titre 6

Titre 1
=======

Titre 2
-------
```

## Formattage

- `**Gras**` **Gras**
- `__Gras__` __Gras__
- `*Italique*` *Italique*
- `_Italique_` _Italique_
- `~~barré~~` ~~barré~~
- ``` `bloc de code` ``` `bloc de code`
- ` ``` ` bloc de code multiligne
- ` ```python ` bloc de code multiligne avec couleurs de syntaxe 
- La combinaison des effets est permise.

## Bloc de citation

> Ceci est une citation
> d'un personnage important.
> > Il fut un temps où on l'écoutait,
> > > Mais ce temps est révolus.


```Markdown
> Ceci est une citation
> d'un personnage important.
> > Il fut un temps où on l'écoutait,
> > > Mais ce temps est révolus.
```

## Listes

- Pommes
- Bannanes
- Oranges

---

* Crayon
* Papier
* Couteau

---

+ Portable
+ Téléphone
+ Souris

---

- Maison
  * Nourriture
    + Argent
- Manoir

---

- [ ] A
- [ ] B
- [x] C
- [x] D

---

1. Canada
2. Finlande
3. États-Unis
4. Tchèquie

---

1. Premier arrivé
   1. Premier servi
   2. Pas dernier
2. Dernier arrivé
   1. Dernier Servi

```Markdown
- Pommes
- Bannanes
- Oranges

---

* Crayon
* Papier
* Couteau

---

+ Portable
+ Téléphone
+ Souris

---

- Maison
  * Nourriture
    + Argent
- Manoir

---

- [ ] A
- [ ] B
- [x] C
- [x] D

---

1. Canada
2. Finlande
3. États-Unis
4. Tchèquie

---

1. Premier arrivé
   1. Premier servi
   2. Pas dernier
2. Dernier arrivé
   1. Dernier Servi
```

## Diviseurs

***

---

___

```Markdown
***

---

___
```

## Images

![Insérer du texte de remplacement](./Image.png)

```Markdown
![Insérer du texte de remplacement](./Image.png)
```

## Liens

[Wikipédia](https://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Accueil_principal)

<https://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Accueil_principal>

<courriel@exemple.ca>

[Début du document](#python-aide-mémoire)

[lien réutilisable][1]

[lien réutilisable][1]

[lien réutilisable][1]

[1]: https://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Accueil_principal

```Markdown
[Wikipédia](https://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Accueil_principal)

<https://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Accueil_principal>

<courriel@exemple.ca>

[Début du document](#python-aide-mémoire)

[lien réutilisable][1]

[lien réutilisable][1]

[lien réutilisable][1]

[1]: https://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Accueil_principal
```

## Tableaux

| Gauche | Droite | Centre |
|:-------|-------:|:------:|
| A      | B      | C      |
| A      | B      | C      |
| A      | B      | C      |
| A      | B      | C      |
| A      | B      | C      |

```Markdown
| Gauche | Droite | Centre |
|:-------|-------:|:------:|
| A      | B      | C      |
| A      | B      | C      |
| A      | B      | C      |
| A      | B      | C      |
| A      | B      | C      |
```

## HTML

Le markdown est pleinement compatible avec le HTML :

<style>
    .carré{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        width:600px;
        height:600px;
        background-image:linear-gradient(10deg,#73B,#58B,#E37);
        border-radius: 40px;
        box-shadow: 0.5em 0.5em 1.5em #0009
    }
    .soleil{
        width:150px;
        height:150px;
        background-color: rgb(253, 205, 138);
        border-radius: 50%;
        box-shadow: 0 0 100px rgb(255, 132, 0);
    }
    .carré h1{
        color: rgb(253, 205, 138);
    }
</style>

<div style="display:flex; justify-content: center; margin: 50px;">
    <div class="carré">
        <h1>LE SOLEIL</h1>
        <div class="soleil"></div>
    </div>
</div>

```html
<style>
    .carré{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        width:600px;
        height:600px;
        background-image:linear-gradient(10deg,#73B,#58B,#E37);
        border-radius: 40px;
        box-shadow: 0.5em 0.5em 1.5em #0009
    }
    .soleil{
        width:150px;
        height:150px;
        background-color: rgb(253, 205, 138);
        border-radius: 50%;
        box-shadow: 0 0 100px rgb(255, 132, 0);
    }
    .carré h1{
        color: rgb(253, 205, 138);
    }
</style>

<div style="display:flex; justify-content: center">
    <div class="carré">
        <h1>LE SOLEIL</h1>
        <div class="soleil"></div>
    </div>
</div>
```