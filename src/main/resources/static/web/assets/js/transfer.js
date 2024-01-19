const app = Vue.createApp({
    data() {
        return {
            client: {},
            accounts: {},  
            amount: 0,
            description: "",
            originNumber: "",
            destinationNumber: "",
            email: "",
            showSpinner: false,
            showSpinnerOriginAccount: false  
        };
    },

    created() {
        this.showSpinnerOriginAccount = true
        axios.get("/api/clients/current/accounts")
            .then(response => {
                this.accounts = response.data;
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                this.showSpinnerOriginAccount = false;
              });
            axios.get("/api/clients/current")
            .then(response=>{
            this.client = response.data;
            this.email = this.client.email
            })
            .catch(error => console.log(error))
            
    },

    methods: {
        generateTransfer(){
            Swal.fire({
                title: 'Are you sure about making the transfer?',
                text: 'It is not cancelable',
                showCancelButton: true,
                cancelButtonText: 'Cancell',
                confirmButtonText: 'Yes',
                confirmButtonColor: '#35A29F',
                cancelButtonColor: '#041653',
                showClass: {
                  popup: 'swal2-noanimation',
                  backdrop: 'swal2-noanimation'
                },
                hideClass: {
                  popup: '',
                  backdrop: ''
            }, preConfirm: () => {
                this.showSpinner = true
                axios.post(`/api/clients/current/transfers`, `amount=${this.amount}&description=${this.description}&originNumber=${this.originNumber}&destinationNumber=${this.destinationNumber}`)
                .then(() => {
                    Swal.fire({
                        title: "Transfer completed successfully",
                        icon: "success",
                        confirmButtonColor: "#35A29F",
                      }).then((result) => {
                        if (result.isConfirmed) {
                            location.pathname = `/web/assets/pages/transfers.html`;
                        }
                      });    
                    
                })
                .catch(error => {
                    Swal.fire({
                      icon: 'error',
                      text: error.response.data,
                      confirmButtonColor: "#35A29F",
                      
                    });
                    console.log(error);
            })
            .finally(() => {
                this.showSpinner = false;
              });
            },
        })
        },

        logout() {
            Swal.fire({
                title: 'Are you sure you want to log out?',
                text: 'Will be redirected to the homepage',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Log Out',
                confirmButtonColor: '#35A29F',
                cancelButtonColor: '#041653',
                showClass: {
                    popup: 'swal2-noanimation',
                    backdrop: 'swal2-noanimation'
                },
                hideClass: {
                    popup: '',
                    backdrop: ''
                }, 
                preConfirm: () => {
                    axios.post(`/api/logout`)
                        .then(response => {
                            console.log("SignOut");
                            location.pathname = `/index.html`;
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            });
        },

        formatNumber(number) {
            return number.toLocaleString("De-DE", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
        },
    }
},
);
app.mount('#app');