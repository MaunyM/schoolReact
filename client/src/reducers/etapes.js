const etape = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_ETAPE':
            return {
                ...state,
                description: action.description,
                competenceId: action.competenceId
            };
        default:
            return state
    }
};

const etapes = (state = [], action) => {
    switch (action.type) {
        case 'ADD_ETAPE':
            return [
                ...state,
                etape({}, action)
            ];
        case 'ETAPES_LOADED':
            return action.etapes;
        default :
            return state
    }
};
export default etapes;
