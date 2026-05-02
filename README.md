# Faire un todo-list en Javascript

Projet de formation à Javascript : être capable de faire une todo-list complète, avec sauvegarde dans un fichier au format JSON.
Le projet devra être réalisé sans IA.
Idéalement il faudra à terme être capable de réaliser le projet en 1h, sans aide extérieur (IA, documentation, cheat sheet).
Dans un second temps il faudra refaire le projet avec REACT, VUE et SOLIDJS pour pouvoir comparer les approches.

## Étape 1

- Mettre un bouton pour ajouter une tâche
- Les tâches s'affichent dans un liste à puce
- La première lettre de chaque tâche doit être une majuscule
- Les tâches doivent être stockées dans un tableau d'objets (id, valeur, check, date)

## Étape 2

- Bouton reset pour effacer toute la liste (seulement si une liste existe)
- Les tâches peuvent être supprimées
- Les tâches doivent pouvoir être cochées ou décochées
- Créer une catégorie "tâches en cours" et une autres "tâches terminées"
- Les catégories doivent être supprimées si elles sont vides
- On doit pouvoir effectuer un tri dans les tâches (par ordre alphabétique ou par date)
- Toutes les actions doivent être sauvegardées dans un fichier JSON
- Faire une class pour l'ajout d'un élément

## Attention

- On ne doit pas pouvoir ajouter une tâche vide
- Si la liste est vide `ul` ne soit pas apparaitre dans le DOM
- L'input doit être vidé à chaque ajout

## Pour aller plus loin

- Il doit y avoir un délai de 1s à chaque action avec un loader
- Pendant cette seconde, tous les boutons sont désactivés
- Le délai doit tenir compte du temps qu'il faut pour afficher / sauvegarder les données
- S'il faut 200ms pour sauvegarder une donnée et l'afficher, il faut que le temps de chargement fasse 200ms + 800 ms volontaire = 1sec