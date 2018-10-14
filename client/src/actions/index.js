import {ajax} from 'rxjs/observable/dom/ajax';
import {combineEpics} from 'redux-observable';
import {push} from 'react-router-redux'

import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import {of} from 'rxjs/observable/of'


export const loadDomaines = () => ({type: 'LOAD_DOMAINES'});
export const addDomaine = (name, code) => ({type: 'ADD_DOMAINE', name, code});
export const removeDomaine = (id) => ({type: 'REMOVE_DOMAINE', id});
export const domainesLoaded = (domaines) => ({type: 'DOMAINES_LOADED', domaines});
export const updateDomaine = (domaine) => ({type: 'UPDATE_DOMAINE', domaine});

export const loadCompetences = () => ({type: 'LOAD_COMPETENCES'});
export const addCompetence = (domaineId, description) => ({type: 'ADD_COMPETENCE', description, domaineId});
export const removeCompetence = (id) => ({type: 'REMOVE_COMPETENCE', id});
export const competencesLoaded = (competences) => ({type: 'COMPETENCES_LOADED', competences});
export const updateCompetence = (competence) => ({type: 'UPDATE_COMPETENCE', competence});

export const loadEtapes = () => ({type: 'LOAD_ETAPES'});
export const addEtape = (competenceId, description) => ({type: 'ADD_ETAPE', description, competenceId});
export const removeEtape = (id) => ({type: 'REMOVE_ETAPE', id});
export const etapesLoaded = (etapes) => ({type: 'ETAPES_LOADED', etapes});
export const updateEtape = (etape) => ({type: 'UPDATE_ETAPE', etape});

export const loadEleves = () => ({type: 'LOAD_ELEVES'});
export const addEleve = (name, userId) => ({type: 'ADD_ELEVE', name, userId});
export const elevesLoaded = (eleves) => ({type: 'ELEVES_LOADED', eleves});
export const removeEleve = (id) => ({type: 'REMOVE_ELEVE', id});
export const updateEleve = (eleve) => ({type: 'UPDATE_ELEVE', eleve});

//Navigation
export const showSidebar = () => ({type: 'SIDEBAR_SHOW'});
export const hideSidebar = () => ({type: 'SIDEBAR_HIDE'});

//Forms
export const changeField = (form, field, value) => ({type: 'CHANGE_FIELD', form, value, field});
export const cancelForm = (form) => ({type: 'CANCEL_FORM', form});
export const editForm = (form, current) => ({type: 'EDIT_FORM', form, current});

//User
export const signIn = (name, password) => ({type: 'SIGN_IN', name, password});
export const signUp = (name, password) => ({type: 'SIGN_UP', name, password});
export const signInOk = (user, token) => ({type: 'SIGN_IN_OK', user, token});
export const signInKo = () => ({type: 'SIGN_IN_KO'});
export const signOut = () => ({type: 'SIGN_OUT'});
export const me = (token) => ({type: 'ME', token});
export const meLoaded = (user) => ({type: 'ME_LOADED', user});

const headers = () => {
    return {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`
    }
};


// epic
const fetchDomaineEpic = action$ =>
    action$.ofType('LOAD_DOMAINES')
        .mergeMap(action =>
            ajax.getJSON(
                `/api/domaines/`, headers()
            ).map(response => domainesLoaded(response))
        );


const postDomaineEpic = action$ =>
    action$.ofType('ADD_DOMAINE')
        .mergeMap(action =>
            ajax.post(`/api/domaines/`, action, headers())
                .map(response => loadDomaines())
        );

const removeDomaineEpic = action$ =>
    action$.ofType('REMOVE_DOMAINE')
        .mergeMap(action =>
            ajax.delete(`/api/domaines/${action.id}`, headers())
                .map(response => loadDomaines())
        );

const updateDomaineEpic = action$ =>
    action$.ofType('UPDATE_DOMAINE')
        .mergeMap(action =>
            ajax.put(`/api/domaines/${action.domaine._id}`, action.domaine, headers())
        ).map(response => loadDomaines());

const fetchCompetenceEpic = action$ =>
    action$.ofType('LOAD_COMPETENCES')
        .mergeMap(action =>
            ajax.getJSON(
                `/api/competences/`, headers()
            ).map(response => competencesLoaded(response))
        );

const postCompetenceEpic = action$ =>
    action$.ofType('ADD_COMPETENCE')
        .mergeMap(action =>
            ajax.post(`/api/competences/`, action, headers())
                .map(response => loadCompetences())
        );

const removeCompetenceEpic = action$ =>
    action$.ofType('REMOVE_COMPETENCE')
        .mergeMap(action =>
            ajax.delete(`/api/competences/${action.id}`, headers())
                .map(response => loadCompetences())
        );

const updateCompetenceEpic = action$ =>
    action$.ofType('UPDATE_COMPETENCE')
        .mergeMap(action =>
            ajax.put(`/api/competences/${action.competence._id}`, action.competence, headers())
        ).map(response => loadCompetences());

const fetchEtapeEpic = action$ =>
    action$.ofType('LOAD_ETAPES')
        .mergeMap(action =>
            ajax.getJSON(
                `/api/etapes/`, headers()
            ).map(response => etapesLoaded(response))
        );


const postEtapeEpic = action$ =>
    action$.ofType('ADD_ETAPE')
        .mergeMap(action =>
            ajax.post(`/api/etapes/`, action, headers())
                .map(response => loadEtapes())
        );

const removeEtapeEpic = action$ =>
    action$.ofType('REMOVE_ETAPE')
        .mergeMap(action =>
            ajax.delete(`/api/etapes/${action.id}`, headers())
                .map(response => loadEtapes())
        );

const updateEtapeEpic = action$ =>
    action$.ofType('UPDATE_ETAPE')
        .mergeMap(action =>
            ajax.put(`/api/etapes/${action.etape._id}`, action.etape, headers())
        ).map(response => loadEtapes());

const cmp = (a, b) => {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
};


const fetchEleveEpic = action$ =>
    action$.ofType('LOAD_ELEVES')
        .mergeMap(action =>
            ajax.getJSON(`/api/eleves/`, headers())
        ).map(response => elevesLoaded(response.sort((eleveA, eleveB) => cmp(eleveA.name, eleveB.name))))
;

const postEleveEpic = action$ =>
    action$.ofType('ADD_ELEVE')
        .mergeMap(action =>
            ajax.post(`/api/eleves/`, action, headers())
                .map(response => loadEleves())
        );

const updateEleveEpic = action$ =>
    action$.ofType('UPDATE_ELEVE')
        .mergeMap(action =>
            ajax.put(`/api/eleves/${action.eleve._id}`, action.eleve, headers())
        ).map(response => loadEleves());

const removeEleveEpic = action$ =>
    action$.ofType('REMOVE_ELEVE')
        .mergeMap(action =>
            ajax.delete(`/api/eleves/${action.id}`, headers())
                .map(response => loadEleves())
        );

const connectUserEpic = action$ =>
    action$.ofType('SIGN_IN')
        .mergeMap(action =>
            ajax.post(`/api/users/signin`, action, {'Content-Type': 'application/json'})
                .map(data => {
                    sessionStorage.setItem('jwtToken', data.response.token);
                    return signInOk(data.response.user, data.response.token)
                })
                .catch(error => of(signInKo()))
        );

const createUserEpic = action$ =>
    action$.ofType('SIGN_UP')
        .mergeMap(action =>
            ajax.post(`/api/users/signUP`, action, {'Content-Type': 'application/json'})
                .map(data => {
                    sessionStorage.setItem('jwtToken', data.response.token);
                    return signInOk(data.response.user, data.response.token)
                })
                .catch(error => of(signInKo()))
        );

const disconnectUserEpic = action$ =>
    action$.ofType('SIGN_OUT')
        .map(action => {
                sessionStorage.removeItem('jwtToken');
                return push("/login")
            }
        );

const redirectUserEpic = action$ =>
    action$.ofType('SIGN_IN_OK')
        .map(action => push("/home")
        );

const fetchMeEpic = action$ =>
    action$.ofType('ME')
        .mergeMap(action =>
            ajax.getJSON(`/api/users/me`, headers())
        ).map(response => meLoaded(response))
;

export const rootEpic = combineEpics(
    //Domaine
    fetchDomaineEpic,
    removeDomaineEpic,
    postDomaineEpic,
    updateDomaineEpic,
    //Competence
    fetchCompetenceEpic,
    removeCompetenceEpic,
    postCompetenceEpic,
    updateCompetenceEpic,
    //Etape
    fetchEtapeEpic,
    removeEtapeEpic,
    postEtapeEpic,
    updateEtapeEpic,
    //Eleve
    fetchEleveEpic,
    removeEleveEpic,
    postEleveEpic,
    updateEleveEpic,
    //User
    connectUserEpic,
    createUserEpic,
    disconnectUserEpic,
    redirectUserEpic,
    fetchMeEpic
);


