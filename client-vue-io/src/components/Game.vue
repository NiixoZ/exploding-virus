<template>
    <div class="content justify-between">
        <div id="top">
            <div id="turn-info"></div>
            <div id="info-bar"></div>
            <ul id="card-number"></ul>
        </div>

        <div id="center">
            <div id="discard">

            </div>
            <div id="deck" v-on:click="pickCard">

            </div>
        </div>

        <div id="bottom">
            <ul id="my-cards"></ul>
            <div id="buttons-list">
                <button class="button" v-on:click="playCard">Jouer</button>
            </div>
        </div>
    </div>
</template>

<script>
import SocketioService from '../services/socketio.service.js';
import Modal from '../js/modal.js';

let discardSize = 0;
let deckSize = 0;

export default {
    name: 'GameGame',
    props: {
        roomName: {
            type: String,
            required: true
        },
        users: {
            type: Array,
            required: true
        }
    },
    methods: {
        pickCard() {
            SocketioService.socket.emit('user-pick-card', {});
        },
        playCard() {
            let selectedCard = document.querySelector('.card-selected');
            if(selectedCard === null) {
                return;
            }
            let cardNumber = selectedCard.id.split('-')[1];
            SocketioService.socket.emit('user-play-card', cardNumber);
        }
    },
    mounted() {
        let this1 = this;

        //*************//
        // Setup Modal //
        //*************//
        let modal = new Modal(true);


        function getUserForUUID(uuid) {
            let user = null;
            this1.$props.users.forEach(u => {
                if(u.uuid === uuid) {
                    user = u;
                }
            });
            return user;
        }

        function createCardItem(card) {
            let img = document.createElement('img');
            img.id = 'card-' + card.id;
            img.src = process.env.VUE_APP_SOCKET_ENDPOINT + '/card?cardId=' + card.id;
            img.width = '200';
            img.classList.add('card'); 
            img.draggable = false;
            return img;
        }

        function addCardToList(card) {
            let img = createCardItem(card);
            img.addEventListener('click', function() {
                let selectedCards = document.querySelectorAll('.card-selected');
                selectedCards.forEach(c => {
                    c.classList.remove('card-selected');
                });
                this.classList.add('card-selected');
            });
            document.querySelector('#my-cards').appendChild(img);
        }


        function addCardNumber(user) {
            let li = document.createElement('li');
            li.id = user.uuid;
            let spanUsername = document.createElement('span');
            let spanCount = document.createElement('span');
            spanCount.classList.add('card-count');
            spanUsername.innerHTML = user.username;
            spanCount.innerHTML = user.cardsNumber;
            li.classList.add('card', 'bob');
            li.innerHTML = spanUsername.outerHTML + spanCount.outerHTML;
            document.querySelector('#card-number').appendChild(li);
        }


        function addCardToUser(user) {
            let spanCount = document.querySelector(`[id='${user.uuid}'] .card-count`);
            user.cardsNumber++;
            spanCount.innerHTML = user.cardsNumber;
        }


        function removeCardFromUser(user) {
            let spanCount = document.querySelector(`[id='${user.uuid}'] .card-count`);
            user.cardsNumber--;
            spanCount.innerHTML = user.cardsNumber;
        }


        function addCardToDiscard(card) {
            let img = createCardItem(card);
            // get random rotation
            let rotation = Math.floor(Math.random() * 15);
            // get random direction
            let direction = Math.floor(Math.random() * 2);
            if(direction === 1) {
                rotation = -rotation;
            }
            img.style.transform = 'rotate(' + rotation + 'deg) rotateX(48deg) rotateZ(20deg) translateY(-' + 3*discardSize + 'px) translateX(-' + discardSize + 'px)';
            document.querySelector('#discard').appendChild(img);
        }


        function updateDeck() {
            document.querySelector('#deck').innerHTML = '';
            for(let i = 0; i < deckSize; i++) {
                let img = document.createElement('img');
                img.src = process.env.VUE_APP_SOCKET_ENDPOINT + '/card?cardId=0';
                img.width = '200';
                img.classList.add('card'); 
                img.draggable = false;
                img.style.transform = 'rotateX(48deg) rotateZ(20deg) translateY(-' + 3*i + 'px) translateX(-' + i + 'px)';
                document.querySelector('#deck').appendChild(img);
            }
        }

        SocketioService.socket.on('game-my-cards', (cards) => {
            document.querySelector('#my-cards').innerHTML = '';
            cards.forEach(c => {
                addCardToList(c);
            });
        });


        SocketioService.socket.on('game-user-error', (data) => {
            console.log('game-user-error: ', data);
        });


        SocketioService.socket.on('game-update-board', (data) => {
            
            // Update player Turn Bar
            let user = getUserForUUID(data.playerTurn);
            deckSize = data.deckSize;
            discardSize = data.discardSize;
            document.querySelector('#turn-info').innerHTML = `It is ${user.username}'s turn`;

            if(data.updateType === 'pick') {

                // Update player card
                addCardToUser(getUserForUUID(data.actionPlayer));
            }
            else if(data.updateType === 'play') {

                // Update player card
                removeCardFromUser(getUserForUUID(data.actionPlayer));
                addCardToDiscard(data.playedCard);

                let info = document.querySelector('#info-bar');
                info.innerHTML = '';
                info.classList.remove('warning', 'error', 'info');

                if(data.playedCard.type === 'shuffle') {
                    info.innerHTML = 'Le pioche a été mélangé';
                    info.classList.add('alert', 'warning');
                }
            }

            updateDeck();
        });


        // User see the future
        SocketioService.socket.on('game-user-see-the-future', (data) => {
            modal.clear();
            modal.setTitle('Dépistage');
            modal.setDescription('Vous avez été dépisté. Vous pouvez voir les 3 prochaines cartes.');
            data.forEach(c => {
                let card = createCardItem(c);
                modal.addContentElement(card)
            });
            modal.setCloseText('Fermer');
            modal.show();
        });



        // Setup card Number
        document.querySelector('#card-number').innerHTML = '';
        this.$props.users.forEach(u => {
            addCardNumber(u);
        });


        //******************************//
        // Setup Horizontal Drag Scroll //
        //******************************//
        const slider = document.querySelector('#my-cards');
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        slider.addEventListener('mousemove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX);
            slider.scrollLeft = scrollLeft - walk;
        });

        SocketioService.socket.emit('user-in-game-view', {});
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
