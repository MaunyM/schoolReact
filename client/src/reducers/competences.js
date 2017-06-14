const initialCompetences = [
    { description : "Comprendre et utiliser des nombres entiers pour dénombrer.",
        code : "N1",
        codeDomaine : "N"
    },
    { description : "Comprendre et utiliser des nombres entiers pour les décomposer.",
        code : "N2",
        codeDomaine : "N"
    },
    { description : "Comprendre et utiliser des nombres entiers pour les comparer.",
        code : "N3",
        codeDomaine : "N"
    },
    { description : "Comprendre et utiliser des nombres entiers pour les ordonner.",
        code : "N4",
        codeDomaine : "N"
    },
    { description : "Comprendre et utiliser des nombres entiers pour les encadrer.",
        code : "N5",
        codeDomaine : "N"
    },
    { description : "Comprendre et utiliser des nombres entiers pour repérer.",
        code : "N6",
        codeDomaine : "N"
    },
    { description : "Nommer les nombres entiers. (la comptine numérique)",
        code : "N7",
        codeDomaine : "N"
    },
    { description : "Lire les nombres entiers.",
        code : "N8",
        codeDomaine : "N"
    },
    { description : "Ecrire les nombres entiers.",
        code : "N9",
        codeDomaine : "N"
    },
    { description : "Représenter des nombres entiers.",
        code : "N10",
        codeDomaine : "N"
    }
];

const competences = (state = initialCompetences, action) => {
    switch (action.type) {
        default :
            return state
    }
};
export default competences;
