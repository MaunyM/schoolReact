import {ajax} from 'rxjs/observable/dom/ajax';
import {combineEpics} from 'redux-observable';
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'

export const masterCompetence = (code) => ({type: 'MASTER_COMPETENCE', code});
export const loadDomaines = (code) => ({type: 'LOAD_DOMAINES'});
export const domainesLoaded = (domaines) => ({type: 'DOMAINES_LOADED', domaines});
export const unmasterCompetence = (code) => ({type: 'UNMASTER_COMPETENCE', code});

//Forms
export const changeField = (form, field, value) => ({type: 'CHANGE_FIELD', form, value, field});
export const cancelForm = (form) => ({type: 'CANCEL_FORM', form});

// epic
const fetchUserEpic = action$ =>
    action$.ofType('LOAD_DOMAINES')
        .mergeMap(action =>
            ajax.getJSON(`/api/domaines/`)
                .map(response => domainesLoaded(response))
        );


export const rootEpic = combineEpics(
    fetchUserEpic
);
