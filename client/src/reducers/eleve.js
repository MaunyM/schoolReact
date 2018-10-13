const eleve = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_ELEVE':
            return {
                ...state,
                name: action.name,
                userId: action.userId
            };
        default :
            return state
    }
};

const cmp = (a, b) => {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
};

const eleves = (state = [], action) => {
    switch (action.type) {
        case 'ADD_ELEVE':
            return [
                ...state,
                eleve({}, action)
            ].sort((eleveA, eleveB) => cmp(eleveA.name, eleveB.name));
        case 'UPDATE_ELEVE':
            return [
                ...state.filter(eleve => eleve._id !== action.eleve._id),
                action.eleve
            ].sort((eleveA, eleveB) => cmp(eleveA.name, eleveB.name));
        case 'ELEVES_LOADED':
            return action.eleves;
        default :
            return state
    }
};
export default eleves;
