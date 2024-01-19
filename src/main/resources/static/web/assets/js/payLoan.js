const app = Vue.createApp({
    data() {
        return {
            client: {},
            accounts: {}, 
            loans: {}, 
            amount: 0, 
            idLoan: 0,
            idAccount: 0,
            email: "",
            showSpinner: false,
            showSpinnerLoans: false
        };
    },

    created() {
        this.showSpinnerLoans = true
        axios.get("/api/clients/current")
        .then(response=>{
        this.client = response.data;
        this.email = this.client.email
        console.log(this.client);
        this.loans = this.client.loans;
        this.accounts = this.client.accounts;

        })
        .catch(error => console.log(error))
        .finally(() => {
            this.showSpinnerLoans = false;
          });
    },

    methods: {
        payLoan(){
            Swal.fire({
                title: 'Do you confirm the payment of an installment of your loan?',
                text: 'It will be deducted from the selected account',
                showCancelButton: true,
                cancelButtonText: 'Cancell',
                confirmButtonText: 'Confirm',
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
                console.log(this);
            axios.post(`/api/loans/payments`, `idLoan=${this.idLoan}&idAccount=${this.idAccount}&amount=${this.amount}`)
                .then(() => {
                    Swal.fire({
                        title: "Payment made successfully",
                        icon: "success",
                        confirmButtonColor: "#35A29F",
                      }).then((result) => {
                        if (result.isConfirmed) {
                            location.pathname = `/web/assets/pages/payLoan.html`;
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