const domaine = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_DOMAINE':
            return {
                ...state,
                name: action.name,
                code: action.code
            };
        default:
            return state
    }
};

const domaines = (state = [], action) => {
    switch (action.type) {
        case 'DOMAINES_LOADED':
            return action.domaines;
        case 'ADD_DOMAINE':
            return [
                ...state,
                domaine({}, action)
            ];
        default :
            return state
    }
};
export default domaines;
