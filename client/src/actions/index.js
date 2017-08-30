import {ajax} from 'rxjs/observable/dom/ajax';
import {combineEpics} from 'redux-observable';
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'


export const loadDomaines = () => ({type: 'LOAD_DOMAINES'});
export const addDomaine = (name, code) => ({type: 'ADD_DOMAINE', name, code});
export const removeDomaine = (id) => ({type: 'REMOVE_DOMAINE', id});
export const domainesLoaded = (domaines) => ({type: 'DOMAINES_LOADED', domaines});

export const loadCompetences = () => ({type: 'LOAD_COMPETENCES'});
export const addCompetence = (domaineId, description) => ({type: 'ADD_COMPETENCE', description, domaineId});
export const removeCompetence = (id) => ({type: 'REMOVE_COMPETENCE', id});
export const competencesLoaded = (competences) => ({type: 'COMPETENCES_LOADED', competences});

export const loadEtapes = () => ({type: 'LOAD_ETAPES'});
export const addEtape = (competenceId, description) => ({type: 'ADD_ETAPE', description, competenceId});
export const etapesLoaded = (etapes) => ({type: 'ETAPES_LOADED', etapes});

export const loadEleves = () => ({type: 'LOAD_ELEVES'});
export const addEleve = (name) => ({type: 'ADD_ELEVE', name});
export const elevesLoaded = (eleves) => ({type: 'ELEVES_LOADED', eleves});
export const removeEleve = (id) => ({type: 'REMOVE_ELEVE', id});
export const updateEleve = ( eleve) => ({type: 'UPDATE_ELEVE', eleve});

//Navigation
export const showSidebar = () => ({type: 'SIDEBAR_SHOW'});
export const hideSidebar = () => ({type: 'SIDEBAR_HIDE'});

//Forms
export const changeField = (form, field, value) => ({type: 'CHANGE_FIELD', form, value, field});
export const cancelForm = (form) => ({type: 'CANCEL_FORM', form});

// epic
const fetchDomaineEpic = action$ =>
    action$.ofType('LOAD_DOMAINES')
        .mergeMap(action =>
            ajax.getJSON(`/api/domaines/`)
                .map(response => domainesLoaded(response))
        );


const postDomaineEpic = action$ =>
    action$.ofType('ADD_DOMAINE')
        .mergeMap(action =>
            ajax.post(`/api/domaines/`, action, {'Content-Type': 'application/json'})
                .map(response => loadDomaines())
        );

const removeDomaineEpic = action$ =>
    action$.ofType('REMOVE_DOMAINE')
        .mergeMap(action =>
            ajax.delete(`/api/domaines/${action.id}`, action, {'Content-Type': 'application/json'})
                .map(response => loadDomaines())
        );

const fetchCompetenceEpic = action$ =>
    action$.ofType('LOAD_COMPETENCES')
        .mergeMap(action =>
            ajax.getJSON(`/api/competences/`)
                .map(response => competencesLoaded(response))
        );

const postCompetenceEpic = action$ =>
    action$.ofType('ADD_COMPETENCE')
        .mergeMap(action =>
            ajax.post(`/api/competences/`, action, {'Content-Type': 'application/json'})
                .map(response => loadCompetences())
        );

const removeCompetenceEpic = action$ =>
    action$.ofType('REMOVE_COMPETENCE')
        .mergeMap(action =>
            ajax.delete(`/api/competences/${action.id}`, action, {'Content-Type': 'application/json'})
                .map(response => loadCompetences())
        );

const fetchEtapeEpic = action$ =>
    action$.ofType('LOAD_ETAPES')
        .mergeMap(action =>
            ajax.getJSON(`/api/etapes/`)
                .map(response => etapesLoaded(response))
        );

const postEtapeEpic = action$ =>
    action$.ofType('ADD_ETAPE')
        .mergeMap(action =>
            ajax.post(`/api/etapes/`, action, {'Content-Type': 'application/json'})
                .map(response => loadEtapes())
        );

const removeEtapeEpic = action$ =>
    action$.ofType('REMOVE_ETAPE')
        .mergeMap(action =>
            ajax.delete(`/api/etapes/${action.id}`, action, {'Content-Type': 'application/json'})
                .map(response => loadEtapes())
        );

const fetchEleveEpic = action$ =>
    action$.ofType('LOAD_ELEVES')
        .mergeMap(action =>
            ajax.getJSON(`/api/eleves/`)
                .map(response => elevesLoaded(response))
        );

const postEleveEpic = action$ =>
    action$.ofType('ADD_ELEVE')
        .mergeMap(action =>
            ajax.post(`/api/eleves/`, action, {'Content-Type': 'application/json'})
                .map(response => loadEleves())
        );

const updateEleveEpic = action$ =>
    action$.ofType('UPDATE_ELEVE')
        .mergeMap(action =>
            ajax.put(`/api/eleves/${action.eleve._id}`, action.eleve, {'Content-Type': 'application/json'})
                .map(response => loadEleves())
        );

const removeEleveEpic = action$ =>
    action$.ofType('REMOVE_ELEVE')
        .mergeMap(action =>
            ajax.delete(`/api/eleves/${action.id}`, action, {'Content-Type': 'application/json'})
                .map(response => loadEleves())
        );

export const rootEpic = combineEpics(
    //Domaine
    fetchDomaineEpic,
    removeDomaineEpic,
    postDomaineEpic,
    //Competence
    fetchCompetenceEpic,
    removeCompetenceEpic,
    postCompetenceEpic,
    //Etape
    fetchEtapeEpic,
    removeEtapeEpic,
    postEtapeEpic,
    //Eleve
    fetchEleveEpic,
    removeEleveEpic,
    postEleveEpic,
    updateEleveEpic
);


