const app = Vue.createApp({
    data() {
        return {
            client: {},
            account: {},
            transactions: {},
            messageError: "",
            email: "",
            startDate: "",
            endingDate: ""
        };
    },

    created() {
        let urlParams = new URLSearchParams(location.search);
        let id = urlParams.get('id')
        axios.get(`/api/accounts/${id}`)
            .then(response => {
                this.account = response.data;
                this.transactions = this.account.transactions
                this.transactions.sort((a, b) => b.id - a.id);
                console.log(this.transactions);
            })
            .catch(error => {
                this.messageError = error.response.data;
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
        exportPDF() {
            Swal.fire({
                title: 'Confirm that you want to download your account statement?',
                text: 'The transactions and balance will be downloaded on the selected dates',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Download',
                confirmButtonColor: '#28a745',
                cancelButtonColor: '#dc3545',
                showClass: {
                    popup: 'swal2-noanimation',
                    backdrop: 'swal2-noanimation'
                },
                hideClass: {
                    popup: '',
                    backdrop: ''
                },
                preConfirm: () => {
                    axios.post(`/api/clients/current/export-pdf`, `accountNumber=${this.account.number}&startDate=${this.startDate} 00:00&endingDate=${this.endingDate} 23:55`, {
                        responseType: 'blob'
                    })
                        .then(response => {
                            const url = window.URL.createObjectURL(new Blob([response.data]));
                            const link = document.createElement('a');
                            link.href = url;
                            link.setAttribute('download', `Transactions account ${this.account.number} between ${this.startDate} and ${this.endingDate}.pdf`);
                            document.body.appendChild(link);
                            link.click();
                        })
                        .then(() => {
                            Swal.fire({
                                icon: 'success',
                                text: 'Check your downloads',
                                showConfirmButton: true,
                                confirmButtonText: 'OK',
                                confirmButtonColor: '#28a745'
                            }).then(() => location.pathname = "/web/accounts.html");
                        })
                        .catch(error => {
                            Swal.showValidationMessage(
                                `Request failed: ${error.response.data}`
                            );
                        });
                }
            });
        },


        logout() {
            axios
                .post(`/api/logout`)
                .then(response => {
                    console.log("SingOut");
                    location.pathname = `/index.html`;
                })
                .catch(error => {
                    console.log(error);
                });
        },

        formatNumber(number) {
            return number.toLocaleString("De-DE", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
        },

        dateFormat(dateString) {
            const date = new Date(dateString);
            const formatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
            return date.toLocaleDateString('es-ES', formatOptions);
        }
    }

},
);
app.mount('#app');