// import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'

const app = Vue.createApp({
    data() {
        return {
            array: [],
            details: [],
            baseUrl: 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json',
            description: '',
            location: '',
            createdAt: '',
            showMoreInfo: false,
            


            showDetailsUrl: '',
            filter: '',
            fullTime: false,

            imgCompany: "",
            nameCompany: "",
            urlCompany: "",
            time: "",
            type: "",
            title: "",
            location: "",
            description: "",
            howToApply: "",

        }
    },
    created() {
        
        // fetch(this.url)
        // .then((res) => res.json())
        // .then((data) => this.array = data);

        fetch("positions.json")
            .then(x => x.json())
            .then(y => this.array = y);
    },

    computed: {
  
    },

    methods: {
        timeSince(date){
            var seconds = Math.floor((new Date() - new Date(date)) / 1000);
            var interval = seconds / 31536000;
            if (interval > 1) {
                return Math.floor(interval) + " years";
            }
            interval = seconds / 2592000;
            if (interval > 1) {
                return Math.floor(interval) + " months";
            }
            interval = seconds / 86400;
            if (interval > 1) {
                return Math.floor(interval) + " days";
            }
            interval = seconds / 3600;
            if (interval > 1) {
                return Math.floor(interval) + " hours";
            }
            interval = seconds / 60;
            if (interval > 1) {
                return Math.floor(interval) + " minutes";
            }
            return Math.floor(seconds) + " seconds";
        },

        moreInfo(url) {
            // fetch('https://cors-anywhere.herokuapp.com/' + url + '.json')
            //     .then(response => response.json())
            //     .then(data => console.log(data))

                        fetch('/details.json')
                .then(response => response.json())
                .then(data => this.getDetails(data))
            this.showMoreInfo = true;


        },
        randomColor(){
            return "#"+Math.floor(Math.random()*16777215).toString(16);
        },

        getJobs() {
            this.location = location.replace(" ", "+");
            this.description = description.replace(" ", "+");
            let url;

            if(this.description != '' && this.location != '') {
                url = this.url + '?description=' + this.description + '&full_time=' + this.fullTime + '&location=' + this.location;
                console.log(url);
            }
            else if(this.description != '') {
                url = this.url + '?description=' + this.description + '&full_time=' + this.fullTime;
                console.log(url);
            }
            else if(this.location != '') {
                url = this.url + '?full_time=' + this.fullTime + '&location=' + this.location;
                console.log(url);
            }

            // fetch(url)
            //     .then(response => response.json())
            //     .then(data => this.array = data)
        },

        getDetails(data) {
            console.log(data);
            this.imgCompany = data.company_logo;
            this.nameCompany = data.company;
            this.urlCompany = data.company_url;
            this.time = data.created_at;
            this.type = data.type;
            this.title = data.title;
            this.location = data.location;
            this.description = data.description;
            this.howToApply = data.how_to_apply
        }
    }
});

app.mount('#app')
