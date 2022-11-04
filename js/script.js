const {createApp} = Vue;

const app = createApp({
	data(){
		return {
            counter: 8,
            showChat: false,
            newContact: '',
            inputReveal: false,
            activeIndex: 0,
            activeID: 1,
            newMessage: '',
            searchBarContent: '',
            imgPath: './img/avatar',
            imgExt: '.jpg',
            user: {
                name: 'Mattia',
                avatar: '_io'
            },
            contacts: [
                {
                    name: 'Michele',
                    id: 1,
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    id: 2,
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    id: 3,
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    id: 4,
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    id: 5,
                    avatar: '_5',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'

                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    id: 6,
                    avatar: '_6',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    id: 7,
                    avatar: '_7',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    id: 8,
                    avatar: '_8',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ]
		}
	},
	methods: {
        setChat(id) {
            this.activeIndex = this.contacts.findIndex((item) => {
                return item.id === id;
            })
            this.activeID = id;
            this.backToChat();
        },
        sendAMessage() {
            const date = new Date();
            let newDate = date.toLocaleTimeString('it-IT');
            if(this.newMessage.length > 0){
                this.contacts[this.activeIndex].messages.push({
                    message: this.newMessage,
                    status: 'sent',
                    date: newDate
                    });

                    setTimeout(() => {
                        this.contacts[this.activeIndex].messages.push({message: 'Risposta Random', status: 'received', date: newDate});
                        this.$nextTick(() => {
                            const element = this.$refs.msg[this.$refs.msg.length - 1];
                            element.scrollIntoView();
                        });
                    }, 1500);
            }
            this.newMessage = '';
        },
        getLastMsg(item) {
            const arrayReceived = item.messages.filter((message) => {
                return message.status === 'received';
            })
            if(arrayReceived.length == 0){
                return
            } else {
                return arrayReceived[arrayReceived.length - 1].message;
            }
        },
        getLastDate(item) {
            const arrayReceived = item.messages.filter((message) => {
                return message.status === 'received';
            })
            if(arrayReceived.length == 0){
                return
            } else {
                return arrayReceived[arrayReceived.length - 1].date;
            }
        },
        toggleInput() {
            this.inputReveal = !this.inputReveal;
        },
        addNewChat() {
            if(this.newContact.length > 0){
                this.counter++
                this.contacts.push({
                    name: this.newContact,
                    id: this.counter,
                    avatar: '_io',
                    visible: true,
                    messages: []
                });
                this.newContact = '';
                this.inputReveal = false;
            }
        },
        backToChat(){
            this.showChat = !this.showChat;
        }
	},
	computed: {
        filteredContacts(){
            return this.contacts.filter((item) => {
                const name = item.name.toLowerCase();
                return name.includes(this.searchBarContent.toLowerCase());
            })
        }
	},
	mounted(){
	},
});
app.mount('#app');