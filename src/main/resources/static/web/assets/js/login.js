const app = Vue.createApp({
    data() {
        return {
            email: "",
            password: "",
            errorMessage: "",
            firstName: "",
            lastName: "",
            emailRegister: "",
            passwordRegister: "",
            exitMessage: "",
            errorStatus: null,
            errorRegister: "",
            showRegisterForm: false,
            showSpinner: false,
            showSpinnerRegister: false
        };
    },

    created() {

    },
    methods: {
        login() {
            this.showSpinner = true;
            axios.post('/api/login', `email=${this.email}&password=${this.password}`)
                .then(response => {
                    location.pathname = `/web/accounts.html`;
                })
                .catch(error => {
                    if (error.response && error.response.status === 401) {
                        this.errorStatus = 401
                        this.errorMessage = "Incorrect credentials. Please try again."
                    } else {
                        this.errorStatus = null
                    }
                })
                .finally(() => {
                    this.showSpinner = false;
                  });
        },

        register() {
            Swal.fire({
                title: 'Do you want to register?',
                text: 'Will log in automatically',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Register',
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
                    this.showSpinnerRegister = true;
                    axios.post('/api/clients', `firstName=${this.firstName}&lastName=${this.lastName}&email=${this.emailRegister}&password=${this.passwordRegister}`)
                        .then(() => {
                            axios.post('/api/login', `email=${this.emailRegister}&password=${this.passwordRegister}`)
                                .then(() => location.pathname = `/web/accounts.html`)
                                .catch(error => {
                                    console.log(error);
                                });
                        })
                        .catch(error => {
                            let errorMessage = error.response.data;
                            errorMessage = errorMessage.replace(/\n/g, '<br>');
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                html: errorMessage,
                            });
                        })
                        .finally(() => {
                            this.showSpinnerRegister = false;
                          });
                }
            });
        },
        
        toggleRegisterForm(){
            this.showRegisterForm = !this.showRegisterForm;
        }
    }
})
app.mount('#app');