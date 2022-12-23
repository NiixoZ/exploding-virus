<template>
    <div class="content">
        <div id="top">
            <div id="room-name">{{ roomName }}</div>
            <div id="turn-info"></div>
            <div>
                Cards number:
                <ul id="card-number"></ul>
            </div>
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
            console.log('user-pick-card');
        },
        playCard() {
            let selectedCard = document.querySelector('.card-selected');
            if(selectedCard === null) {
                return;
            }
            let cardNumber = selectedCard.id.split('-')[1];
            SocketioService.socket.emit('user-play-card', cardNumber);
            console.log('user-play-card: ', cardNumber);
        }
    },
    mounted() {
        let this1 = this;

        function getUserForUUID(uuid) {
            let user = null;
            this1.$props.users.forEach(u => {
                if(u.uuid === uuid) {
                    user = u;
                }
            });
            return user;
        }

        function addCardToList(card) {
            let img = document.createElement('img');
            img.id = 'card-' + card.id;
            img.src = process.env.VUE_APP_SOCKET_ENDPOINT + '/card?cardId=' + card.id;
            img.width = '200';
            img.classList.add('card'); 
            img.draggable = false;
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
            let img = document.createElement('img');
            img.id = 'card-' + card.id;
            img.src = process.env.VUE_APP_SOCKET_ENDPOINT + '/card?cardId=' + card.id;
            img.width = '200';
            img.classList.add('card'); 
            img.draggable = false;
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
            console.log('game-my-cards: ', cards);
            
            document.querySelector('#my-cards').innerHTML = '';
            cards.forEach(c => {
                addCardToList(c);
            });
        });


        SocketioService.socket.on('game-user-error', (data) => {
            console.log('game-user-error: ', data);
        });


        SocketioService.socket.on('game-update-board', (data) => {
            console.log('game-update-board: ', data);

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
            }

            updateDeck();
        });


        // User see the future
        SocketioService.socket.on('game-user-see-the-future', (data) => {
            console.log('game-user-see-the-future: ', data);
        });



        // Setup card Number
        document.querySelector('#card-number').innerHTML = '';
        this.$props.users.forEach(u => {
            addCardNumber(u);
        });


        // Setup Horizontal Drag Scroll
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

.content {
    width: 100%;
    height: 100%;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

#my-cards , #card-number, #buttons-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 8px;
    overflow-x: auto;
}

#my-cards {
    width: 100vw;
    left: 0;
    bottom: 0;
    padding: 3rem 3rem;
    overflow: visible;
    overflow-x: scroll;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}

#my-cards::-webkit-scrollbar { /* WebKit */
    display: none;
}

#my-cards li {
    width: 10px;
    height: 10px;
    background-color: #3a3a3a;
    color: white;
    padding: 6px;
}

#top, #bottom {
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: center;
    align-items: center;
}

#center {
    display: flex;
    gap: 120px;
}

#discard, #deck {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 12rem;
    height: 16rem;
}

</style>
