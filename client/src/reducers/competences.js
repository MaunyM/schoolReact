const competence = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_COMPETENCE':
            return {
                ...state,
                description: action.description,
                domaineId: action.domaineId
            };
        default:
            return state
    }
};

const competences = (state = [], action) => {
    switch (action.type) {
        case 'COMPETENCES_LOADED':
            return action.competences;
        case 'ADD_COMPETENCE':
            return [
                ...state,
                competence({}, action)
            ];
        default :
            return state
    }
};
export default competences;
