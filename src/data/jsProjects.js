const JS_PROJECTS = {
  701: [
    {
      title: "Convertisseur de types",
      sector: "⭐ Niveau 1",
      context: "Comprendre la coercition de types JavaScript.",
      objective: "Écrire une fonction `analyser(valeur)` qui retourne un objet {type, valeur, estFalsy, converti} pour n'importe quelle valeur.",
      starter: `function analyser(valeur) {
  return {
    type: typeof valeur,
    valeur: valeur,
    estFalsy: !valeur,
    // TODO: convertir en number, string et boolean
    enNumber: Number(valeur),
    enString: String(valeur),
    enBoolean: Boolean(valeur),
  }
}

// Tester avec ces valeurs
const tests = [0, "", null, undefined, "42", "3.14", true, false, [], {}]
tests.forEach(v => console.log(analyser(v)))`,
    },
    {
      title: "Calculatrice avec switch",
      sector: "⭐ Niveau 1",
      context: "Pratiquer les opérateurs et le contrôle de flux.",
      objective: "Écrire `calculer(a, op, b)` qui supporte +, -, *, /, % et ** . Retourner null pour opérateur inconnu. Gérer la division par zéro.",
      starter: `function calculer(a, op, b) {
  // TODO: utiliser switch(op) pour chaque opérateur
  // Gérer division par zéro → retourner Infinity ou null ?
}

console.log(calculer(10, '+', 3))   // 13
console.log(calculer(10, '/', 0))   // Gérer ce cas
console.log(calculer(2, '**', 8))   // 256
console.log(calculer(10, '?', 3))   // null`,
    },
    {
      title: "Vérificateur de types stricts",
      sector: "⭐⭐ Niveau 2",
      context: "=== vs == est une source de bugs classique en JS.",
      objective: "Créer une fonction `comparer(a, b)` qui retourne un objet {egalStrict, egalLache, typeA, typeB, explication}.",
      starter: `function comparer(a, b) {
  return {
    egalStrict: a === b,
    egalLache: a == b,
    typeA: typeof a,
    typeB: typeof b,
    // TODO: générer une explication textuelle
    explication: \`TODO\`
  }
}

console.log(comparer(1, "1"))
// { egalStrict: false, egalLache: true, ... }
console.log(comparer(0, false))
console.log(comparer(null, undefined))
console.log(comparer(NaN, NaN))   // Cas spécial !`,
    },
    {
      title: "Portée & Hoisting",
      sector: "⭐⭐ Niveau 2",
      context: "Comprendre pourquoi var est problématique.",
      objective: "Prédire la sortie de chaque snippet, puis le corriger avec let/const. Comprendre le hoisting.",
      starter: `// Snippet 1 — Hoisting de var
console.log(x) // Que vaut x ici ?
var x = 5
console.log(x)

// Snippet 2 — Boucle classique avec var
const fonctions = []
for (var i = 0; i < 3; i++) {
  fonctions.push(() => console.log(i))
}
fonctions.forEach(f => f()) // Que s'affiche-t-il ?

// TODO: corriger le snippet 2 avec let pour afficher 0, 1, 2

// Snippet 3 — Temporal Dead Zone avec let
try {
  console.log(y) // Que se passe-t-il ?
  let y = 10
} catch(e) {
  console.log('Erreur:', e.message)
}`,
    },
  ],

  702: [
    {
      title: "Inverser des mots",
      sector: "⭐ Niveau 1",
      context: "Manipuler des strings avec split/reverse/join.",
      objective: "Écrire `inverserMots(phrase)` qui inverse l'ordre des mots, et `inverserChars(s)` qui inverse les caractères.",
      starter: `const inverserMots = (phrase) => {
  // TODO: split, reverse, join
}

const inverserChars = (s) => {
  // TODO: inverser les caractères
}

console.log(inverserMots("Hello World JS"))    // "JS World Hello"
console.log(inverserChars("Python"))           // "nohtyP"
console.log(inverserMots("un seul"))           // "seul un"`,
    },
    {
      title: "Template de carte",
      sector: "⭐ Niveau 1",
      context: "Les template literals permettent de générer du HTML dynamique.",
      objective: "Créer `genererCarteHTML(utilisateur)` qui retourne une string HTML avec nom, avatar (initiales), bio et date d'inscription.",
      starter: `function genererCarteHTML({ nom, email, bio, dateInscription }) {
  const initiales = nom.split(' ').map(m => m[0]).join('').toUpperCase()
  const date = new Date(dateInscription).toLocaleDateString('fr-FR')

  // TODO: retourner un template HTML avec ces données
  return \`
    <div class="carte">
      <!-- TODO: avatar avec initiales, nom, email, bio, date -->
    </div>
  \`
}

const user = { nom: "Alice Martin", email: "alice@example.com", bio: "Dev full-stack", dateInscription: "2024-01-15" }
console.log(genererCarteHTML(user))`,
    },
    {
      title: "Slugify",
      sector: "⭐⭐ Niveau 2",
      context: "Convertir du texte en slug URL est un classique.",
      objective: "Écrire `slugify(texte)` : minuscules, accents supprimés, espaces → tirets, caractères spéciaux supprimés.",
      starter: `function slugify(texte) {
  return texte
    .toLowerCase()
    // TODO: supprimer les accents (normalize + replace)
    // .normalize('NFD').replace(/[\\u0300-\\u036f]/g, '')
    // TODO: remplacer espaces par tirets
    // TODO: supprimer les caractères non alphanumériques sauf tirets
    // TODO: supprimer tirets multiples consécutifs
}

console.log(slugify("Bonjour le Monde !"))     // "bonjour-le-monde"
console.log(slugify("Déjà Vu — c'est beau"))  // "deja-vu-cest-beau"
console.log(slugify("  Hello   World  "))       // "hello-world"`,
    },
    {
      title: "Parser de CSV",
      sector: "⭐⭐⭐ Niveau 3",
      context: "Parser du texte structuré sans bibliothèque.",
      objective: "Écrire `parseCSV(texte, separateur=',')` qui retourne un tableau d'objets. Gérer les headers, les guillemets et les virgules dans les valeurs.",
      starter: `function parseCSV(texte, sep = ',') {
  const lignes = texte.trim().split('\\n')
  const headers = lignes[0].split(sep).map(h => h.trim())

  return lignes.slice(1).map(ligne => {
    // TODO: séparer les valeurs (attention aux guillemets)
    const valeurs = ligne.split(sep).map(v => v.trim().replace(/^"|"$/g, ''))
    // TODO: créer un objet {header: valeur}
    return Object.fromEntries(headers.map((h, i) => [h, valeurs[i]]))
  })
}

const csv = \`nom,age,ville
Alice,30,Paris
Bob,25,"Lyon, France"
Charlie,35,Marseille\`

console.log(parseCSV(csv))`,
    },
  ],

  703: [
    {
      title: "map/filter/reduce chaînés",
      sector: "⭐ Niveau 1",
      context: "Les méthodes fonctionnelles des arrays sont au cœur du JS moderne.",
      objective: "À partir d'une liste de produits, utiliser uniquement map/filter/reduce pour: obtenir le prix TTC des produits en stock > 10€.",
      starter: `const produits = [
  { nom: 'Laptop', prix: 999, stock: true },
  { nom: 'Stylo', prix: 2, stock: true },
  { nom: 'Souris', prix: 29, stock: false },
  { nom: 'Clavier', prix: 79, stock: true },
  { nom: 'Câble', prix: 8, stock: true },
]

const TVA = 1.2

const resultat = produits
  // TODO: filter — en stock ET prix > 10
  .filter(p => /* ... */)
  // TODO: map — ajouter prixTTC = prix * TVA
  .map(p => ({ ...p, /* ... */ }))

const totalTTC = resultat.reduce((acc, p) => acc + p.prixTTC, 0)

console.log(resultat)
console.log(\`Total TTC: \${totalTTC.toFixed(2)}€\`)`,
    },
    {
      title: "Grouper par catégorie",
      sector: "⭐⭐ Niveau 2",
      context: "reduce permet de construire n'importe quelle structure de données.",
      objective: "Écrire `grouperPar(tableau, cle)` qui utilise reduce pour regrouper les éléments par valeur d'une clé.",
      starter: `function grouperPar(tableau, cle) {
  return tableau.reduce((groupes, item) => {
    const valeur = item[cle]
    // TODO: créer le groupe si absent, puis pousser l'item
    return groupes
  }, {})
}

const personnes = [
  { nom: 'Alice', ville: 'Paris', age: 30 },
  { nom: 'Bob', ville: 'Lyon', age: 25 },
  { nom: 'Charlie', ville: 'Paris', age: 35 },
  { nom: 'Diana', ville: 'Lyon', age: 28 },
]

console.log(grouperPar(personnes, 'ville'))
// { Paris: [{Alice}, {Charlie}], Lyon: [{Bob}, {Diana}] }`,
    },
    {
      title: "Flat & FlatMap",
      sector: "⭐⭐ Niveau 2",
      context: "flat() et flatMap() simplifient le travail sur les structures imbriquées.",
      objective: "Écrire des fonctions qui utilisent flat/flatMap pour: aplatir des catégories de produits, dupliquer chaque élément, extraire des tags.",
      starter: `const categories = [
  { nom: 'Informatique', produits: ['Laptop', 'Souris', 'Clavier'] },
  { nom: 'Mobilier', produits: ['Bureau', 'Chaise'] },
  { nom: 'Fournitures', produits: ['Stylo', 'Carnet'] },
]

// TODO: extraire tous les produits en liste plate
const tousLesProduits = categories.flatMap(/* ... */)
console.log(tousLesProduits)  // ['Laptop', 'Souris', ...]

// TODO: créer une version doublée (chaque élément apparaît 2 fois)
const doubles = [1, 2, 3].flatMap(/* ... */)
console.log(doubles)  // [1, 1, 2, 2, 3, 3]

// TODO: extraire tous les tags uniques
const articles = [
  { titre: 'JS moderne', tags: ['js', 'web', 'es6'] },
  { titre: 'Node.js', tags: ['js', 'backend', 'node'] },
]
const tagsUniques = [...new Set(articles.flatMap(/* ... */))]
console.log(tagsUniques)`,
    },
    {
      title: "Implémente tes propres map/filter/reduce",
      sector: "⭐⭐⭐ Niveau 3",
      context: "Comprendre le fonctionnement interne des méthodes d'array.",
      objective: "Implémenter `monMap(arr, fn)`, `monFilter(arr, fn)`, `monReduce(arr, fn, init)` sans utiliser les méthodes natives. Vérifier qu'ils donnent les mêmes résultats.",
      starter: `function monMap(arr, fn) {
  const resultat = []
  for (let i = 0; i < arr.length; i++) {
    // TODO: pousser fn(arr[i], i, arr) dans resultat
  }
  return resultat
}

function monFilter(arr, fn) {
  // TODO: retourner un nouveau tableau avec les éléments pour lesquels fn retourne true
}

function monReduce(arr, fn, valeurInitiale) {
  // TODO: accumuler avec fn(accumulateur, element, index, arr)
}

// Tests de vérification
const nums = [1, 2, 3, 4, 5]
console.assert(JSON.stringify(monMap(nums, x => x*2)) === JSON.stringify(nums.map(x => x*2)))
console.assert(JSON.stringify(monFilter(nums, x => x%2===0)) === JSON.stringify(nums.filter(x => x%2===0)))
console.assert(monReduce(nums, (a,b) => a+b, 0) === nums.reduce((a,b) => a+b, 0))
console.log('Tous les tests passent !')`,
    },
  ],

  704: [
    {
      title: "Destructuring avancé",
      sector: "⭐ Niveau 1",
      context: "Le destructuring ES6 rend le code plus lisible.",
      objective: "Pratiquer le destructuring dans différents contextes: paramètres de fonction, valeurs par défaut, renommage, imbrication.",
      starter: `const utilisateur = {
  id: 1,
  nom: 'Alice Martin',
  adresse: { ville: 'Paris', codePostal: '75001' },
  roles: ['admin', 'user'],
  preferences: { theme: 'dark', langue: 'fr' }
}

// TODO: destructurer en une ligne
const { nom, adresse: { ville }, roles: [rolesPrincipal] } = utilisateur

// TODO: avec renommage et valeur par défaut
const { nom: nomComplet, email = 'non renseigné' } = utilisateur

// TODO: fonction avec destructuring en paramètre
function afficherUser({ nom, adresse: { ville }, preferences: { theme = 'light' } = {} }) {
  console.log(\`\${nom} — \${ville} — thème: \${theme}\`)
}

afficherUser(utilisateur)`,
    },
    {
      title: "Spread & Rest patterns",
      sector: "⭐⭐ Niveau 2",
      context: "Spread et rest simplifient la manipulation d'objets et tableaux.",
      objective: "Écrire des fonctions pures (sans mutation) pour: cloner+modifier un objet, fusionner des configs, extraire certaines clés.",
      starter: `// 1. Mise à jour immutable
function mettreAJour(objet, modifications) {
  // TODO: retourner un NOUVEL objet avec les modifications (spread)
}

const user = { id: 1, nom: 'Alice', age: 30, actif: true }
const userModifie = mettreAJour(user, { age: 31, email: 'alice@new.com' })
console.log(user)          // non muté !
console.log(userModifie)

// 2. Fusion de configs avec priorité
function fusionnerConfig(defaut, ...overrides) {
  // TODO: fusionner de gauche à droite (dernier gagne)
}

const config = fusionnerConfig(
  { port: 3000, debug: false, db: 'sqlite' },
  { debug: true },
  { port: 8080 }
)
console.log(config)  // { port: 8080, debug: true, db: 'sqlite' }

// 3. Omettre des clés (sans mutation)
function omettre(objet, ...cles) {
  // TODO: retourner l'objet sans les clés spécifiées
}
console.log(omettre(user, 'id', 'actif'))  // { nom: 'Alice', age: 30 }`,
    },
    {
      title: "Optional chaining & Nullish",
      sector: "⭐⭐ Niveau 2",
      context: "?. et ?? évitent les erreurs sur les valeurs nulles.",
      objective: "Réécrire des accès imbriqués fragiles avec ?. et ??. Créer un `accederSafely(obj, chemin, defaut)` générique.",
      starter: `const donnees = {
  utilisateur: {
    profil: {
      nom: 'Alice',
      adresse: null
    },
    score: 0  // Attention: 0 est falsy !
  }
}

// TODO: accéder à ces chemins sans erreur
const ville = donnees?.utilisateur?.profil?.adresse?.ville ?? 'Ville inconnue'
const score = donnees?.utilisateur?.score ?? 'Pas de score'
const avatar = donnees?.utilisateur?.profil?.avatar ?? '/default.png'

console.log(ville, score, avatar)

// TODO: implémenter accederSafely
function accederSafely(obj, chemin, defaut = null) {
  // chemin = "utilisateur.profil.nom"
  // TODO: split('.') et réduire pour naviguer
}

console.log(accederSafely(donnees, 'utilisateur.profil.nom'))    // Alice
console.log(accederSafely(donnees, 'utilisateur.profil.age', 0)) // 0 (defaut)`,
    },
    {
      title: "Observateur de changements",
      sector: "⭐⭐⭐ Niveau 3",
      context: "Proxy permet d'intercepter les accès aux propriétés.",
      objective: "Créer `observerObjet(objet, onChange)` qui utilise Proxy pour détecter les modifications et appeler onChange(cle, ancienneValeur, nouvelleValeur).",
      starter: `function observerObjet(objet, onChange) {
  return new Proxy(objet, {
    set(cible, cle, nouvelleValeur) {
      const ancienneValeur = cible[cle]
      cible[cle] = nouvelleValeur
      // TODO: appeler onChange si la valeur a changé
      return true
    },
    deleteProperty(cible, cle) {
      const ancienneValeur = cible[cle]
      delete cible[cle]
      // TODO: notifier la suppression
      return true
    }
  })
}

const etat = observerObjet({ compteur: 0, nom: 'test' }, (cle, avant, apres) => {
  console.log(\`\${cle}: \${JSON.stringify(avant)} → \${JSON.stringify(apres)}\`)
})

etat.compteur++       // compteur: 0 → 1
etat.nom = 'prod'     // nom: "test" → "prod"
delete etat.nom       // nom: "prod" → undefined`,
    },
  ],

  705: [
    {
      title: "FizzBuzz ES6",
      sector: "⭐ Niveau 1",
      context: "FizzBuzz revisité avec des fonctions ES6 propres.",
      objective: "Implémenter FizzBuzz 3 façons: boucle for, Array.from(), et version fonctionnelle avec map. Généraliser en `fizzBuzzGenerique(n, regles)`.",
      starter: `// Version 1: boucle for
function fizzBuzz1(n) {
  for (let i = 1; i <= n; i++) {
    // TODO
  }
}

// Version 2: Array.from
const fizzBuzz2 = n => Array.from({ length: n }, (_, i) => {
  const num = i + 1
  // TODO: retourner 'FizzBuzz', 'Fizz', 'Buzz' ou num
})

// Version 3: générique avec règles
function fizzBuzzGenerique(n, regles) {
  // regles = [{ diviseur: 3, mot: 'Fizz' }, { diviseur: 5, mot: 'Buzz' }]
  return Array.from({ length: n }, (_, i) => {
    const num = i + 1
    const mot = regles.filter(r => num % r.diviseur === 0).map(r => r.mot).join('')
    return mot || num
  })
}

console.log(fizzBuzz2(20))
const regles = [{ diviseur: 3, mot: 'Fizz' }, { diviseur: 5, mot: 'Buzz' }, { diviseur: 7, mot: 'Bazz' }]
console.log(fizzBuzzGenerique(21, regles))`,
    },
    {
      title: "Itérateur de collection",
      sector: "⭐⭐ Niveau 2",
      context: "for...of fonctionne avec n'importe quel itérable.",
      objective: "Créer une classe `Plage(debut, fin, pas)` itérable avec Symbol.iterator. Tester avec for...of, spread et destructuring.",
      starter: `class Plage {
  constructor(debut, fin, pas = 1) {
    this.debut = debut
    this.fin = fin
    this.pas = pas
  }

  [Symbol.iterator]() {
    let courant = this.debut
    const fin = this.fin
    const pas = this.pas
    return {
      next() {
        // TODO: retourner { value, done }
      }
    }
  }
}

// Tests
for (const n of new Plage(1, 5)) console.log(n)    // 1 2 3 4 5
console.log([...new Plage(0, 10, 2)])               // [0,2,4,6,8,10]
const [a, b, c] = new Plage(10, 50, 10)
console.log(a, b, c)                                 // 10 20 30`,
    },
    {
      title: "Switch vs Map de fonctions",
      sector: "⭐⭐ Niveau 2",
      context: "Remplacer des switch volumineux par des maps de fonctions.",
      objective: "Convertir un switch de 6 cas en une Map de fonctions handlers. Ajouter la possibilité d'enregistrer de nouveaux handlers dynamiquement.",
      starter: `// Version switch (à remplacer)
function traiterEvenement_v1(type, data) {
  switch(type) {
    case 'CONNEXION': return \`Utilisateur \${data.nom} connecté\`
    case 'DECONNEXION': return \`Utilisateur \${data.nom} déconnecté\`
    case 'ACHAT': return \`Achat de \${data.produit} — \${data.prix}€\`
    case 'ERREUR': return \`Erreur: \${data.message}\`
    default: return \`Événement inconnu: \${type}\`
  }
}

// TODO: version avec Map de fonctions
const handlers = new Map([
  ['CONNEXION', data => \`Utilisateur \${data.nom} connecté\`],
  // TODO: ajouter les autres cas
])

function traiterEvenement_v2(type, data) {
  const handler = handlers.get(type)
  return handler ? handler(data) : \`Événement inconnu: \${type}\`
}

// TODO: ajouter un handler dynamiquement
handlers.set('EMAIL', data => \`Email envoyé à \${data.destinataire}\`)

console.log(traiterEvenement_v2('CONNEXION', { nom: 'Alice' }))
console.log(traiterEvenement_v2('EMAIL', { destinataire: 'bob@example.com' }))`,
    },
  ],

  706: [
    {
      title: "Fonctions pures & immutabilité",
      sector: "⭐ Niveau 1",
      context: "Les fonctions pures facilitent le test et le débogage.",
      objective: "Identifier les fonctions impures, puis les réécrire en fonctions pures (sans effets de bord, même entrée = même sortie).",
      starter: `// Ces fonctions sont IMPURES — pourquoi ?
let total = 0
function ajouterAuTotal(n) { total += n; return total }  // Impure: modifie variable externe

const utilisateurs = []
function ajouterUser(nom) { utilisateurs.push({ nom, id: Date.now() }) }  // Impure: mutation + Date.now()

// TODO: réécrire en fonctions PURES
function ajouterAuTotalPur(total, n) {
  // TODO: ne pas modifier total, retourner le nouveau total
}

function ajouterUserPur(utilisateurs, nom, id) {
  // TODO: retourner un NOUVEAU tableau (spread)
}

// Tests
const t1 = ajouterAuTotalPur(0, 5)
const t2 = ajouterAuTotalPur(t1, 3)
console.log(t1, t2)  // 5, 8 (t1 inchangé)

const users1 = []
const users2 = ajouterUserPur(users1, 'Alice', 1)
console.log(users1.length, users2.length)  // 0, 1`,
    },
    {
      title: "Composition de fonctions",
      sector: "⭐⭐ Niveau 2",
      context: "La composition est un pattern fondamental de la programmation fonctionnelle.",
      objective: "Implémenter `compose(...fns)` et `pipe(...fns)`. Les utiliser pour créer un pipeline de traitement de texte.",
      starter: `const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x)
const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x)

// Fonctions unitaires
const trim = s => s.trim()
const lowercase = s => s.toLowerCase()
const supprAccents = s => s.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '')
const remplacerEspaces = s => s.replace(/\\s+/g, '-')
const supprSpeciaux = s => s.replace(/[^a-z0-9-]/g, '')

// TODO: créer une fonction slugify avec pipe
const slugify = pipe(/* ... */)

// TODO: créer une fonction normaliser avec compose (ordre inverse)
const normaliser = compose(/* ... */)

console.log(slugify('  Bonjour le Monde !!  '))   // "bonjour-le-monde"
console.log(slugify('Déjà-vu en 2025'))            // "deja-vu-en-2025"`,
    },
    {
      title: "Currying & Partial application",
      sector: "⭐⭐⭐ Niveau 3",
      context: "Le currying transforme une fonction multi-arguments en une chaîne d'appels unaires.",
      objective: "Implémenter `curry(fn)` qui accepte des fonctions d'arité quelconque. Créer des fonctions spécialisées avec partial application.",
      starter: `function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args)
    }
    // TODO: retourner une fonction qui attend les arguments restants
    return (...autresArgs) => curried(...args, ...autresArgs)
  }
}

// Tests
const add = curry((a, b, c) => a + b + c)
console.log(add(1)(2)(3))    // 6
console.log(add(1, 2)(3))    // 6
console.log(add(1)(2, 3))    // 6
console.log(add(1, 2, 3))    // 6

const multiplier = curry((a, b) => a * b)
const double = multiplier(2)
const triple = multiplier(3)
console.log([1,2,3,4,5].map(double))   // [2,4,6,8,10]
console.log([1,2,3,4,5].map(triple))   // [3,6,9,12,15]`,
    },
    {
      title: "Générateur de séquences",
      sector: "⭐⭐⭐ Niveau 3",
      context: "Les générateurs ES6 permettent des séquences infinies paresseuses.",
      objective: "Créer des générateurs: `compter(debut, pas)`, `fibonacci()`, `prendre(n, gen)`. Composer pour obtenir les 10 premiers Fibonacci pairs.",
      starter: `function* compter(debut = 0, pas = 1) {
  let n = debut
  while (true) {
    yield n
    n += pas
  }
}

function* fibonacci() {
  let [a, b] = [0, 1]
  while (true) {
    yield a
    // TODO: avancer a et b
  }
}

function prendre(n, generateur) {
  // TODO: retourner un tableau des n premiers éléments
  const resultat = []
  for (const val of generateur) {
    resultat.push(val)
    if (resultat.length >= n) break
  }
  return resultat
}

function* filtrer(predicat, generateur) {
  for (const val of generateur) {
    if (predicat(val)) yield val
  }
}

// 10 premiers Fibonacci pairs
const fibPairs = filtrer(n => n % 2 === 0, fibonacci())
console.log(prendre(10, fibPairs))
// [0, 2, 8, 34, 144, 610, 2584, 10946, 46368, 196418]`,
    },
  ],

  707: [
    {
      title: "Todo List — DOM",
      sector: "⭐⭐ Niveau 2",
      context: "Manipulation du DOM pour une application interactive.",
      objective: "Créer une todo list complète: ajouter une tâche (Enter ou bouton), marquer comme faite (clic), supprimer (bouton ✕), compteur de tâches restantes.",
      starter: `<!-- HTML à utiliser:
<div id="app">
  <input id="input-todo" placeholder="Nouvelle tâche..." />
  <button id="btn-ajouter">Ajouter</button>
  <ul id="liste-todos"></ul>
  <p id="compteur">0 tâche(s) restante(s)</p>
</div>
-->

let todos = []
let nextId = 1

function ajouterTodo(texte) {
  if (!texte.trim()) return
  todos.push({ id: nextId++, texte, faite: false })
  // TODO: appeler renderTodos()
}

function toggleTodo(id) {
  // TODO: inverser la propriété 'faite' du todo correspondant
  // TODO: appeler renderTodos()
}

function supprimerTodo(id) {
  todos = todos.filter(t => t.id !== id)
  renderTodos()
}

function renderTodos() {
  const liste = document.getElementById('liste-todos')
  // TODO: vider la liste et recréer les <li>
  // Chaque <li> : checkbox + texte + bouton suppression
  // Mettre à jour le compteur
}

// Événements
document.getElementById('btn-ajouter').addEventListener('click', () => {
  const input = document.getElementById('input-todo')
  ajouterTodo(input.value)
  input.value = ''
})
// TODO: ajouter l'événement keydown Enter sur l'input`,
    },
    {
      title: "Accordéon animé",
      sector: "⭐⭐ Niveau 2",
      context: "Pattern d'accordéon courant dans les interfaces.",
      objective: "Créer un accordéon accessible: clic sur header → toggle du contenu. Un seul panneau ouvert à la fois. Utiliser des classes CSS pour l'animation.",
      starter: `<!-- HTML:
<div class="accordeon">
  <div class="panneau">
    <button class="header">Section 1</button>
    <div class="contenu">Contenu 1...</div>
  </div>
  <div class="panneau">
    <button class="header">Section 2</button>
    <div class="contenu">Contenu 2...</div>
  </div>
</div>
-->

// TODO: sélectionner tous les headers
const headers = document.querySelectorAll('.accordeon .header')

headers.forEach(header => {
  header.addEventListener('click', () => {
    const panneau = header.parentElement
    const estOuvert = panneau.classList.contains('ouvert')

    // TODO: fermer tous les panneaux (retirer classe 'ouvert')
    document.querySelectorAll('.panneau').forEach(/* ... */)

    // TODO: si était fermé, ouvrir ce panneau
    if (!estOuvert) {
      panneau.classList.add('ouvert')
      header.setAttribute('aria-expanded', 'true')
    }
  })
})`,
    },
    {
      title: "Formulaire avec validation",
      sector: "⭐⭐⭐ Niveau 3",
      context: "La validation côté client améliore l'UX.",
      objective: "Créer un formulaire d'inscription avec validation en temps réel: nom (2+ chars), email (format), password (8+ chars, 1 majuscule, 1 chiffre), confirmation.",
      starter: `const regles = {
  nom: {
    valider: v => v.trim().length >= 2,
    message: 'Minimum 2 caractères'
  },
  email: {
    valider: v => /^[\\w.-]+@[\\w.-]+\\.[a-z]{2,}$/i.test(v),
    message: 'Email invalide'
  },
  password: {
    valider: v => v.length >= 8 && /[A-Z]/.test(v) && /\\d/.test(v),
    message: '8 chars minimum, 1 majuscule, 1 chiffre'
  },
  confirmation: {
    valider: (v, form) => v === form.password.value,
    message: 'Les mots de passe ne correspondent pas'
  }
}

function validerChamp(nom, valeur, form) {
  const regle = regles[nom]
  const valide = regle.valider(valeur, form)
  // TODO: afficher/masquer le message d'erreur
  // TODO: ajouter/retirer classes CSS 'valide'/'invalide'
  return valide
}

// TODO: attacher les listeners 'input' sur chaque champ
// TODO: valider le formulaire complet au submit`,
    },
  ],

  708: [
    {
      title: "Event delegation",
      sector: "⭐⭐ Niveau 2",
      context: "La délégation d'événements est essentielle pour les listes dynamiques.",
      objective: "Créer une liste de tâches où les boutons 'Fait' et 'Supprimer' fonctionnent par délégation sur le parent. Ajouter dynamiquement de nouvelles tâches.",
      starter: `const taches = [
  { id: 1, texte: 'Apprendre la délégation', faite: false },
  { id: 2, texte: 'Pratiquer le DOM', faite: false },
]

function renderListe() {
  const ul = document.getElementById('liste')
  ul.innerHTML = taches.map(t => \`
    <li data-id="\${t.id}" class="\${t.faite ? 'faite' : ''}">
      <span>\${t.texte}</span>
      <button data-action="toggle">✓</button>
      <button data-action="supprimer">✕</button>
    </li>
  \`).join('')
}

// UN SEUL listener sur le parent
document.getElementById('liste').addEventListener('click', e => {
  const btn = e.target.closest('button[data-action]')
  if (!btn) return

  const li = btn.closest('li')
  const id = Number(li.dataset.id)
  const action = btn.dataset.action

  // TODO: gérer 'toggle' et 'supprimer'
})

renderListe()`,
    },
    {
      title: "Debounce & Throttle",
      sector: "⭐⭐⭐ Niveau 3",
      context: "Optimiser les événements fréquents (scroll, resize, input).",
      objective: "Implémenter `debounce(fn, delai)` et `throttle(fn, intervalle)`. Tester sur un champ de recherche (debounce) et sur le scroll (throttle).",
      starter: `function debounce(fn, delai) {
  let timer
  return function(...args) {
    clearTimeout(timer)
    // TODO: redémarrer le timer à chaque appel
    // Appeler fn seulement après 'delai' ms sans nouvel appel
    timer = setTimeout(() => fn.apply(this, args), delai)
  }
}

function throttle(fn, intervalle) {
  let dernierAppel = 0
  return function(...args) {
    const maintenant = Date.now()
    // TODO: appeler fn seulement si intervalle écoulé depuis dernierAppel
    if (maintenant - dernierAppel >= intervalle) {
      dernierAppel = maintenant
      return fn.apply(this, args)
    }
  }
}

// Test debounce — recherche
const rechercherAPI = debounce((query) => {
  console.log('Recherche API:', query)
}, 300)

// Simule des frappes rapides
'javascript'.split('').forEach((_, i, arr) => {
  setTimeout(() => rechercherAPI(arr.slice(0, i+1).join('')), i * 50)
})
// Ne doit afficher qu'UNE recherche pour "javascript"`,
    },
    {
      title: "Observateur (Pub/Sub)",
      sector: "⭐⭐⭐ Niveau 3",
      context: "Le pattern Pub/Sub découple les émetteurs des récepteurs.",
      objective: "Implémenter un EventEmitter avec: on(event, fn), off(event, fn), emit(event, ...args), once(event, fn).",
      starter: `class EventEmitter {
  constructor() {
    this._listeners = new Map()
  }

  on(event, fn) {
    if (!this._listeners.has(event)) {
      this._listeners.set(event, new Set())
    }
    this._listeners.get(event).add(fn)
    return () => this.off(event, fn)  // retourne une fonction unsubscribe
  }

  off(event, fn) {
    this._listeners.get(event)?.delete(fn)
  }

  emit(event, ...args) {
    // TODO: appeler tous les listeners de cet event
  }

  once(event, fn) {
    // TODO: créer un wrapper qui se désabonne après le premier appel
  }
}

const bus = new EventEmitter()

const logConnexion = (user) => console.log(\`Connecté: \${user}\`)
bus.on('connexion', logConnexion)
bus.once('connexion', (user) => console.log(\`Premier: \${user}\`))

bus.emit('connexion', 'Alice')   // logConnexion + once
bus.emit('connexion', 'Bob')     // logConnexion seulement
bus.off('connexion', logConnexion)
bus.emit('connexion', 'Charlie') // rien`,
    },
  ],

  709: [
    {
      title: "Factory function & Module pattern",
      sector: "⭐⭐ Niveau 2",
      context: "Créer des objets avec état privé grâce aux closures.",
      objective: "Implémenter un compteur avec factory function (état privé). Puis créer un module bancaire avec closure.",
      starter: `// Factory function — compteur privé
function creerCompteur(valeurInitiale = 0) {
  let valeur = valeurInitiale  // privé grâce à closure

  return {
    incrementer() { valeur++ },
    decrementer() { valeur-- },
    reinitialiser() { valeur = valeurInitiale },
    get valeur() { return valeur }
  }
}

const c1 = creerCompteur(10)
const c2 = creerCompteur()
c1.incrementer(); c1.incrementer()
c2.incrementer()
console.log(c1.valeur, c2.valeur)  // 12, 1 (indépendants !)

// TODO: Module bancaire avec closure
function creerCompte(titulaire, soldeInitial = 0) {
  // TODO: solde privé
  // TODO: retourner { deposer, retirer, solde getter, historique }
}

const compte = creerCompte('Alice', 1000)
compte.deposer(500)
compte.retirer(200)
console.log(compte.solde)      // 1300
console.log(compte.historique) // liste des transactions`,
    },
    {
      title: "Memoïsation",
      sector: "⭐⭐ Niveau 2",
      context: "Les closures permettent de cacher des résultats de calculs.",
      objective: "Implémenter `memoize(fn)`. Tester sur fibonacci récursif. Comparer les performances avec et sans cache.",
      starter: `function memoize(fn) {
  const cache = new Map()
  return function(...args) {
    const cle = JSON.stringify(args)
    if (cache.has(cle)) {
      return cache.get(cle)
    }
    // TODO: calculer, stocker dans cache et retourner
  }
}

// Fibonacci SANS mémoïsation
function fibLent(n) {
  if (n < 2) return n
  return fibLent(n-1) + fibLent(n-2)
}

// Fibonacci AVEC mémoïsation
const fib = memoize(function(n) {
  if (n < 2) return n
  return fib(n-1) + fib(n-2)
})

console.time('sans cache')
console.log(fibLent(35))
console.timeEnd('sans cache')

console.time('avec cache')
console.log(fib(35))
console.timeEnd('avec cache')`,
    },
    {
      title: "Piège des closures en boucle",
      sector: "⭐⭐⭐ Niveau 3",
      context: "Un bug classique et ses 3 solutions.",
      objective: "Corriger le bug des closures en boucle avec 3 approches différentes: IIFE, let, et bind. Expliquer pourquoi chaque solution fonctionne.",
      starter: `// BUG: affiche 5 cinq fois
function bugVar() {
  const fns = []
  for (var i = 0; i < 5; i++) {
    fns.push(function() { return i })
  }
  return fns
}
console.log(bugVar().map(f => f()))  // [5,5,5,5,5] — BUG !

// Solution 1: IIFE (Immediately Invoked Function Expression)
function solution1() {
  const fns = []
  for (var i = 0; i < 5; i++) {
    fns.push((function(j) {
      return function() { return j }
    })(i))  // capture i dans j via le paramètre
  }
  return fns
}

// Solution 2: let (portée de bloc)
function solution2() {
  // TODO: utiliser let au lieu de var
}

// Solution 3: bind
function solution3() {
  const fns = []
  for (var i = 0; i < 5; i++) {
    fns.push(function(j) { return j }.bind(null, i))
  }
  return fns
}

[solution1, solution2, solution3].forEach((sol, idx) => {
  console.log(\`Solution \${idx+1}:\`, sol().map(f => f()))  // [0,1,2,3,4]
})`,
    },
  ],

  710: [
    {
      title: "Classe LinkedList",
      sector: "⭐⭐ Niveau 2",
      context: "Implémenter une liste chaînée renforce la compréhension des classes.",
      objective: "Créer `ListeChainee` avec: append(val), prepend(val), remove(val), toArray(), [Symbol.iterator], __length.",
      starter: `class Noeud {
  constructor(valeur) {
    this.valeur = valeur
    this.suivant = null
  }
}

class ListeChainee {
  constructor() {
    this.tete = null
    this.taille = 0
  }

  append(valeur) {
    const noeud = new Noeud(valeur)
    if (!this.tete) { this.tete = noeud; this.taille++; return }
    let courant = this.tete
    while (courant.suivant) courant = courant.suivant
    courant.suivant = noeud
    this.taille++
  }

  prepend(valeur) {
    // TODO: insérer en début de liste
  }

  remove(valeur) {
    // TODO: supprimer le premier noeud avec cette valeur
  }

  toArray() {
    const arr = []
    let courant = this.tete
    while (courant) { arr.push(courant.valeur); courant = courant.suivant }
    return arr
  }

  [Symbol.iterator]() {
    let courant = this.tete
    return { next() {
      if (courant) { const v = courant.valeur; courant = courant.suivant; return { value: v, done: false } }
      return { done: true }
    }}
  }
}

const liste = new ListeChainee()
liste.append(1); liste.append(2); liste.append(3)
liste.prepend(0)
console.log(liste.toArray())   // [0,1,2,3]
liste.remove(2)
console.log([...liste])         // [0,1,3]`,
    },
    {
      title: "Héritage & Polymorphisme",
      sector: "⭐⭐ Niveau 2",
      context: "Les classes ES6 supportent l'héritage classique.",
      objective: "Créer une hiérarchie: Forme → Rectangle, Cercle, Triangle. Méthode polymorphe aire() et perimetre(). Tester avec un tableau de formes.",
      starter: `class Forme {
  constructor(couleur = 'noir') { this.couleur = couleur }
  aire() { throw new Error('aire() non implémentée') }
  perimetre() { throw new Error('perimetre() non implémentée') }
  toString() {
    return \`\${this.constructor.name}: aire=\${this.aire().toFixed(2)}, périmètre=\${this.perimetre().toFixed(2)}\`
  }
}

class Rectangle extends Forme {
  constructor(largeur, hauteur, couleur) {
    super(couleur)
    this.largeur = largeur
    this.hauteur = hauteur
  }
  aire() { return this.largeur * this.hauteur }
  perimetre() { return 2 * (this.largeur + this.hauteur) }
}

class Cercle extends Forme {
  constructor(rayon, couleur) {
    super(couleur)
    this.rayon = rayon
  }
  // TODO: implémenter aire (πr²) et perimetre (2πr)
}

class Triangle extends Forme {
  constructor(a, b, c, couleur) {
    super(couleur)
    this.cotes = [a, b, c]
  }
  perimetre() { return this.cotes.reduce((s, c) => s + c, 0) }
  // TODO: aire avec la formule de Héron
}

const formes = [new Rectangle(4,5), new Cercle(3), new Triangle(3,4,5)]
formes.forEach(f => console.log(f.toString()))
console.log('Aire totale:', formes.reduce((s,f) => s + f.aire(), 0).toFixed(2))`,
    },
    {
      title: "Mixins en JS",
      sector: "⭐⭐⭐ Niveau 3",
      context: "JS n'a pas d'héritage multiple, mais les mixins le simulent.",
      objective: "Créer des mixins Serializable, Validatable, Timestamped. Les appliquer à plusieurs classes via Object.assign sur le prototype.",
      starter: `// Mixins — fonctions qui retournent des méthodes
const Serializable = (Base) => class extends Base {
  toJSON() {
    return JSON.stringify(this)
  }
  static fromJSON(json) {
    return Object.assign(new this(), JSON.parse(json))
  }
}

const Timestamped = (Base) => class extends Base {
  constructor(...args) {
    super(...args)
    this.createdAt = new Date().toISOString()
  }
}

const Validatable = (Base) => class extends Base {
  // TODO: ajouter méthode validate() qui vérifie this._rules
  // _rules = { champ: (valeur) => bool }
  validate() {
    const erreurs = []
    for (const [champ, regle] of Object.entries(this._rules || {})) {
      if (!regle(this[champ])) erreurs.push(\`\${champ} invalide\`)
    }
    return { valide: erreurs.length === 0, erreurs }
  }
}

// Composer les mixins
class Utilisateur extends Serializable(Timestamped(Validatable(class {}))) {
  constructor(nom, email) {
    super()
    this.nom = nom
    this.email = email
    this._rules = {
      nom: v => v && v.length >= 2,
      email: v => /^\\S+@\\S+\\.\\S+$/.test(v)
    }
  }
}

const u = new Utilisateur('Alice', 'alice@example.com')
console.log(u.validate())
console.log(u.toJSON())
console.log(u.createdAt)`,
    },
  ],

  711: [
    {
      title: "Promise.all vs Promise.allSettled",
      sector: "⭐⭐ Niveau 2",
      context: "Comprendre la différence entre les combinateurs de Promises.",
      objective: "Créer 5 fausses requêtes API dont 2 échouent. Comparer Promise.all (fail-fast) vs Promise.allSettled (attend tout). Mesurer le temps total.",
      starter: `function fausseRequete(id, delai, succes = true) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (succes) resolve({ id, data: \`Données \${id}\` })
      else reject(new Error(\`Erreur sur requête \${id}\`))
    }, delai)
  })
}

const requetes = [
  fausseRequete(1, 100),
  fausseRequete(2, 200, false),  // échoue
  fausseRequete(3, 150),
  fausseRequete(4, 300, false),  // échoue
  fausseRequete(5, 50),
]

// Test Promise.all
console.time('Promise.all')
Promise.all(requetes)
  .then(resultats => console.log('Tous réussis:', resultats))
  .catch(err => console.log('Promise.all échoue dès la 1ère erreur:', err.message))
  .finally(() => console.timeEnd('Promise.all'))

// TODO: tester Promise.allSettled (attend TOUTES les promesses)
// Afficher séparément les réussites et les échecs`,
    },
    {
      title: "Async/await avec retry",
      sector: "⭐⭐ Niveau 2",
      context: "Gérer proprement les erreurs async avec retry.",
      objective: "Écrire `avecRetry(fn, maxTentatives, delai)` qui réessaie avec backoff exponentiel. Tester sur une fonction qui échoue aléatoirement.",
      starter: `async function avecRetry(fn, maxTentatives = 3, delaiBase = 100) {
  for (let tentative = 1; tentative <= maxTentatives; tentative++) {
    try {
      return await fn()
    } catch (err) {
      console.log(\`Tentative \${tentative}/\${maxTentatives} échouée: \${err.message}\`)
      if (tentative === maxTentatives) throw err
      // TODO: attendre delaiBase * 2^(tentative-1) ms (backoff exponentiel)
      const attente = delaiBase * Math.pow(2, tentative - 1)
      await new Promise(r => setTimeout(r, attente))
    }
  }
}

// Fonction instable qui échoue 70% du temps
function apiInstable() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.7) reject(new Error('Erreur serveur 500'))
      else resolve({ data: 'Succès !' })
    }, 50)
  })
}

avecRetry(apiInstable, 5, 50)
  .then(res => console.log('Résultat final:', res))
  .catch(err => console.log('Échec définitif:', err.message))`,
    },
    {
      title: "Queue asynchrone",
      sector: "⭐⭐⭐ Niveau 3",
      context: "Traiter des tâches async en parallèle avec une concurrence limitée.",
      objective: "Implémenter `traiterEnParallele(taches, concurrence)` qui traite un tableau de tâches async avec au plus N en parallèle.",
      starter: `async function traiterEnParallele(taches, concurrence = 3) {
  const resultats = new Array(taches.length)
  let index = 0

  async function worker() {
    while (index < taches.length) {
      const i = index++
      try {
        resultats[i] = { status: 'fulfilled', value: await taches[i]() }
      } catch(err) {
        resultats[i] = { status: 'rejected', reason: err.message }
      }
    }
  }

  // TODO: créer 'concurrence' workers et les attendre avec Promise.all
  await Promise.all(Array.from({ length: concurrence }, worker))
  return resultats
}

// 10 tâches simulées
const taches = Array.from({ length: 10 }, (_, i) => () =>
  new Promise((resolve, reject) => setTimeout(() => {
    if (i % 4 === 0) reject(new Error(\`Tâche \${i} échouée\`))
    else resolve(\`Tâche \${i} OK\`)
  }, Math.random() * 200))
)

console.time('parallel')
traiterEnParallele(taches, 3).then(res => {
  console.timeEnd('parallel')
  res.forEach((r, i) => console.log(\`[\${i}] \${r.status}: \${r.value || r.reason}\`))
})`,
    },
  ],

  712: [
    {
      title: "Client fetch réutilisable",
      sector: "⭐⭐ Niveau 2",
      context: "Abstraire fetch dans un client HTTP réutilisable.",
      objective: "Créer une classe `HttpClient` avec get/post/put/delete, baseURL, headers par défaut, et gestion d'erreurs centralisée.",
      starter: `class HttpClient {
  constructor(baseURL = '', defaultHeaders = {}) {
    this.baseURL = baseURL
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders
    }
  }

  async _requete(methode, endpoint, body = null, headers = {}) {
    const url = this.baseURL + endpoint
    const config = {
      method: methode,
      headers: { ...this.defaultHeaders, ...headers },
    }
    if (body) config.body = JSON.stringify(body)

    const resp = await fetch(url, config)
    if (!resp.ok) {
      const erreur = await resp.json().catch(() => ({}))
      throw Object.assign(new Error(erreur.message ?? 'Erreur HTTP'), { status: resp.status })
    }
    return resp.status === 204 ? null : resp.json()
  }

  get(endpoint, headers) { return this._requete('GET', endpoint, null, headers) }
  // TODO: implémenter post, put, delete

  setBearerToken(token) {
    // TODO: ajouter Authorization: Bearer token aux defaultHeaders
  }
}

const api = new HttpClient('https://jsonplaceholder.typicode.com')
api.get('/users/1').then(user => console.log(user.name))`,
    },
    {
      title: "Formulaire → fetch",
      sector: "⭐⭐ Niveau 2",
      context: "Envoyer des données de formulaire via fetch.",
      objective: "Créer un formulaire de création d'article (titre, corps, auteurId). Intercepter le submit, envoyer en POST à JSONPlaceholder, afficher la réponse.",
      starter: `/* HTML:
<form id="form-article">
  <input name="title" placeholder="Titre" required />
  <textarea name="body" placeholder="Contenu" required></textarea>
  <select name="userId">
    <option value="1">Alice</option>
    <option value="2">Bob</option>
  </select>
  <button type="submit">Publier</button>
</form>
<div id="resultat"></div>
*/

document.getElementById('form-article').addEventListener('submit', async (e) => {
  e.preventDefault()

  const formData = new FormData(e.target)
  const data = Object.fromEntries(formData)
  data.userId = Number(data.userId)

  const btn = e.target.querySelector('button')
  btn.disabled = true
  btn.textContent = 'Publication...'

  try {
    const resp = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (!resp.ok) throw new Error(\`HTTP \${resp.status}\`)
    const article = await resp.json()

    // TODO: afficher le résultat dans #resultat
    document.getElementById('resultat').innerHTML = \`
      <p>✅ Article créé avec l'ID \${article.id}</p>
    \`
  } catch(err) {
    // TODO: afficher l'erreur
  } finally {
    btn.disabled = false
    btn.textContent = 'Publier'
  }
})`,
    },
    {
      title: "Infinite scroll",
      sector: "⭐⭐⭐ Niveau 3",
      context: "Charger dynamiquement du contenu au scroll — pattern très utilisé.",
      objective: "Implémenter un infinite scroll avec IntersectionObserver: charger 10 posts à la fois, afficher un spinner, éviter les doublons.",
      starter: `let page = 1
let chargement = false

async function chargerPosts() {
  if (chargement) return
  chargement = true

  const spinner = document.getElementById('spinner')
  spinner.style.display = 'block'

  try {
    const resp = await fetch(
      \`https://jsonplaceholder.typicode.com/posts?_page=\${page}&_limit=10\`
    )
    const posts = await resp.json()

    if (posts.length === 0) {
      observer.disconnect()  // plus de pages
      return
    }

    const container = document.getElementById('posts')
    posts.forEach(post => {
      const el = document.createElement('article')
      el.innerHTML = \`<h3>\${post.title}</h3><p>\${post.body}</p>\`
      container.appendChild(el)
    })

    page++
  } finally {
    chargement = false
    spinner.style.display = 'none'
  }
}

// IntersectionObserver — déclenche quand le sentinel est visible
const sentinel = document.getElementById('sentinel')
const observer = new IntersectionObserver(entries => {
  // TODO: si entries[0].isIntersecting → chargerPosts()
}, { threshold: 0.1 })

observer.observe(sentinel)
chargerPosts()  // Premier chargement`,
    },
  ],

  713: [
    {
      title: "Barrel file & imports",
      sector: "⭐ Niveau 1",
      context: "Organiser les exports pour simplifier les imports.",
      objective: "Créer un module `utils/index.js` (barrel) qui re-exporte des fonctions de plusieurs fichiers. Pratiquer named/default/namespace imports.",
      starter: `// utils/string.js
export const slugify = s => s.toLowerCase().replace(/\\s+/g, '-')
export const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1)
export default function truncate(s, n = 50) {
  return s.length > n ? s.slice(0, n) + '...' : s
}

// utils/math.js
export const clamp = (n, min, max) => Math.min(Math.max(n, min), max)
export const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

// TODO: utils/index.js — barrel file
// Re-exporter slugify, capitalize de string.js
// Re-exporter truncate (default) comme named export
// Re-exporter tout de math.js

// main.js — import depuis le barrel
import { slugify, truncate, clamp, randomInt } from './utils/index.js'
console.log(slugify('Hello World'))
console.log(clamp(150, 0, 100))  // 100`,
    },
    {
      title: "Dynamic import & Code splitting",
      sector: "⭐⭐ Niveau 2",
      context: "Charger des modules à la demande réduit le bundle initial.",
      objective: "Implémenter un routeur simple qui charge les pages en dynamic import. Afficher un indicateur de chargement.",
      starter: `// pages/home.js
export default function renderHome(container) {
  container.innerHTML = '<h1>🏠 Accueil</h1><p>Bienvenue !</p>'
}

// pages/about.js
export default function renderAbout(container) {
  container.innerHTML = '<h1>ℹ️ À propos</h1><p>Ceci est un routeur JS !</p>'
}

// router.js
const routes = {
  '/': () => import('./pages/home.js'),
  '/about': () => import('./pages/about.js'),
  '/contact': () => import('./pages/contact.js'),
}

async function naviguer(chemin) {
  const container = document.getElementById('app')
  container.innerHTML = '<p>⏳ Chargement...</p>'

  const chargerModule = routes[chemin] ?? routes['/']

  try {
    // TODO: importer le module dynamiquement
    const module = await chargerModule()
    module.default(container)
  } catch(err) {
    container.innerHTML = \`<p>❌ Page introuvable: \${chemin}</p>\`
  }
}

// Navigation via popstate
window.addEventListener('popstate', () => naviguer(location.pathname))
document.querySelectorAll('a[data-route]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault()
    history.pushState(null, '', a.href)
    naviguer(a.getAttribute('href'))
  })
})`,
    },
    {
      title: "Plugin system",
      sector: "⭐⭐⭐ Niveau 3",
      context: "Construire un système extensible avec des plugins.",
      objective: "Créer un `PluginManager` qui permet d'enregistrer, activer et désactiver des plugins avec hooks (beforeProcess, afterProcess).",
      starter: `class PluginManager {
  constructor() {
    this.plugins = new Map()
    this.hooks = new Map()
  }

  register(nom, plugin) {
    // plugin = { install(manager), hooks: { beforeProcess?, afterProcess? } }
    this.plugins.set(nom, { ...plugin, actif: false })
  }

  activer(nom) {
    const plugin = this.plugins.get(nom)
    if (!plugin) throw new Error(\`Plugin '\${nom}' introuvable\`)
    plugin.install?.(this)
    // TODO: enregistrer les hooks du plugin
    for (const [hook, fn] of Object.entries(plugin.hooks || {})) {
      if (!this.hooks.has(hook)) this.hooks.set(hook, [])
      this.hooks.get(hook).push(fn)
    }
    plugin.actif = true
  }

  async process(data) {
    let result = data
    // TODO: exécuter les hooks beforeProcess en séquence
    for (const fn of this.hooks.get('beforeProcess') || []) {
      result = await fn(result)
    }
    // ... traitement principal ...
    for (const fn of this.hooks.get('afterProcess') || []) {
      result = await fn(result)
    }
    return result
  }
}

const manager = new PluginManager()
manager.register('logger', {
  hooks: { beforeProcess: data => { console.log('avant:', data); return data } }
})
manager.register('majuscule', {
  hooks: { afterProcess: data => data.toUpperCase() }
})
manager.activer('logger')
manager.activer('majuscule')
manager.process('hello world').then(console.log)  // HELLO WORLD`,
    },
  ],

  714: [
    {
      title: "Try/catch async",
      sector: "⭐ Niveau 1",
      context: "Les erreurs async doivent être gérées avec try/catch.",
      objective: "Écrire un wrapper `safe(promise)` qui retourne [data, null] ou [null, error] — le pattern go-style pour éviter les try/catch imbriqués.",
      starter: `// Pattern "go-style" error handling
async function safe(promise) {
  try {
    const data = await promise
    return [data, null]
  } catch(err) {
    return [null, err]
  }
}

// Exemple d'utilisation — plus lisible que try/catch imbriqués
async function recupererUtilisateur(id) {
  const [user, errUser] = await safe(fetch(\`https://jsonplaceholder.typicode.com/users/\${id}\`).then(r => r.json()))
  if (errUser) return console.error('Erreur user:', errUser.message)

  const [posts, errPosts] = await safe(fetch(\`https://jsonplaceholder.typicode.com/posts?userId=\${id}\`).then(r => r.json()))
  if (errPosts) return console.error('Erreur posts:', errPosts.message)

  console.log(\`\${user.name} a \${posts.length} posts\`)
}

recupererUtilisateur(1)
recupererUtilisateur(9999)  // Tester avec ID inexistant`,
    },
    {
      title: "Erreurs personnalisées",
      sector: "⭐⭐ Niveau 2",
      context: "Des classes d'erreur spécifiques rendent le débogage plus facile.",
      objective: "Créer une hiérarchie d'erreurs: AppError → ValidationError, NetworkError, AuthError. Chaque classe a: message, code, timestamp, toJSON().",
      starter: `class AppError extends Error {
  constructor(message, code = 'APP_ERROR') {
    super(message)
    this.name = this.constructor.name
    this.code = code
    this.timestamp = new Date().toISOString()
    // Capture la stack proprement
    if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor)
  }

  toJSON() {
    return { name: this.name, message: this.message, code: this.code, timestamp: this.timestamp }
  }
}

class ValidationError extends AppError {
  constructor(champ, message) {
    super(message, 'VALIDATION_ERROR')
    this.champ = champ
  }
  // TODO: surcharger toJSON() pour inclure champ
}

class NetworkError extends AppError {
  constructor(status, url) {
    super(\`HTTP \${status}: \${url}\`, 'NETWORK_ERROR')
    this.status = status
  }
}

// Fonction de gestion centralisée
function gererErreur(err) {
  if (err instanceof ValidationError) console.log(\`Validation [\${err.champ}]: \${err.message}\`)
  else if (err instanceof NetworkError) console.log(\`Réseau [\${err.status}]: \${err.message}\`)
  else if (err instanceof AppError) console.log(\`App [\${err.code}]: \${err.message}\`)
  else console.log('Erreur inattendue:', err)
  console.log(JSON.stringify(err.toJSON?.() ?? {}, null, 2))
}

try { throw new ValidationError('email', 'Format invalide') } catch(e) { gererErreur(e) }`,
    },
  ],

  715: [
    {
      title: "Script de traitement de fichiers",
      sector: "⭐⭐ Niveau 2",
      context: "Node.js est idéal pour les scripts de traitement de fichiers.",
      objective: "Écrire un script qui lit tous les fichiers .json d'un dossier, les fusionne en un seul fichier, et affiche des stats.",
      starter: `import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function fusionnerJsons(dossier) {
  const fichiers = await fs.readdir(dossier)
  const jsonFichiers = fichiers.filter(f => f.endsWith('.json'))

  console.log(\`Trouvé \${jsonFichiers.length} fichiers JSON\`)

  const resultats = await Promise.allSettled(
    jsonFichiers.map(async f => {
      const contenu = await fs.readFile(path.join(dossier, f), 'utf-8')
      return { fichier: f, data: JSON.parse(contenu) }
    })
  )

  // TODO: séparer succès et échecs
  const succes = resultats.filter(r => r.status === 'fulfilled').map(r => r.value)
  const echecs = resultats.filter(r => r.status === 'rejected')

  console.log(\`✅ \${succes.length} parsés, ❌ \${echecs.length} erreurs\`)

  // TODO: fusionner toutes les données et sauvegarder en merged.json
  const fusionne = succes.reduce((acc, { data }) => {
    return Array.isArray(data) ? [...acc, ...data] : [...acc, data]
  }, [])

  await fs.writeFile('merged.json', JSON.stringify(fusionne, null, 2))
  console.log(\`Sauvegardé: \${fusionne.length} entrées dans merged.json\`)
}

fusionnerJsons('./data')`,
    },
    {
      title: "CLI avec arguments",
      sector: "⭐⭐⭐ Niveau 3",
      context: "Créer un outil CLI sans dépendances externes.",
      objective: "Créer un CLI `notes` : `notes add <texte>`, `notes list`, `notes delete <id>`, `notes search <query>`. Persister dans notes.json.",
      starter: `import fs from 'fs/promises'
import path from 'path'

const FICHIER = 'notes.json'

async function charger() {
  try {
    return JSON.parse(await fs.readFile(FICHIER, 'utf-8'))
  } catch { return [] }
}

async function sauvegarder(notes) {
  await fs.writeFile(FICHIER, JSON.stringify(notes, null, 2))
}

const commandes = {
  async add([...mots]) {
    const texte = mots.join(' ')
    if (!texte) return console.log('Usage: notes add <texte>')
    const notes = await charger()
    const note = { id: Date.now(), texte, date: new Date().toISOString() }
    notes.push(note)
    await sauvegarder(notes)
    console.log(\`✅ Note ajoutée [id: \${note.id}]\`)
  },

  async list() {
    const notes = await charger()
    if (!notes.length) return console.log('Aucune note.')
    notes.forEach(n => console.log(\`[\${n.id}] \${n.texte} (\${new Date(n.date).toLocaleDateString('fr-FR')})\`))
  },

  // TODO: implémenter delete et search
  async delete([id]) { /* ... */ },
  async search([...mots]) { /* ... */ },
}

const [,, cmd, ...args] = process.argv
const handler = commandes[cmd]
if (handler) handler(args).catch(console.error)
else console.log('Commandes: add, list, delete, search')`,
    },
  ],

  716: [
    {
      title: "API REST Express — CRUD",
      sector: "⭐⭐ Niveau 2",
      context: "Créer une API complète avec Express.",
      objective: "Créer une API /api/books avec CRUD complet. Valider les données entrantes. Retourner les bons status codes.",
      starter: `import express from 'express'

const app = express()
app.use(express.json())

const livres = new Map()
let nextId = 1

// GET /api/books — liste avec filtre ?auteur= optionnel
app.get('/api/books', (req, res) => {
  let liste = [...livres.values()]
  if (req.query.auteur) {
    liste = liste.filter(l => l.auteur.toLowerCase().includes(req.query.auteur.toLowerCase()))
  }
  res.json(liste)
})

// GET /api/books/:id
app.get('/api/books/:id', (req, res) => {
  const livre = livres.get(Number(req.params.id))
  if (!livre) return res.status(404).json({ error: 'Livre introuvable' })
  res.json(livre)
})

// POST /api/books — créer
app.post('/api/books', (req, res) => {
  const { titre, auteur, annee } = req.body
  // TODO: valider que titre et auteur sont présents
  if (!titre || !auteur) return res.status(400).json({ error: 'titre et auteur requis' })
  const livre = { id: nextId++, titre, auteur, annee: annee ?? null }
  livres.set(livre.id, livre)
  res.status(201).json(livre)
})

// TODO: PUT /api/books/:id et DELETE /api/books/:id

app.listen(3000, () => console.log('API livres sur :3000'))`,
    },
    {
      title: "Middleware auth + rate limiting",
      sector: "⭐⭐⭐ Niveau 3",
      context: "Sécuriser une API Express avec des middlewares.",
      objective: "Ajouter: middleware d'auth par API key, rate limiting (10 req/min par IP), middleware de logging avec durée, gestionnaire d'erreurs centralisé.",
      starter: `import express from 'express'

const app = express()
app.use(express.json())

// Rate limiting par IP
const compteurs = new Map()
function rateLimiter(maxReq = 10, fenetreMs = 60000) {
  return (req, res, next) => {
    const ip = req.ip
    const maintenant = Date.now()

    if (!compteurs.has(ip)) compteurs.set(ip, [])
    const historique = compteurs.get(ip).filter(t => maintenant - t < fenetreMs)

    if (historique.length >= maxReq) {
      return res.status(429).json({ error: 'Trop de requêtes', retryAfter: Math.ceil(fenetreMs / 1000) })
    }

    historique.push(maintenant)
    compteurs.set(ip, historique)
    next()
  }
}

// TODO: middleware de logging (method, path, status, durée)
function logger(req, res, next) { /* ... */ }

// TODO: middleware d'auth par API key (header X-API-Key)
const API_KEYS = new Set(['cle-dev-123', 'cle-prod-456'])
function auth(req, res, next) { /* ... */ }

// TODO: gestionnaire d'erreurs centralisé (4 params !)
function gestionnaireErreurs(err, req, res, next) { /* ... */ }

app.use(logger)
app.use('/api', rateLimiter(10))
app.get('/api/public', (req, res) => res.json({ msg: 'Public' }))
app.get('/api/prive', auth, (req, res) => res.json({ msg: 'Privé', cle: req.apiKey }))
app.use(gestionnaireErreurs)

app.listen(3000)`,
    },
  ],

  717: [
    {
      title: "Tests unitaires avec Jest",
      sector: "⭐⭐ Niveau 2",
      context: "Tester des fonctions pures est simple avec Jest.",
      objective: "Écrire des tests complets pour un module `panier.js` avec: ajouter, supprimer, totalPrix, appliquerReduction.",
      starter: `// panier.js
export function creerPanier() {
  let items = []
  return {
    ajouter(produit, quantite = 1) {
      const existant = items.find(i => i.id === produit.id)
      if (existant) existant.quantite += quantite
      else items.push({ ...produit, quantite })
    },
    supprimer(id) { items = items.filter(i => i.id !== id) },
    totalPrix() { return items.reduce((s, i) => s + i.prix * i.quantite, 0) },
    appliquerReduction(pct) { return this.totalPrix() * (1 - pct / 100) },
    get items() { return [...items] },
    get taille() { return items.reduce((s, i) => s + i.quantite, 0) }
  }
}

// panier.test.js
import { creerPanier } from './panier.js'

describe('Panier', () => {
  let panier
  const laptop = { id: 1, nom: 'Laptop', prix: 999 }
  const souris = { id: 2, nom: 'Souris', prix: 29 }

  beforeEach(() => { panier = creerPanier() })

  test('démarre vide', () => {
    // TODO: vérifier items.length === 0 et totalPrix() === 0
  })

  test('ajouter un produit', () => {
    panier.ajouter(laptop)
    // TODO: vérifier taille === 1 et totalPrix() === 999
  })

  test('ajouter le même produit cumule la quantité', () => {
    panier.ajouter(laptop)
    panier.ajouter(laptop, 2)
    // TODO: vérifier items.length === 1 et taille === 3
  })

  // TODO: tests pour supprimer, réduction, etc.
})`,
    },
    {
      title: "Tests async & mocks",
      sector: "⭐⭐⭐ Niveau 3",
      context: "Tester du code asynchrone qui dépend d'APIs externes.",
      objective: "Mocker fetch pour tester `chargerUtilisateur(id)` sans vraie requête réseau. Tester succès, 404, et erreur réseau.",
      starter: `// userService.js
export async function chargerUtilisateur(id) {
  const resp = await fetch(\`https://jsonplaceholder.typicode.com/users/\${id}\`)
  if (!resp.ok) throw Object.assign(new Error(\`HTTP \${resp.status}\`), { status: resp.status })
  return resp.json()
}

export async function chargerAvecPosts(id) {
  const [user, posts] = await Promise.all([
    chargerUtilisateur(id),
    fetch(\`https://jsonplaceholder.typicode.com/posts?userId=\${id}\`).then(r => r.json())
  ])
  return { ...user, posts }
}

// userService.test.js
import { chargerUtilisateur, chargerAvecPosts } from './userService.js'

// Mock global de fetch
global.fetch = jest.fn()

describe('chargerUtilisateur', () => {
  afterEach(() => jest.resetAllMocks())

  test('retourne l\'utilisateur si succès', async () => {
    const mockUser = { id: 1, name: 'Alice', email: 'alice@test.com' }
    fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockUser) })

    // TODO: appeler chargerUtilisateur(1) et vérifier le résultat
  })

  test('lève une erreur si 404', async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 404 })
    // TODO: vérifier que la promesse rejette avec status 404
    await expect(chargerUtilisateur(999)).rejects.toMatchObject({ status: 404 })
  })

  // TODO: test erreur réseau (fetch rejette)
})`,
    },
  ],

  718: [
    {
      title: "Types de base TypeScript",
      sector: "⭐ Niveau 1",
      context: "TypeScript ajoute des types statiques à JavaScript.",
      objective: "Typer des fonctions existantes, créer des interfaces, utiliser les union types et les generics de base.",
      starter: `// TODO: ajouter les types TypeScript

// 1. Fonction typée
function calculerIMC(poids: number, taille: number): number {
  return poids / (taille ** 2)
}

// 2. Interface
interface Utilisateur {
  id: number
  nom: string
  email?: string  // optionnel
  role: 'admin' | 'user' | 'moderateur'  // union type
}

// 3. Fonction avec generics
function premierElement<T>(tableau: T[]): T | undefined {
  return tableau[0]
}

// 4. Type guard
function estString(valeur: unknown): valeur is string {
  return typeof valeur === 'string'
}

// Tests
const u: Utilisateur = { id: 1, nom: 'Alice', role: 'admin' }
console.log(premierElement([1, 2, 3]))      // type: number
console.log(premierElement(['a', 'b']))      // type: string
console.log(premierElement([]))              // type: undefined

// TODO: créer un type ApiResponse<T> générique
// TODO: typer une fonction fetchUser(id: number): Promise<Utilisateur>`,
    },
    {
      title: "Utility Types & Narrowing",
      sector: "⭐⭐ Niveau 2",
      context: "Les utility types de TypeScript évitent la répétition de code.",
      objective: "Utiliser Partial, Required, Pick, Omit, Record, Readonly. Pratiquer le type narrowing avec des discriminated unions.",
      starter: `interface Produit {
  id: number
  nom: string
  prix: number
  stock: number
  categorie: string
  description?: string
}

// Utility types
type ProduitCreation = Omit<Produit, 'id'>
type ProduitMiseAJour = Partial<ProduitCreation>
type ProduitResume = Pick<Produit, 'id' | 'nom' | 'prix'>
type CatalogueParCategorie = Record<string, Produit[]>

// Discriminated union
type ResultatAPI<T> =
  | { status: 'succes'; data: T; timestamp: string }
  | { status: 'erreur'; code: number; message: string }
  | { status: 'chargement' }

function afficherResultat<T>(resultat: ResultatAPI<T>): void {
  // TODO: type narrowing avec switch(resultat.status)
  switch (resultat.status) {
    case 'succes':
      console.log('Data:', resultat.data)  // TS sait que data existe ici
      break
    case 'erreur':
      // TODO
      break
    case 'chargement':
      // TODO
      break
  }
}

// Tests
const ok: ResultatAPI<Produit[]> = { status: 'succes', data: [], timestamp: new Date().toISOString() }
const err: ResultatAPI<never> = { status: 'erreur', code: 404, message: 'Non trouvé' }
afficherResultat(ok)
afficherResultat(err)`,
    },
    {
      title: "API TypeScript typée bout-en-bout",
      sector: "⭐⭐⭐ Niveau 3",
      context: "Typer toute la couche API pour éviter les erreurs runtime.",
      objective: "Créer un client API entièrement typé avec TypeScript: types de requête/réponse, erreurs typées, generics pour les endpoints.",
      starter: `// types.ts
export interface User { id: number; name: string; email: string }
export interface Post { id: number; userId: number; title: string; body: string }
export interface ApiError { status: number; message: string }

// Endpoints typés
interface Endpoints {
  'GET /users': { response: User[] }
  'GET /users/:id': { params: { id: number }; response: User }
  'POST /users': { body: Omit<User, 'id'>; response: User }
  'GET /posts': { query?: { userId?: number }; response: Post[] }
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'
type EndpointKey = keyof Endpoints

// Client typé
class TypedApiClient {
  constructor(private baseURL: string) {}

  async get<T>(endpoint: string): Promise<T> {
    const resp = await fetch(this.baseURL + endpoint)
    if (!resp.ok) {
      const err: ApiError = { status: resp.status, message: await resp.text() }
      throw err
    }
    return resp.json()
  }

  async post<T, B>(endpoint: string, body: B): Promise<T> {
    const resp = await fetch(this.baseURL + endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    if (!resp.ok) throw { status: resp.status, message: await resp.text() } as ApiError
    return resp.json()
  }
}

// TODO: utiliser le client avec types inférés
const client = new TypedApiClient('https://jsonplaceholder.typicode.com')

async function main() {
  const users = await client.get<User[]>('/users')
  console.log(users[0].name)  // TypeScript sait que c'est un User

  const posts = await client.get<Post[]>('/posts?userId=1')
  console.log(\`\${posts.length} posts\`)
}

main().catch(console.error)`,
    },
  ],
}

export default JS_PROJECTS
