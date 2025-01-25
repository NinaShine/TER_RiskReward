# Utilité de models

### Ce dossier est là pour contenir les differents modèle présent dans la bbs mongo

** CHaque modèle présent dans mongodb doit êtr importé dans ce dossier

### Exemple 

** Prenon comme exemple le modèle Customer:

les fichiers modeles suivent tout le temps ce paterne:

```javascript
const  mongoose = require('mongoose') // On va chercher mongoose

const CustomerSchema = mongoose.Schema( //on défini le modèle (en accord avec la bdd)
    {
        date: (
            type: Date,
            required: true
        )
        name: (
            type: String
        )
        ...
    }
)

const Customer = mongoose.model('customers', CustomerSchema); //obligatoire 

modules.exports = Customer //on exporte
```