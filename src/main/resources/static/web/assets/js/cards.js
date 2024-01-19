const app = Vue.createApp({
    data() {
        return {
            client: {},
            cards: [],
            creditCards: [],
            debitCards: [],
            cardType: "",
            cardColor: "",
            currentDate: new Date(),
            email: "",
            showSpinner: false
        };
    },

    created() {
        this.showSpinner = true
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

        deleteCard(id){
            Swal.fire({
                title: 'Are you sure to delete this card?',
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
            axios.patch(`/api/clients/current/cards`, `id=${id}`)
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        text: 'Successfully delet card',
                        showConfirmButton: false,
                        timer: 2000,
                    })
                    location.pathname = `/web/assets/pages/cards.html`;
                })
                .catch(error => {
                    Swal.fire({
                      icon: 'error',
                      text: error.response.data,
                      confirmButtonColor: "#35A29F",
                    });
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
            return this.cards.filter(card => card.type == "CREDIT")
        },
        createDebitCards(){
            return this.cards.filter(card => card.type == "DEBIT")
        }
    }
},
);
app.mount('#app');