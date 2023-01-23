
## Mise en place

Indication pour mettre en place et lancer le projet.

### Back

→ Clonez le projet sur votre machine

→ Importez dans un server phpmyadmin le document **"groupomania.sql"**

→ Rendez vous dans le fichier **back** et exécutez ```npm install```

→ Rendez vous ensuite dans le fichier **back/src** et exécutez ```prisma generate```

Vous pouvez maintenant lancer le server ( toujours dans le fichier **back/src** )

```bash
node index (ou nodemon index)
```

### Front

→ Rendez vous dans le fichier **front** et exécutez ```npm install```

Vous pouvez maintenant lancer le front ( toujours dans le fichier **back/src** )

```bash
npm start
```

## En cas de problème



- Vous pouvez modifier le lien vers la base de données dans **back/src/.env/**

- Vous pouvez modifier le lien vers le serveur dans **front/src/config/config.json**
