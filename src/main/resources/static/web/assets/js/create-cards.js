const app = Vue.createApp({
    data() {
        return {
            cards: [],
            creditCards: [],
            debitCards: [],
            cardType: "",
            cardColor: "",
            email: "",
            showSpinner: false
        };
    },

    created() {
        axios.get("/api/clients/current")
            .then(response => {
                this.client = response.data;
                this.email = this.client.email
                this.cards = this.client.cards
                this.creditCards = this.createCreditCards()
                this.debitCards = this.createDebitCards()
            })
            .catch(error => {
                console.log(error);
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

        createNewCard() {
            Swal.fire({
                title: 'Do you want to create a new card?',
                text: 'Remember that you can only have 3 cards',
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
            axios.post(`/api/clients/current/cards`, `type=${this.cardType}&color=${this.cardColor}`)
                .then(() => {
                    Swal.fire({
                        title: "Successfully created card",
                        icon: "success",
                        confirmButtonColor: "#35A29F",
                      }).then((result) => {
                        if (result.isConfirmed) {
                            location.pathname = `/web/assets/pages/cards.html`;
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
                this.showSpinner = false;
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
        createCreditCards(){
            return this.cards.filter(card => card.type == "CREDIT" && card.active)
        },
        createDebitCards(){
            return this.cards.filter(card => card.type == "DEBIT" && card.active)
        }
    }
},
);
app.mount('#app');