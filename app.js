import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'

const app = Vue.createApp({
    data() {
        return {
            array: [],
            url: 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json',

            imgCompany: "",
            nameCompany: "",
            urlCompany: "",
            time: "",
            type: "",
            title: "",
            location: "",
            description: "",

        }
    },
    created() {
        /*
        fetch(this.url)
        .then((res) => res.json())
        .then((data) => console.log(data));*/

        fetch("positions.json")
            .then(x => x.json())
            .then(y => this.array = y);
    },
    methods: {
        moreInfo() {

        },
        randomColor(){
            return "#"+Math.floor(Math.random()*16777215).toString(16);
        }
    }
})
app.mount('#app')