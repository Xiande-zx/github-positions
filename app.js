// import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'

const app = Vue.createApp({
    data() {
        return {
            jobList: [],
            jobListFirst: [],
            baseUrl: 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json',
            showMoreInfo: false,
            darkTheme: false,
            filterLocation: null,
            filterName: null,
            fullTimeOnly: false,
            imgCompany: '',
            nameCompany: '',
            urlCompany: '',
            time: '',
            type: '',
            title: '',
            location: '',
            description: '',
            howToApply: '',

        }
    },
    created() {
        fetch(this.baseUrl)
        .then((res) => res.json())
        .then((data) => this.jobList = data)
        .catch(this.getFromLocal)
    },

    computed: {
        getAppTheme() {
            return this.darkTheme;
        },
        getRandomColor() {
            return this.generateRandomColor();
        }
    },

    methods: {
        toggleTheme() {
            if(document.body.classList.contains('bg-ligth-body')) {
                document.body.classList.remove('bg-ligth-body');
                document.body.classList.add('bg-dark-body');
            } else {
                document.body.classList.add('bg-ligth-body');
                document.body.classList.remove('bg-dark-body');  
            }
            this.darkTheme = !this.darkTheme;
        },
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

        getMoreInfo(job) {
            this.getDetails(this.jobList[job]);
            this.showMoreInfo = true;
        },
        generateRandomColor(){
            return '#' + Math.floor(Math.random()*16777215).toString(16);
        },

        getDetails(data) {
            this.imgCompany = data.company_logo;
            this.nameCompany = data.company;
            this.urlCompany = data.company_url;
            this.time = data.created_at;
            this.type = data.type;
            this.title = data.title;
            this.location = data.location;
            this.description = data.description;
            this.howToApply = data.how_to_apply
        },

        getFromLocal() {
            console.log('API request returned an error. Getting jobs from local data!')
            fetch("github-jobs.json")
            .then(response => response.json())
            .then(data => this.jobList = data);
        }
    }
});

app.mount('#app')
