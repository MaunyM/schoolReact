const express = require('express');
const fs = require('fs');
const sqlite = require('sql.js');

const filebuffer = fs.readFileSync('db/usda-nnd.sqlite3');

const db = new sqlite.Database(filebuffer);

const app = express();

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

const COLUMNS = [
    'carbohydrate_g',
    'protein_g',
    'fa_sat_g',
    'fa_mono_g',
    'fa_poly_g',
    'kcal',
    'description',
];
app.get('/api/domaines', (req, res) => {
    res.json([
            {
                name: "Nombres",
                code: "N"
            },
            {
                name: "Résoudre",
                code: "R"
            },
            {
                name: "Organisation et gestion de données",
                code: "D"
            },
            {
                name: "Grandeurs et mesures",
                code: "GM"
            }, {
                name: "Géométrie",
                code: "G"
            }, {
                name: "Calcul !",
                code: "C"
            }
        ]
    )
    ;
});

app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
