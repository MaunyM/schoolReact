const eleve = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_ELEVE':
            return {
                ...state,
                name : action.name
            };
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

const eleves = (state = [], action) => {
    switch (action.type) {
        case 'ADD_ELEVE':
            return [
                ...state,
                eleve({}, action)
            ];
        case 'UPDATE_ELEVE':
            return [
                ...state.filter(eleve => eleve._id !== action.eleve._id),
               action.eleve
            ];
        case 'ELEVES_LOADED':
            return action.eleves;
        default :
            return state
    }
};
export default eleves;
