### Ici, on veut toutes les routes de l'application qui correspondent au modèles 

** Un modèle = un fichier route pour plus de lisibilité

### les fichiers routes débutent avec les imports suivants:

```javascript
const express = require('express');
const router = express.Router();
const Modele = require('chemin d accès au fichier modele');
```

puis les différentes routes GET et POST