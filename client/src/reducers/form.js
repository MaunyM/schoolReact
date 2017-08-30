const defaultState =
    {
        domaine: {},
        competence: {},
        etape: {},
        eleve: {}
    };


const form = (state = defaultState, action) => {
    switch (action.type) {
        case 'CHANGE_FIELD':
            return {
                ...state,
                [action.form]: {
                    ...state[action.form],
                    [action.field]: action.value
                }
            };
        case 'CANCEL_FORM':
            return {
                ...state,
                [action.form]: {...defaultState[action.form]}
            };
        default:
            return state
    }
};

export default form;
