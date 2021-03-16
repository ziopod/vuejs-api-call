# Appel API avec VueJs et Gridsome

Ce projet à pour but de se familiariser avec les appel API dans un environnement SRR avec Vue.js.

Les technologies utilisées pour la création du projet :
 - un environnement NodeJS à jour ;
 - le Framework SSR en Vue.js Gridsome ;
 - Le module de requête natif de NodeJS [`https`](https://nodejs.org/api/https.html) ;
 - le formatteur de chaine d'URL natif de NodeJS[`querystring`](https://nodejs.org/api/querystring.html) ;
 - les données d'environnements de NodeJS avec [`process.env`](https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_env)

Pour la publication et la gestion du projet : 
 - Git avec le service Github ;
 - Vercel pour la mise en production.

## Mise en place du projet

Ce projet peut très bien être intégré dans un prjet gridsome standard existant, mais pour l'exercice, créons un tout nouveau projet Gridsome. 

Voyons ensemble une méthode de mise en place standard d'un projet permettant de mettre en place facilement du développement et du déploiement continue.

### 1. initialisation du répertoire de travail

Créez un repertoire sur votre environnement de travail, par ex. `vuejs-api-call` ;

Via votre Terminal, rendez-vous dans votre repertoire : 
~~~
$ cd chemin/vers/le/repertoire/du/projet
~~~

Initalisez GIT : 
~~~
$ git init
~~~

Initialiser le gestionnaire de paquet NPM de node : 
~~~
$ npm init
~~~

Suivez les instruction ud wizard d'initialisation.

Un fois fait, installez Gridsome :
~~~
$ npm i -D gridsome
~~~

Ajoutons le script les commandes pour lancer le serveur de développement et la commande de construction (build) SSR au fichier `package.json` : 

~~~
...
"scripts": {
  "develop": "gridsome develop",
  "build": "gridsome build"
}
...
~~~

Testons la commande de build : 
~~~
$ npm run build
~~~

Gridsome devrais produit un repertoire `build` dans votre projet avec comme fichier par défaut une page 404.

Testons la commande de developpement : 
~~~
$npm run develop
~~~

Gridsome lance le serveur de developpement, rendez-vous l 'adresse local indiqué sur votre terminal.

Celle-ci nous affiche une page 404, ce qui est normal car, nous avons encore rien créé.

### 2. Versionner le projet sur Github

Afin de versionner le proet de faciliter le développement et le déploiement continue, il nécessaire de mettre à disposition notre projet sur un dépôt GIT.

Créez un nouveau dépôt sur Github. Cochez les options "Add a README file" et "Add .gitignore [node]", puis creez le dépot.

Copiez le lien de clonnage HTTPS de votre projet (bouton "Code"), dans un nouvel onglet de vote terminal, associez le dépot à ce projet local : 
~~~
$ git remote add origin https://github.com/{username}/{nom-de-votre-projet}.git
~~~

Commençons par observer les fichiers que nous voulons versionner (dans un nouvel onglet de votre terminal):
~~~
$ git status
~~~

Le terminal liste tout les nouveaux fichiers et repertoires, certain repertoires et fichiers ne doivent pas être versionnés car ils sont lié à notre environnement local de développement. C'est le cas des repertoires `dist/` et `node_modules`.
Créez un fichier `.gitignore` à la racine de votre projet, joutez les chemin à ignorer : 

~~~
dist/
node_modules
.env
~~~

Nous ignorons 


engager (commit) les fichiers que nous avons créé : 
~~~
git 
~~~


### 3. Structure de fichier de Gridsome

Gridsome est un framework, il propose une convention pour la structure de fichier Vue.js. Cette convention permet à Gridsome de "comprendre" ce que l'on lui demande de faire sans pour autant avoir à mettre en place de la configuration. Jetez un œil à [la structure de fichier de Gridsome](https://gridsome.org/docs/directory-structure/).

Commençons par **[le fichier de configuration de Gridsome](https://gridsome.org/docs/config/)**, créez le fichier `gridsome.config.js` : 
~~~
module.exports = {
  siteName: "Appels API avec Gridsome"
}
~~~

Pour constater les modifications, vous devez relancez-le serveur de Gridsome : dans votre terminal, tuez le serveur avec le raccourcis `ctrl+c`, puis relnacez-le avec la commande `npm run develop`.

Vous devriez voir le nom du site s'afficher dans le tire de l'onglet, si vous inspectez le code, vous consterez que Gridsome à définit automatiquement la balise `<title>` de l'entête HTML.

Comme on peut le constater, le fichier de configuration est un [module NodeJS CommonJS](https://nodejs.org/api/modules.html), ce mécanisme permet de facilement gérer les dependances d'un programme à la manière des [modules Javascript standard](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Modules).

Ce fichier de configuration nous permet d'indiquer quelques méta-informations (méta données HTML) qui seront chargé automatiquement dans le Layout global du site. Nous pourrons également spécifier des [plugins Gridsome](https://gridsome.org/plugins/), configurer Webpack, configurer les compileur CSS (LESS, SAAS, POSTCSS) et d'autres choses typique des usages en développement web.

Maintenant, ajoutons le fichier principale de code logique de notre application `main.js` : 
~~~
import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, { router, head, isClient }) {
  Vue.component('Layout', DefaultLayout)
}
~~~

Avec ce code, nous [définisons un composant Vue.js](https://fr.vuejs.org/v2/guide/components.html) de manière classique, dans notre cas, il s'agit de mettre le composant `Layout` à disposition de Gridsome.

Ce fichier, nous permet de communiquer avec l'[API client de Gridsome](https://gridsome.org/docs/client-api/) qui expose Vue.js. Ce qui nous permet de facilement manipuler Vue.js et ses modules.

Dans la foulée, créons ce fichier layout `src/layouts/Default.vue` (prenez garde au majuscules sur le nom du fichier) :
~~~
<template>
  <div>
    <h1>{{ $static.metadata.siteName }}</h1>
    <slot />
  </div>
</template>
<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>
~~~

Ce layout doit afficher le nom du site dans un balise HTML `<h1>` et charger les pages correspondant a URL courante à la place du [slot Vue.js](https://fr.vuejs.org/v2/guide/components-slots.html) `<slot />`

Pour le moment Gridsome nous affiche une page 404 par défault, celle-ci n'inclus pas notre layout, créons notre propre page 404 qui exploiteras notre layout `src/pages/404.html` : 

~~~
<template>
  <Layout>
    <article>
      <h1>404</h1>
      <p>Page non trouvée :(</p>
    </article>
  </Layout>
</template>
~~~

Tout ce qui est compris dans le composant `Layout` sera inséré à la place du marqueur `<slot />` du layout.

**Finalement**, créons la page d'index du site `src/pages/Index.vue` : 
~~~
<template>
  <Layout>
    <h1>Calendar API</h1>
  </Layout>
</template>
~~~

Celle-ci sera le lui de la suite de l'exercice.

Voilà qui fait le tour d'une mise en place basique de Gridsome, n'hésitez pas à jeter un œil à [la documentation de Gridsome](https://gridsome.org/docs/), la documentation sur [la structure des fichiers de Gridsome](https://gridsome.org/docs/directory-structure/) est un point de départ pour comprendre les capacités de Gridsome.


## Appel API 

Ce que nous verrons à partir de maintenant est réalisable en Vue.js indépendament de Gridsome. Les élement qui sont spécifique à Gridsome seront précisé le cas échéant.

### Terrain de jeux
Choisissons un service API simple, facilement accèssible et potentielement employable dans de futurs projet.

Le service [Open Agenda](https://openagenda.com) semble pouvoir faire l'affaire, créez-vous un compte gratuit sur celui-ci.

Un fois votre compte confirmé, [créez un agenda](https://openagenda.com/new), puis un événement. 