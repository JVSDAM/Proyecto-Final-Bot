var loadedPlayers = [[]]
var loadedTeams = [[]]
var loadedTournaments = [[]]

function requestAll(name){
    console.log(name)
    if(name == null){
        getPlayers();
        getTeams();
        getTournaments();
    }else{
        getPlayersByName(name);
        getTeamsByName(name);
        getTournamentsByName(name);
    }
}

async function getPlayers() {
    const url = 'http://localhost:3001/players';
    const response = await fetch(url);

    if (response.ok) {
        const data = await response.json();
        parsePlayersData(data);
    } else {
        console.error('Error al obtener jugadores:', response.status);
    }
}

async function getPlayersByName(name) {
    const url = 'http://localhost:3001/players/' + name;
    const response = await fetch(url);

    if (response.ok) {
        const data = await response.json();
        parsePlayersData(data);
    } else {
        console.error('Error al obtener jugadores:', response.status);
    }
}

function parsePlayersData(data){
    loadedPlayers.length = data.results.length
    data.results.forEach(function (player, i) {
        if (player) {
            loadedPlayers[i] = []
            loadedPlayers[i][0] = player.name
            loadedPlayers[i][1] = player.description
        }
    }); 
    console.log(loadedPlayers)
}

async function getTeams() {
    const url = 'http://localhost:3001/teams';
    const response = await fetch(url);

    if (response.ok) {
        const data = await response.json();
        parseTeamsData(data);
    } else {
        console.error('Error al obtener equipos:', response.status);
    }
}

async function getTeamsByName(name) {
    const url = 'http://localhost:3001/teams/' + name;
    const response = await fetch(url);

    if (response.ok) {
        const data = await response.json();
        parseTeamsData(data);
    } else {
        console.error('Error al obtener equipos:', response.status);
    }
}

function parseTeamsData(data){
    loadedTeams.length = data.results.length
    data.results.forEach(function (team, i) {
        if (team) {
            loadedTeams[i] = []
            loadedTeams[i][0] = team.name
            loadedTeams[i][1] = team.description
        }
    });   
    console.log(loadedTeams)
}

async function getTournaments() {
    const url = 'http://localhost:3001/tournaments';
    const response = await fetch(url);

    if (response.ok) {
        const data = await response.json();
        parseTournamentsData(data);
    } else {
        console.error('Error al obtener torneos:', response.status);
    }
}

async function getTournamentsByName(name) {
    const url = 'http://localhost:3001/tournaments/' + name;
    const response = await fetch(url);

    if (response.ok) {
        const data = await response.json();
        parseTournamentsData(data);
    } else {
        console.error('Error al obtener torneos:', response.status);
    }
}

function parseTournamentsData(data){
    loadedTournaments.length = data.results.length
    data.results.forEach(function (tournament, i) {
        if (tournament) {
            loadedTournaments[i] = []
            loadedTournaments[i][0] = tournament.name
            loadedTournaments[i][1] = tournament.description
        }
    });
    console.log(loadedTournaments)
}

exports.loadedPlayers = loadedPlayers;
exports.loadedTeams = loadedTeams;
exports.loadedTournaments = loadedTournaments;
exports.requestAll = requestAll;