<template>
    <div>

        <div class="gameScore" @click="goToGame(score.game_id)">
            {{score.game_id}}
            <div>
                <span>{{score.away_team_abbrev}}</span>: <span>{{score.away_team_score}}</span>
            </div>
            <div>
                <span>{{score.home_team_abbrev}}</span>: <span>{{score.home_team_score}}</span>
            </div>
            <div>{{score.game_status}}</div>
        </div>
    </div>
</template>
<style>
        .gameScore {
            height: 100px;
            width: 100px;
            cursor: pointer;
            float:left;
            display:block;
            background: #D3D3D3;
        }
</style>
<script>
    export default{
        name: "gameScore",
        props: {
            sport: {
                type: String,
                default: "nba"
            },
            score: {
                type: Object,
                default: function() {
                    return {
                        loaded: false
                    }
                }
            }
        },
        data(){
            return {

            }
        },
        methods: {
            goToGame: function(gameId) {
                window.open('http://live.numberfire.com/' + this.sport + "/" + gameId);
            }
        },
        components:{

        }
    }
</script>
