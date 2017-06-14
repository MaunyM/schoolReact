const defaultApplication = {
    nom:'',
    description:''
};

const defaultLicence = {
    valeur:'',
};

const form = (state = {application:defaultApplication, licence:defaultLicence}, action) => {
    switch (action.type) {
        case 'OPEN_LICENCE':
            return {
                ...state,
                licence: {
                    ...state.licence,
                    applicationId : action.applicationId
                }
            };
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
                [action.form]: {...defaultApplication}
            };
        default:
            return state
    }
};

export default form;
