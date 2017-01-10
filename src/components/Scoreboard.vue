<template>
    <div class="scoreboard">
        <h1>{{sport}} Scoreboard</h1>
        <div v-for="score in gameScores">
            <gameScore
                    :score="score"
                    :sport="sport"
            ></gameScore>
        </div>
    </div>
</template>
<style>
    .scoreboard {
        display:block;
        width:1000px;
        height:200px;
    }
</style>
<script>
    import GameScore from './GameScore.vue'
    import axios from 'axios'
    import _ from 'underscore'
    import CONFIG from './../config.js'

    export default{
        name: "scoreboard",
        props: {
            sport: {
                type: String,
                default: "nba"
            }
        },
        data(){
            return{
                gameScores:[],
                teamMap: {}
            }
        },
        components:{
            GameScore
        },
        created: function() {
            var app = this;
            var URL = CONFIG.SOCKET_URL + "/v1/" + app.sport;
            console.log(URL);
            var socket = require('socket.io-client')(URL);

            socket.on('scoreboard', function(data) {
                var newScore = data;
                addAbbrevsToGameScore(newScore, app.teamMap);
                console.log(newScore);
                var scoreIndex;

                _.each(app.gameScores, function(score, idx) {
                    if(score.game_id === data.game_id) {
                        console.log("FOUND AT INDEX: " + idx);
                        scoreIndex = idx;
                    }
                });
                if(scoreIndex !== undefined) {
                    app.gameScores.splice(scoreIndex, 1, newScore);
                } else {
                    // TODO REMOVE JUST FOR TESTING
                    app.gameScores.push(newScore);
                }
            });

            getInitialData(app);
        }
    }

    function getInitialData(app) {
        axios.get(CONFIG.API_URL + '/v1/' + app.sport + '/teams')
            .then(function(response) {
                var teams = response.data.body;
                _.each(teams, function(team) {
                    app.teamMap[team.id] = team;
                });
                addAbbrevsToGameScores(app.gameScores, app.teamMap);
            })
            .catch(function(err) {
                console.log(err);
            });

        axios.get(CONFIG.API_URL + '/v1/' + app.sport + '/scoreboards')
            .then(function(response) {
                app.gameScores =  response.data.body;
                console.log(response.data.body);
                addAbbrevsToGameScores(app.gameScores, app.teamMap);
            })
            .catch(function(err) {
                console.log(err);
            });
    }

    function addAbbrevsToGameScore(score, teamMap) {
        if(score === undefined || teamMap === undefined) {
            return;
        }
        var homeTeam = teamMap[score.home_team_id];
        var awayTeam = teamMap[score.away_team_id]
        if(homeTeam !== undefined) {
            score.home_team_abbrev = homeTeam.abbrev;
        }
        if(awayTeam !== undefined) {
            score.away_team_abbrev = teamMap[score.away_team_id].abbrev;
        }
    }

    function addAbbrevsToGameScores(gameScores, teamMap) {
        if(gameScores !== undefined && teamMap !== undefined) {
            _.each(gameScores, function(score) {
                addAbbrevsToGameScore(score, teamMap);
            });
        }

    }
</script>
