# Citation Stoïque

Une petite application qui affiche de manière aléatoire des citations stoïques de :

- Zénon de Kition (46 citations)
- Sénèque (150 citations)
- Épictète (100 citations)
- Marc Aurèle (100 citations)
- Cléanthe (20 citations)
- Chrysippe (20 citations)

Le projet a été inspiré de [stoic-quotes.com](https://github.com/benhoneywill/stoic-quotes).

Voici le lien pour accéder à l'application : [https://citation-stoique.onrender.com/](https://citation-stoique.onrender.com/).

**NB :** Le nom du répertoire est `quote-generator-backend` puisque je compte développer sous peu une application mobile portant le nom `quote-generator-app` pour afficher les citations sur des applications mobiles.

Cette application expose une API publique que vous pouvez utiliser pour récupérer des citations aléatoires à intégrer à votre application.

### Récupérer une citation aléatoire :
[GET https://citation-stoique.onrender.com/api/quote]

**Exemple de réponse JSON :**
```json
{
  "text": "Ne cherche pas à changer les événements, mais change-toi toi-même pour être en accord avec eux.",
  "author": "Épictète"
}
```

### Récupérer une liste aléatoire de citations stoïques :
[GET https://citation-stoique.onrender.com/api/quotes] 

Vous pouvez passer optionnellement un paramètre num pour modifier le nombre de citations retournées. La valeur par défaut est 10, et vous pouvez récupérer jusqu'à 100 citations maximum.

[GET https://citation-stoique.onrender.com/api/quotes?num=2]

**Exemple de réponse JSON :**
```json
[
  {
    "text": "Le sage ne se laisse pas emporter par les passions, mais les maîtrise.",
    "author": "Zénon de Kition"
  },
  {
    "text": "N'attends rien des autres, attends tout de toi-même.",
    "author": "Marc Aurèle"
  }
]
```

