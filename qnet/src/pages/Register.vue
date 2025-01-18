<template>
    <div>
        <label for="Email">Email</label>
        <input v-model="email" type="text" placeholder="e.g. John Smith" name="email" />
    </div>
    <div>
        <label for="Password">Password</label>
        <input v-model="password" type="text" placeholder="e.g. John Smith" name="password" />
    </div>
    <button type="submit" @click="register()">
        Register
    </button>
</template>

<script>

export default {
    data() {
        return {
            name: '',
            sexuality: '',
            gender: '',
            age: '',
            location: '',
            email: '',
            password: '',
            about: '',
        }
    },
    methods: {
        register() {
          console.log(this.age)
            number_age = Number(this.age)
            const axios = require('axios');
            let data = JSON.stringify({
                "name": this.name,
                "about": this.about,
                "social_media": "@fredisbest",
                "sexuality": this.sexuality,
                "gender": this.gender,
                "age": number_age,
                "location": this.location,
                "questions": {
                  "Who do you love": "Fred"
                },
                "email": this.email,
                "password": this.password,
                "id": 101
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:3000/api/person',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
}

</script>