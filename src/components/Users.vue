<template>
    <div>
        <div class="users">
            <h1>Users</h1>
            <ul>
                <form v-on:submit="addUser">
                    <input type="text" v-model="newUser.name" placeholder="Enter Name">
                    <br>
                    <input type="text" v-model="newUser.email" placeholder="Enter Email">
                    <br>
                    <input type="submit" value="Submit">
                </form>


                <li v-for="user in users">
                    <span :class="{contacted: user.contacted}">{{user.name}} ({{user.email}})</span>
                    <input type="checkbox" v-model="user.contacted" class="toggle">
                    <button v-on:click="deleteUser(user)">x</button>
                </li>
            </ul>
        </div>
    </div>
</template>
<style>
    .contacted {
        text-decoration: line-through;
    }
</style>
<script>
    export default{
        name: "users",
        data(){
            return{
                newUser: {},
                users: [
                ]
            }
        },
        methods: {
            addUser: function(e) {
                console.log("Adding user");
                e.preventDefault();
                this.users.push({
                    name: this.newUser.name,
                    email: this.newUser.email,
                    contacted: false
                });
            },
            deleteUser: function(user) {
                this.users.splice(this.users.indexOf(user), 1)
            }
        },
        created: function() {
            console.log("CREATED RAN");
            this.$http.get('https://jsonplaceholder.typicode.com/users')
                .then(function(response) {
                    this.users = response.data;
                });
        },
        components:{}
    }
</script>
