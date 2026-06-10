const JS_MODULES = [
  {
    id: 701,
    title: 'Variables & Types',
    icon: '🟨',
    level: 'Débutant',
    colorHex: '#F7DF1E',
    description: 'var, let, const, types primitifs, typeof, coercition.',
    lessons: [
      {
        title: 'Déclarations & Types',
        content: `## Variables & Types JavaScript

### var / let / const
\`\`\`js
var ancien = "éviter"      // portée fonction, hoisting
let compteur = 0           // portée bloc, réassignable
const PI = 3.14159         // portée bloc, non-réassignable
\`\`\`

> ✅ Règle d'or : toujours \`const\` par défaut, \`let\` si besoin de réassigner, jamais \`var\`.

### Types primitifs
\`\`\`js
typeof 42          // "number"
typeof "hello"     // "string"
typeof true        // "boolean"
typeof undefined   // "undefined"
typeof null        // "object"  ← bug historique JS !
typeof {}          // "object"
typeof []          // "object"
typeof function(){} // "function"
\`\`\`

### Coercition de types
\`\`\`js
"5" + 3     // "53"  (string concat)
"5" - 3     // 2     (coercition numérique)
"5" == 5    // true  (== fait coercition)
"5" === 5   // false (=== strict, toujours utiliser ça)
Boolean("")  // false
Boolean(0)   // false
Boolean(null) // false
Number("42") // 42
String(100)  // "100"
\`\`\`
`,
        links: [{ url: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Data_structures', label: 'Types MDN' }],
      },
    ],
    exercises: [],
  },
  {
    id: 702,
    title: 'Strings & Template Literals',
    icon: '🔤',
    level: 'Débutant',
    colorHex: '#F7DF1E',
    description: 'Méthodes string, template literals, destructuring.',
    lessons: [
      {
        title: 'Strings JS',
        content: `## Chaînes en JavaScript

### Template literals (ES6)
\`\`\`js
const nom = "Alice"
const age = 30
console.log(\`Bonjour \${nom}, tu as \${age} ans !\`)
console.log(\`2 + 2 = \${2 + 2}\`)

// Multiline
const message = \`
  Première ligne
  Deuxième ligne
\`
\`\`\`

### Méthodes essentielles
\`\`\`js
"  hello  ".trim()            // "hello"
"hello".toUpperCase()         // "HELLO"
"WORLD".toLowerCase()         // "world"
"hello world".split(" ")      // ["hello", "world"]
["a","b","c"].join("-")       // "a-b-c"
"hello world".includes("world") // true
"hello".startsWith("he")      // true
"hello".endsWith("lo")        // true
"hello".replace("l", "L")     // "heLlo"
"hello".replaceAll("l", "L")  // "heLLo"
"hello world".indexOf("world") // 6
"abc".repeat(3)               // "abcabcabc"
"hello".slice(1, 4)           // "ell"
"hello".padStart(8, "0")      // "000hello"
\`\`\`

### Destructuring sur strings
\`\`\`js
const [premier, ...reste] = "hello"
// premier = "h", reste = ["e","l","l","o"]
\`\`\`
`,
        links: [],
      },
    ],
    exercises: [],
  },
  {
    id: 703,
    title: 'Arrays & Méthodes',
    icon: '📋',
    level: 'Débutant',
    colorHex: '#F7DF1E',
    description: 'map, filter, reduce, find, forEach, spread, destructuring.',
    lessons: [
      {
        title: 'Arrays fonctionnels',
        content: `## Arrays JavaScript

### Création & accès
\`\`\`js
const fruits = ["pomme", "banane", "cerise"]
fruits[0]          // "pomme"
fruits.at(-1)      // "cerise"  (nouveau)
fruits.length      // 3
\`\`\`

### Méthodes de transformation (retournent un nouveau tableau)
\`\`\`js
const nombres = [1, 2, 3, 4, 5]

// map — transformer chaque élément
nombres.map(n => n * 2)         // [2, 4, 6, 8, 10]

// filter — garder si condition true
nombres.filter(n => n % 2 === 0) // [2, 4]

// reduce — agréger
nombres.reduce((acc, n) => acc + n, 0) // 15

// find — premier élément qui correspond
nombres.find(n => n > 3)         // 4

// findIndex
nombres.findIndex(n => n > 3)    // 3

// every / some
nombres.every(n => n > 0)        // true
nombres.some(n => n > 4)         // true

// flat / flatMap
[[1,2],[3,4]].flat()             // [1,2,3,4]
\`\`\`

### Mutation (modifient l'original)
\`\`\`js
fruits.push("kiwi")       // ajoute en fin
fruits.pop()              // supprime le dernier
fruits.unshift("mangue")  // ajoute au début
fruits.shift()            // supprime le premier
fruits.splice(1, 1)       // supprime 1 élément à index 1
fruits.sort()
fruits.reverse()
\`\`\`

### Spread & Destructuring
\`\`\`js
const [a, b, ...reste] = [1, 2, 3, 4]
const copy = [...fruits]
const merged = [...arr1, ...arr2]
\`\`\`
`,
        links: [],
      },
    ],
    exercises: [],
  },
  {
    id: 704,
    title: 'Objets & Destructuring',
    icon: '📦',
    level: 'Débutant',
    colorHex: '#F7DF1E',
    description: 'Créer, accéder, déstructurer, spread operator, méthodes.',
    lessons: [
      {
        title: 'Objets JS',
        content: `## Objets JavaScript

### Création
\`\`\`js
const personne = {
  nom: "Alice",
  age: 30,
  saluer() {
    return \`Bonjour, je suis \${this.nom}\`
  }
}
\`\`\`

### Accès
\`\`\`js
personne.nom          // "Alice"
personne["age"]       // 30
personne.email ?? "N/A"  // "N/A" (nullish coalescing)
\`\`\`

### Destructuring
\`\`\`js
const { nom, age, ville = "Paris" } = personne
// ville a une valeur par défaut

// Renommer
const { nom: prenom } = personne  // prenom = "Alice"

// Dans les paramètres de fonction
function afficher({ nom, age }) {
  console.log(\`\${nom} : \${age} ans\`)
}
\`\`\`

### Spread & Object methods
\`\`\`js
const copie = { ...personne }
const etendu = { ...personne, email: "a@b.fr" }

Object.keys(personne)    // ["nom", "age"]
Object.values(personne)  // ["Alice", 30]
Object.entries(personne) // [["nom","Alice"],["age",30]]

Object.assign({}, personne, { age: 31 })
\`\`\`

### Optional chaining
\`\`\`js
const ville = personne?.adresse?.ville  // undefined (pas d'erreur)
const lon = personne?.adresse?.coordonnees?.[0]
\`\`\`
`,
        links: [],
      },
    ],
    exercises: [],
  },
  {
    id: 705,
    title: 'Conditions & Boucles',
    icon: '🔀',
    level: 'Débutant',
    colorHex: '#F7DF1E',
    description: 'if/else, switch, ternaire, for...of, while, break.',
    lessons: [
      {
        title: 'Contrôle du flux',
        content: `## Conditions & Boucles

### if / else / ternaire
\`\`\`js
const age = 20
if (age >= 18) {
  console.log("Majeur")
} else if (age >= 13) {
  console.log("Ado")
} else {
  console.log("Enfant")
}

const statut = age >= 18 ? "majeur" : "mineur"
\`\`\`

### switch
\`\`\`js
switch (jour) {
  case "lundi":
  case "mardi":
    console.log("Début de semaine")
    break
  case "vendredi":
    console.log("TGIF !")
    break
  default:
    console.log("Autre jour")
}
\`\`\`

### Boucles
\`\`\`js
// for classique
for (let i = 0; i < 5; i++) { ... }

// for...of — itérer sur les valeurs
for (const fruit of fruits) { console.log(fruit) }

// for...in — itérer sur les clés d'objet
for (const cle in personne) { console.log(cle) }

// forEach
fruits.forEach((fruit, index) => {
  console.log(index, fruit)
})

// while
let n = 0
while (n < 5) { n++ }

// do...while (s'exécute au moins 1 fois)
do { n++ } while (n < 10)
\`\`\`
`,
        links: [],
      },
    ],
    exercises: [],
  },
  {
    id: 706,
    title: 'Fonctions & Arrow Functions',
    icon: '⚡',
    level: 'Débutant',
    colorHex: '#F7DF1E',
    description: 'function, arrow, default params, rest, IIFE, hoisting.',
    lessons: [
      {
        title: 'Fonctions ES6',
        content: `## Fonctions JavaScript

### Déclaration vs Expression vs Arrow
\`\`\`js
// Déclaration (hoistée)
function saluer(nom) {
  return \`Bonjour \${nom}\`
}

// Expression
const saluer2 = function(nom) {
  return \`Bonjour \${nom}\`
}

// Arrow (ES6) — pas de this propre
const saluer3 = (nom) => \`Bonjour \${nom}\`
const double = n => n * 2         // param unique → pas de ()
const carre = n => {              // bloc → return explicite
  const res = n * n
  return res
}
\`\`\`

### Paramètres
\`\`\`js
// Valeur par défaut
function saluer(nom = "inconnu") { ... }

// Rest params
function somme(...nombres) {
  return nombres.reduce((a, b) => a + b, 0)
}
somme(1, 2, 3, 4)  // 10

// Destructuring en param
const aire = ({ largeur, hauteur }) => largeur * hauteur
\`\`\`

### IIFE — fonction auto-exécutée
\`\`\`js
;(function() {
  console.log("Exécuté immédiatement !")
})()
\`\`\`

### Higher-order functions
\`\`\`js
const appliquer = (fn, valeur) => fn(valeur)
appliquer(x => x * 3, 5)  // 15
\`\`\`
`,
        links: [],
      },
    ],
    exercises: [],
  },
  {
    id: 707,
    title: 'DOM — Manipulation',
    icon: '🌳',
    level: 'Intermédiaire',
    colorHex: '#61DAFB',
    description: 'querySelector, innerHTML, créer/supprimer des nœuds.',
    lessons: [
      {
        title: 'DOM API',
        content: `## Le DOM (Document Object Model)

### Sélectionner des éléments
\`\`\`js
document.getElementById("monId")
document.querySelector(".ma-classe")       // premier
document.querySelectorAll("li")            // NodeList
document.querySelector("nav a.active")
\`\`\`

### Lire & modifier le contenu
\`\`\`js
const titre = document.querySelector("h1")
titre.textContent = "Nouveau titre"   // texte seulement
titre.innerHTML = "Titre <em>stylé</em>"  // HTML (attention XSS)

const input = document.querySelector("input")
input.value            // valeur actuelle
input.value = "défaut"
\`\`\`

### Classes & attributs
\`\`\`js
el.classList.add("actif")
el.classList.remove("actif")
el.classList.toggle("actif")
el.classList.contains("actif")  // true/false

el.setAttribute("data-id", "42")
el.getAttribute("href")
el.removeAttribute("disabled")
\`\`\`

### Créer & insérer des nœuds
\`\`\`js
const li = document.createElement("li")
li.textContent = "Nouvel élément"
li.className = "item"
document.querySelector("ul").appendChild(li)

// insertAdjacentHTML — plus rapide
ul.insertAdjacentHTML("beforeend", \`<li class="item">Élément</li>\`)
\`\`\`

### Styles
\`\`\`js
el.style.color = "red"
el.style.display = "none"
el.style.cssText = "color: red; font-size: 20px;"
\`\`\`
`,
        links: [{ url: 'https://developer.mozilla.org/fr/docs/Web/API/Document', label: 'DOM API MDN' }],
      },
    ],
    exercises: [],
  },
  {
    id: 708,
    title: 'Events',
    icon: '🖱️',
    level: 'Intermédiaire',
    colorHex: '#61DAFB',
    description: 'addEventListener, event object, propagation, delegation.',
    lessons: [
      {
        title: 'Événements',
        content: `## Événements JavaScript

### addEventListener
\`\`\`js
const btn = document.querySelector("#mon-btn")

btn.addEventListener("click", (e) => {
  console.log("Cliqué !", e.target)
})

btn.addEventListener("click", handleClick)
btn.removeEventListener("click", handleClick)
\`\`\`

### L'objet event
\`\`\`js
document.addEventListener("keydown", (e) => {
  console.log(e.key, e.code, e.ctrlKey)
  if (e.key === "Enter") { ... }
})

form.addEventListener("submit", (e) => {
  e.preventDefault()   // empêche le rechargement
  const data = new FormData(e.target)
  console.log(Object.fromEntries(data))
})
\`\`\`

### Propagation : bubbling & capturing
\`\`\`js
// stopPropagation — stoppe la remontée
btn.addEventListener("click", (e) => {
  e.stopPropagation()
})

// capturing (3ème arg = true)
document.addEventListener("click", fn, true)
\`\`\`

### Délégation d'événements
\`\`\`js
// Attacher sur le parent pour gérer les enfants dynamiques
document.querySelector("ul").addEventListener("click", (e) => {
  if (e.target.matches("li")) {
    console.log("li cliqué :", e.target.textContent)
  }
})
\`\`\`

### Événements utiles
\`\`\`
click, dblclick, mouseenter, mouseleave
keydown, keyup, keypress
focus, blur, change, input, submit
DOMContentLoaded, load, resize, scroll
\`\`\`
`,
        links: [],
      },
    ],
    exercises: [],
  },
  {
    id: 709,
    title: 'Closures & Scope',
    icon: '🔒',
    level: 'Intermédiaire',
    colorHex: '#61DAFB',
    description: 'Portée lexicale, closures, hoisting, IIFE, module pattern.',
    lessons: [
      {
        title: 'Closures',
        content: `## Closures & Portée lexicale

### Portée (scope)
\`\`\`js
let globale = "global"

function externe() {
  let locale = "externe"

  function interne() {
    let plus_interne = "interne"
    console.log(globale)   // ✅ accessible
    console.log(locale)    // ✅ accessible (closure)
  }

  // console.log(plus_interne) // ❌ ReferenceError
}
\`\`\`

### Closure — capturer l'environnement
\`\`\`js
function compteur(debut = 0) {
  let n = debut
  return {
    incrementer: () => ++n,
    decrementer: () => --n,
    valeur: () => n
  }
}

const c = compteur(10)
c.incrementer()  // 11
c.incrementer()  // 12
c.valeur()       // 12
\`\`\`

### Cas classique — factory function
\`\`\`js
function multiplicateur(facteur) {
  return (n) => n * facteur
}

const double = multiplicateur(2)
const triple = multiplicateur(3)
double(5)  // 10
triple(5)  // 15
\`\`\`

### Piège classique avec var dans une boucle
\`\`\`js
// ❌ Bug : affiche 5 cinq fois
for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 100)
}

// ✅ Correction avec let (portée bloc)
for (let i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 100)
}
\`\`\`
`,
        links: [],
      },
    ],
    exercises: [],
  },
  {
    id: 710,
    title: 'Classes & Prototypes',
    icon: '🏗️',
    level: 'Intermédiaire',
    colorHex: '#61DAFB',
    description: 'class, constructor, héritage, static, getters/setters.',
    lessons: [
      {
        title: 'Classes ES6',
        content: `## Classes JavaScript

### Définition
\`\`\`js
class Animal {
  #nom  // champ privé (ES2022)

  constructor(nom, son) {
    this.#nom = nom
    this.son = son
  }

  get nom() { return this.#nom }

  parler() {
    return \`\${this.#nom} dit \${this.son}\`
  }

  static creer(nom, son) {
    return new Animal(nom, son)
  }

  toString() {
    return \`Animal(\${this.#nom})\`
  }
}

const chat = new Animal("Minou", "Miaou")
chat.parler()  // "Minou dit Miaou"
Animal.creer("Rex", "Woof")
\`\`\`

### Héritage
\`\`\`js
class Chien extends Animal {
  constructor(nom, race) {
    super(nom, "Woof !")
    this.race = race
  }

  rapporter() {
    return \`\${this.nom} rapporte la balle !\`
  }
}

const rex = new Chien("Rex", "Labrador")
rex.parler()     // "Rex dit Woof !"
rex.rapporter()  // "Rex rapporte la balle !"
rex instanceof Animal  // true
\`\`\`

### Getters & Setters
\`\`\`js
class Temperature {
  #celsius

  constructor(c) { this.#celsius = c }

  get fahrenheit() { return this.#celsius * 9/5 + 32 }
  set celsius(val) {
    if (val < -273.15) throw new Error("Trop froid !")
    this.#celsius = val
  }
}
\`\`\`
`,
        links: [],
      },
    ],
    exercises: [],
  },
  {
    id: 711,
    title: 'Promises & Async/Await',
    icon: '⏳',
    level: 'Intermédiaire',
    colorHex: '#61DAFB',
    description: 'Event loop, callbacks, Promises, async/await, error handling.',
    lessons: [
      {
        title: 'Asynchrone JS',
        content: `## Asynchrone JavaScript

### Le problème des callbacks
\`\`\`js
// "Callback hell"
getData(function(a) {
  processA(a, function(b) {
    processB(b, function(c) {
      console.log(c)  // ← difficile à lire
    })
  })
})
\`\`\`

### Promises
\`\`\`js
const promesse = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.5) resolve("Succès !")
    else reject(new Error("Échec !"))
  }, 1000)
})

promesse
  .then(result => console.log(result))
  .catch(err => console.error(err))
  .finally(() => console.log("Terminé"))

// Promise.all — attendre plusieurs
Promise.all([fetch("/a"), fetch("/b")])
  .then(([resA, resB]) => { ... })

// Promise.allSettled — même si certaines échouent
Promise.allSettled([p1, p2, p3])
  .then(results => results.forEach(r => console.log(r.status)))
\`\`\`

### async / await — syntaxe moderne
\`\`\`js
async function chargerDonnees() {
  try {
    const resp = await fetch("https://api.exemple.com/data")
    if (!resp.ok) throw new Error(\`HTTP \${resp.status}\`)
    const data = await resp.json()
    return data
  } catch (err) {
    console.error("Erreur :", err)
    throw err
  }
}

// Arrow async
const getData = async (url) => {
  const r = await fetch(url)
  return r.json()
}
\`\`\`
`,
        links: [{ url: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Using_promises', label: 'Promises MDN' }],
      },
    ],
    exercises: [],
  },
  {
    id: 712,
    title: 'Fetch & JSON',
    icon: '🌐',
    level: 'Intermédiaire',
    colorHex: '#61DAFB',
    description: 'fetch API, méthodes HTTP, headers, body, gestion d\'erreurs.',
    lessons: [
      {
        title: 'Fetch API',
        content: `## Fetch API

### GET
\`\`\`js
const resp = await fetch("https://jsonplaceholder.typicode.com/todos/1")
const todo = await resp.json()
console.log(todo.title)
\`\`\`

### POST avec JSON
\`\`\`js
const resp = await fetch("https://api.exemple.com/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer TOKEN"
  },
  body: JSON.stringify({ nom: "Alice", age: 30 })
})

if (!resp.ok) {
  throw new Error(\`Erreur HTTP : \${resp.status}\`)
}
const user = await resp.json()
\`\`\`

### Fonction réutilisable
\`\`\`js
async function apiCall(url, options = {}) {
  const resp = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  })
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}))
    throw Object.assign(new Error(err.message ?? "API Error"), { status: resp.status })
  }
  return resp.status === 204 ? null : resp.json()
}

// Usage
const users = await apiCall("/api/users")
const newUser = await apiCall("/api/users", {
  method: "POST",
  body: { nom: "Bob" }
})
\`\`\`

### Autres méthodes response
\`\`\`js
resp.text()    // string
resp.blob()    // fichiers, images
resp.headers.get("Content-Type")
resp.status    // 200, 404...
resp.ok        // true si 2xx
\`\`\`
`,
        links: [{ url: 'https://developer.mozilla.org/fr/docs/Web/API/Fetch_API', label: 'Fetch MDN' }],
      },
    ],
    exercises: [],
  },
  {
    id: 713,
    title: 'ES6+ Modules',
    icon: '📦',
    level: 'Avancé',
    colorHex: '#AA7DCE',
    description: 'import/export, named vs default, dynamic import, bundlers.',
    lessons: [
      {
        title: 'Modules ES6',
        content: `## Modules JavaScript (ESM)

### Export
\`\`\`js
// utils.js
export const PI = 3.14159

export function doubler(n) {
  return n * 2
}

export class Calculatrice {
  additionner(a, b) { return a + b }
}

// Export par défaut (un seul par fichier)
export default function principale() {
  console.log("Fonction principale")
}
\`\`\`

### Import
\`\`\`js
// Import named
import { PI, doubler } from "./utils.js"

// Import avec alias
import { doubler as x2 } from "./utils.js"

// Import tout
import * as utils from "./utils.js"
utils.doubler(5)

// Import default
import principale from "./utils.js"

// Import default + named
import principale, { PI, doubler } from "./utils.js"
\`\`\`

### Dynamic import (lazy loading)
\`\`\`js
const btn = document.querySelector("#load")
btn.addEventListener("click", async () => {
  const { graphique } = await import("./heavy-chart.js")
  graphique.render()
})
\`\`\`

### Re-export (barrel file)
\`\`\`js
// index.js — point d'entrée centralisé
export { default as Button } from "./Button.js"
export { default as Modal } from "./Modal.js"
export { formatDate } from "./utils.js"
\`\`\`
`,
        links: [],
      },
    ],
    exercises: [],
  },
  {
    id: 714,
    title: 'Error Handling',
    icon: '🚨',
    level: 'Avancé',
    colorHex: '#AA7DCE',
    description: 'try/catch/finally, Error types, custom errors, unhandledRejection.',
    lessons: [
      {
        title: 'Gestion d\'erreurs',
        content: `## Gestion des erreurs JS

### try / catch / finally
\`\`\`js
try {
  const data = JSON.parse("texte invalide")
} catch (e) {
  if (e instanceof SyntaxError) {
    console.error("JSON invalide :", e.message)
  } else {
    throw e  // re-lancer si inconnu
  }
} finally {
  console.log("Toujours exécuté")
}
\`\`\`

### Types d'erreurs natifs
\`\`\`js
new Error("message générique")
new TypeError("mauvais type")
new RangeError("hors limites")
new ReferenceError("var inexistante")
new SyntaxError("syntaxe invalide")
\`\`\`

### Erreurs personnalisées
\`\`\`js
class ApiError extends Error {
  constructor(message, status, body = null) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.body = body
  }
}

class ValidationError extends Error {
  constructor(field, message) {
    super(message)
    this.name = "ValidationError"
    this.field = field
  }
}

// Usage
try {
  throw new ValidationError("email", "Format invalide")
} catch (e) {
  if (e instanceof ValidationError) {
    console.error(\`Champ \${e.field}: \${e.message}\`)
  }
}
\`\`\`

### Erreurs async non gérées
\`\`\`js
window.addEventListener("unhandledrejection", (e) => {
  console.error("Promise rejetée non gérée :", e.reason)
  e.preventDefault()
})
\`\`\`
`,
        links: [],
      },
    ],
    exercises: [],
  },
  {
    id: 715,
    title: 'Node.js & npm',
    icon: '🟢',
    level: 'Avancé',
    colorHex: '#AA7DCE',
    description: 'Modules Node.js, fs, path, process, npm, package.json.',
    lessons: [
      {
        title: 'Node.js basics',
        content: `## Node.js

### Modules intégrés
\`\`\`js
import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Fichiers
const contenu = await fs.readFile("data.txt", "utf-8")
await fs.writeFile("output.txt", "Hello !")
await fs.mkdir("dossier", { recursive: true })
const fichiers = await fs.readdir(".")

// Path
path.join(__dirname, "data", "file.txt")
path.resolve("./relative")
path.extname("file.txt")   // ".txt"
path.basename("dir/file.txt")  // "file.txt"
\`\`\`

### process
\`\`\`js
process.argv            // arguments CLI
process.env.NODE_ENV    // variables d'environnement
process.cwd()           // répertoire courant
process.exit(0)         // quitter (0 = succès)
\`\`\`

### npm — package.json
\`\`\`bash
npm init -y
npm install express
npm install -D jest eslint
npm run dev
npm test
\`\`\`

\`\`\`json
{
  "name": "mon-projet",
  "scripts": {
    "dev": "node --watch src/index.js",
    "test": "jest",
    "build": "esbuild src/index.js --bundle --outdir=dist"
  }
}
\`\`\`
`,
        links: [{ url: 'https://nodejs.org/fr/docs/', label: 'Docs Node.js' }],
      },
    ],
    exercises: [],
  },
  {
    id: 716,
    title: 'Express — API REST',
    icon: '🚂',
    level: 'Expert',
    colorHex: '#F3752B',
    description: 'Créer une API REST avec Express, middleware, routing, CRUD.',
    lessons: [
      {
        title: 'Express.js',
        content: `## Express.js

\`\`\`bash
npm install express
\`\`\`

### Serveur basique
\`\`\`js
import express from "express"

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
  res.json({ message: "Hello Express !" })
})

app.listen(3000, () => console.log("Serveur sur :3000"))
\`\`\`

### CRUD complet
\`\`\`js
const items = new Map()
let nextId = 1

app.get("/items", (req, res) => {
  res.json([...items.values()])
})

app.get("/items/:id", (req, res) => {
  const item = items.get(Number(req.params.id))
  if (!item) return res.status(404).json({ error: "Not found" })
  res.json(item)
})

app.post("/items", (req, res) => {
  const { nom, valeur } = req.body
  if (!nom) return res.status(400).json({ error: "nom requis" })
  const item = { id: nextId++, nom, valeur }
  items.set(item.id, item)
  res.status(201).json(item)
})

app.put("/items/:id", (req, res) => {
  const id = Number(req.params.id)
  if (!items.has(id)) return res.status(404).json({ error: "Not found" })
  items.set(id, { id, ...req.body })
  res.json(items.get(id))
})

app.delete("/items/:id", (req, res) => {
  items.delete(Number(req.params.id))
  res.sendStatus(204)
})
\`\`\`

### Middleware
\`\`\`js
// Logger
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.path}\`)
  next()
})

// Auth
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) return res.status(401).json({ error: "Non autorisé" })
  next()
}
app.use("/api", auth)
\`\`\`
`,
        links: [{ url: 'https://expressjs.com/fr/', label: 'Docs Express' }],
      },
    ],
    exercises: [],
  },
  {
    id: 717,
    title: 'Tests avec Jest',
    icon: '🧪',
    level: 'Expert',
    colorHex: '#F3752B',
    description: 'TDD, describe/it/expect, mocks, coverage, testing async.',
    lessons: [
      {
        title: 'Jest',
        content: `## Tests avec Jest

\`\`\`bash
npm install -D jest
\`\`\`

### Structure basique
\`\`\`js
// utils.test.js
import { doubler, diviser } from "./utils.js"

describe("Fonctions mathématiques", () => {
  test("doubler multiplie par 2", () => {
    expect(doubler(5)).toBe(10)
    expect(doubler(0)).toBe(0)
    expect(doubler(-3)).toBe(-6)
  })

  it("diviser lève une erreur si diviseur = 0", () => {
    expect(() => diviser(10, 0)).toThrow("Division par zéro")
  })
})
\`\`\`

### Matchers utiles
\`\`\`js
expect(42).toBe(42)
expect({ a: 1 }).toEqual({ a: 1 })  // deep equality
expect(null).toBeNull()
expect(undefined).toBeUndefined()
expect("hello world").toContain("world")
expect([1, 2, 3]).toHaveLength(3)
expect(5).toBeGreaterThan(3)
expect(fn).toThrow()
\`\`\`

### Tests asynchrones
\`\`\`js
test("fetch retourne des données", async () => {
  const data = await chargerDonnees()
  expect(data).toBeDefined()
  expect(data.length).toBeGreaterThan(0)
})
\`\`\`

### Mocks
\`\`\`js
jest.mock("./api.js")
import { fetchUsers } from "./api.js"

fetchUsers.mockResolvedValue([{ id: 1, nom: "Alice" }])

test("affiche les utilisateurs", async () => {
  const users = await fetchUsers()
  expect(users[0].nom).toBe("Alice")
})
\`\`\`
`,
        links: [{ url: 'https://jestjs.io/fr/', label: 'Docs Jest' }],
      },
    ],
    exercises: [],
  },
  {
    id: 718,
    title: 'TypeScript Intro',
    icon: '🔷',
    level: 'Expert',
    colorHex: '#F3752B',
    description: 'Types statiques, interfaces, generics, utility types, tsconfig.',
    lessons: [
      {
        title: 'TypeScript bases',
        content: `## TypeScript

\`\`\`bash
npm install -D typescript ts-node
npx tsc --init
\`\`\`

### Types de base
\`\`\`ts
let nom: string = "Alice"
let age: number = 30
let actif: boolean = true
let rien: null = null
let inconnu: unknown = "peut être n'importe quoi"

// Tableaux
let fruits: string[] = ["pomme", "banane"]
let nombres: Array<number> = [1, 2, 3]

// Tuple
let point: [number, number] = [3, 5]
\`\`\`

### Interfaces & Types
\`\`\`ts
interface User {
  id: number
  nom: string
  email?: string  // optionnel
  readonly createdAt: Date
}

type Status = "actif" | "inactif" | "banni"

type ApiResponse<T> = {
  data: T
  error: string | null
  status: number
}
\`\`\`

### Fonctions typées
\`\`\`ts
function saluer(nom: string, fois: number = 1): string {
  return nom.repeat(fois)
}

const diviser = (a: number, b: number): number => {
  if (b === 0) throw new Error("Division par zéro")
  return a / b
}
\`\`\`

### Generics
\`\`\`ts
function premierElement<T>(arr: T[]): T | undefined {
  return arr[0]
}

premierElement([1, 2, 3])         // type: number
premierElement(["a", "b"])        // type: string
\`\`\`

### Utility types
\`\`\`ts
type UserPartial = Partial<User>      // tous optionnels
type UserRequired = Required<User>    // tous requis
type UserPick = Pick<User, "id"|"nom">
type UserOmit = Omit<User, "email">
type Readonly<User>
\`\`\`
`,
        links: [{ url: 'https://www.typescriptlang.org/fr/', label: 'Docs TypeScript' }],
      },
    ],
    exercises: [],
  },
];

export default JS_MODULES;
