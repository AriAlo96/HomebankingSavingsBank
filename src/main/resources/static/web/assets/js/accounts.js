const app = Vue.createApp({
    data() {
        return {
            client: {},
            accounts: {},
            loans: {},
            accountType: null,
            email: "",
            showSpinner: false,
            showSpinnerDeleteAccount: false,
            showSpinnerCreateAccount: false,
        };
    },

    created() {
        this.showSpinner = true
        axios.get("/api/clients/current")
            .then(response => {
                this.client = response.data;
                this.email = this.client.email
                this.accounts = this.client.accounts;
                this.accounts.sort((a, b) => a.id - b.id);
                console.log(this.accounts);
                this.loans = this.client.loans
                console.log(this.loans);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                this.showSpinner = false;
              });
    },

    methods: {
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

        createNewAccount() {
            Swal.fire({
                title: 'Do you want to create a new account?',
                text: 'Remember that you can only have 3 accounts',
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
                this.showSpinnerCreateAccount = true
            axios.post(`/api/clients/current/accounts`,`accountType=${this.accountType}`)
                .then(() => {
                    Swal.fire({
                        title: "Successfully created account",
                        icon: "success",
                        confirmButtonColor: "#35A29F",
                      }).then((result) => {
                        if (result.isConfirmed) {
                            location.pathname = `/web/accounts.html`;
                        }
                      });   
                    
                })
                .catch(error => {
                    Swal.fire({
                      icon: 'error',
                      text: error.response.data,
                      confirmButtonColor: "#35A29F",
                    });
            })
            .finally(() => {
                this.showSpinnerCreateAccount = false;
              });
            },
        })
    },

    deleteAccount(id) {
        Swal.fire({
            title: 'Do you want to delete account?',
            text: 'This action cannot be reversed',
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
            this.showSpinnerDeleteAccount = true
            axios.patch(`/api/clients/current/accounts`, `id=${id}`)
            .then(() => {
                Swal.fire({
                    title: "Successfully delete account",
                    icon: "success",
                    confirmButtonColor: "#35A29F",
                  }).then((result) => {
                    if (result.isConfirmed) {
                        location.pathname = `/web/accounts.html`;
                    }
                  });    
            })
            .catch(error => {
                Swal.fire({
                  icon: 'error',
                  text: error.response.data,
                  confirmButtonColor: "#35A29F",
                });
        })
        .finally(() => {
            this.showSpinnerDeleteAccount = false;
          });
        },
    })
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