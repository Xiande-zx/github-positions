
const app = Vue.createApp({
    data() {
        return {
            jobList: [],
            jobListFirst: [],
            jobListBase: [],
            baseUrl: 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json',
            showMoreInfo: false,
            darkTheme: false,
            filterLocation: "",
            filterName: "",
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

        fetch(this.baseUrl)
            .then((res) => res.json())
            .then((data) => this.jobListBase = data)
            .catch(this.getFromLocalBase)
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
            if (document.body.classList.contains('bg-ligth-body')) {
                document.body.classList.remove('bg-ligth-body');
                document.body.classList.add('bg-dark-body');
            } else {
                document.body.classList.add('bg-ligth-body');
                document.body.classList.remove('bg-dark-body');
            }
            this.darkTheme = !this.darkTheme;
        },
        timeSince(date) {
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
        generateRandomColor() {
            return '#' + Math.floor(Math.random() * 16777215).toString(16);
        },
        toggleFullTime() {
            this.fullTimeOnly = !this.fullTimeOnly
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
        },
        getFromLocalBase() {
            console.log('API request returned an error. Getting jobs from local data!')
            fetch("github-jobs.json")
                .then(response => response.json())
                .then(data => this.jobListBase = data);
        },
        getJobs() {
            if (this.fullTimeOnly) {
                if (this.filterName != '' && this.filterLocation != '') {
                    this.jobList = this.jobListBase.filter((jobs) => (jobs.title.toLowerCase().includes(this.filterName.toLowerCase()) || jobs.description.toLowerCase().includes(this.filterName.toLowerCase())) && jobs.location.toLowerCase().includes(this.filterLocation.toLowerCase()) && jobs.type == 'Full Time');
                } else if (this.filterName != '') {
                    this.jobList = this.jobListBase.filter((jobs) => (jobs.title.toLowerCase().includes(this.filterName.toLowerCase()) || jobs.description.toLowerCase().includes(this.filterName.toLowerCase())) && jobs.type == 'Full Time');
                } else if (this.filterLocation != '') {
                    this.jobList = this.jobListBase.filter((jobs) => jobs.location.toLowerCase().includes(this.filterLocation.toLowerCase()) && jobs.type == 'Full Time');
                } else {
                    this.jobList = this.jobListBase.filter((jobs) => jobs.type == 'Full Time');
                }
            } else {
                if (this.filterName != '' && this.filterLocation != '') {
                    this.jobList = this.jobListBase.filter((jobs) => (jobs.title.toLowerCase().includes(this.filterName.toLowerCase()) || jobs.description.toLowerCase().includes(this.filterName.toLowerCase())) && jobs.location.toLowerCase().includes(this.filterLocation.toLowerCase()));
                }
                else if (this.filterName != '') {
                    this.jobList = this.jobListBase.filter((jobs) => (jobs.title.toLowerCase().includes(this.filterName.toLowerCase()) || jobs.description.toLowerCase().includes(this.filterName.toLowerCase())));
                } else {
                    this.jobList = this.jobListBase.filter((jobs) => jobs.location.toLowerCase().includes(this.filterLocation.toLowerCase()));
                }
            }
        }
    }
});

app.mount('#app')
