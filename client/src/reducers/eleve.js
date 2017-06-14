const initialEleve =
    {
        name: "Maxime",
        master: []
    }
;

const eleve = (state = initialEleve, action) => {
    switch (action.type) {
        case 'MASTER_COMPETENCE' :
            return {
                ...state,
                master: [
                    ...state.master,
                    action.code
                ]
            };
        case 'UNMASTER_COMPETENCE' :
            return {
                ...state,
                master: state.master.filter(competence => competence !== action.code)
            };
        default :
            return state
    }
};
export default eleve;
