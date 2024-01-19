const app = Vue.createApp({
    data() {
        return {
            client: [],
            loans: [],
            loanId: 0,
            amount: 0,
            payments: 0,
            destinationAccount: "",
            accounts: {},
            email: "",
            showSpinner: false,
            showSpinnerLoans: false
        };
    },

    created() {
        this.showSpinnerLoans = true
        axios.get("/api/loans")
            .then(response => {
                this.loans = response.data
                console.log(this.loans);
            })
            .catch(error => console.log(error))
            .finally(() => {
                this.showSpinnerLoans = false;
              });

        axios.get("/api/clients/current/accounts")
            .then(response => {
                this.accounts = response.data;
            })
            .catch(error => {
                console.log(error);
            });
        axios.get("/api/clients/current")
            .then(response => {
                this.client = response.data;
                this.email = this.client.email
            })
            .catch(error => {
                console.log(error);
            });
    },

    methods: {
        applyForLoan() {
            Swal.fire({
                title: 'Do you confirm your application for the loan?',
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
                    axios.post("/api/loans", { "loanId": `${this.loanId}`, "amount": `${this.amount}`, "payments": `${this.payments}`, "destinationAccount": `${this.destinationAccount}` })
                        .then(() => {
                            Swal.fire({
                                title: "Successful loan application",
                                icon: "success",
                                confirmButtonColor: "#35A29F",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.pathname = `/web/assets/pages/loan-application.html`;
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

        getInterestPercentage() {
            return this.loans.find(loan => loan.id === this.loanId).interestPercentage
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
        }
    }

})
app.mount('#app');