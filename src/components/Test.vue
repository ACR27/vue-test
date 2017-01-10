<template>
    <div>
        <div class="hello">
            <h1 v-text="title"/>
            <p v-if="showName" v-text="user.first_name"/>
            <p v-if="showName" v-text="user.last_name"/>
            <input type="text" v-model="title"><br>
            <ul>
                <li v-for="item in items">{{item.title}}</li>
            </ul>
            <button v-on:click="greet('Hello World')">Say Greeting</button>
            <input type="text" v-on:keyup="pressKey" v-on:keyup.enter="enterHit">
            <br>
            <label> First Name: </label> <input type="text" v-model="user.first_name">
            <br>
            <label> Last Name: </label> <input type="text" v-model="user.last_name">
            <br>
            <h3> {{fullName}} </h3>
            <h2>{{msg}}</h2>
        </div>
    </div>
</template>
<style>
    .hello {
        background-color:#888888;
        width:300px;

    }
</style>
<script>
    export default{
        name: "test",
        props: {
            msg: {
                type: String,
                default: "FOOBAR"
            }
        },
        data(){
            return{
                title:'This is test component',
                user: {
                    first_name: 'John',
                    last_name: 'Doe'
                },
                showName: true,
                items: [
                    {title: "Item One"},
                    {title: "Item Two"},
                    {title: "Item Three"},
                ]
            }
        },
        methods: {
            greet: function(string) {
                alert("YOOO: " + string);
            },
            pressKey: function(e) {
                console.log("PRESSED: " + e.target.value)
            },
            enterHit: function(e) {
                console.log("ENTER HIT: " + e.target.value)
            }
        },
        computed: {
                fullName: function() {
                    return this.user.first_name + " " + this.user.last_name
                }
            },

        components:{}
    }
</script>
