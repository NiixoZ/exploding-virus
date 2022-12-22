class Card {
    constructor(id, name, type, description, color) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.description = description;
        this.color = color;
    }
}

const cards = [
    new Card(1, 'Back Hair', 'attack', 'Vous pouvez jouer cette carte sur n\'importe quel joueur. Le joueur ciblé doit se raser la tête.', '#FF0000'),
    new Card(2, 'Bear-o-Dactyl', 'attack', 'Vous pouvez jouer cette carte sur n\'importe quel joueur. Le joueur ciblé doit se raser la tête.', '#FF0000'),
    new Card(3, 'Catterwocky', 'attack', 'Vous pouvez jouer cette carte sur n\'importe quel joueur. Le joueur ciblé doit se raser la tête.', '#FF0000'),
    new Card(4, 'Crab-a-Pult', 'attack', 'Vous pouvez jouer cette carte sur n\'importe quel joueur. Le joueur ciblé doit se raser la tête.', '#FF0000'),
    
    new Card(5, 'Bearded', 'cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),
    new Card(6, 'Bearded', 'cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),
    new Card(7, 'Bearded', 'cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),
    new Card(8, 'Bearded', 'cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),

    new Card(9, 'Catermelon', 'cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),
    new Card(10, 'Catermelon', 'cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),
    new Card(11, 'Catermelon', 'cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),
    new Card(12, 'Catermelon', 'cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),

    new Card(13, 'Hairy Potato', 'cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),
    new Card(14, 'Hairy Potato', 'cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),
    new Card(15, 'Hairy Potato', 'cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),
    new Card(16, 'Hairy Potato', 'cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),

    new Card(17, 'Rainbow-Ralphing', 'cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),
    new Card(18, 'Rainbow-Ralphing', 'cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),
    new Card(19, 'Rainbow-Ralphing', 'cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),
    new Card(20, 'Rainbow-Ralphing', 'cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),

    new Card(21, 'Tacocat', 'cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),
    new Card(22, 'Tacocat', 'cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),
    new Card(23, 'Tacocat', 'cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),
    new Card(24, 'Tacocat', 'cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),

    new Card(25, 'Back Hair Shampoo', 'favor', 'Permet de faire une faveur', '#FF0000'),
    new Card(26, 'Beard-Sailing', 'favor', 'Permet de faire une faveur', '#FF0000'),
    new Card(27, 'Party Squirrels', 'favor', 'Permet de faire une faveur', '#FF0000'),
    new Card(28, 'Peanut Butter Belly Button', 'favor', 'Permet de faire une faveur', '#FF0000'),

    new Card(29, 'Jackanope', 'nope', 'Annule l\'effet d\'une carte joué', '#FF0000'),
    new Card(30, 'Ninja', 'nope', 'Annule l\'effet d\'une carte joué', '#FF0000'),
    new Card(31, 'Nopebell', 'nope', 'Annule l\'effet d\'une carte joué', '#FF0000'),
    new Card(32, 'Nopestradamus', 'nope', 'Annule l\'effet d\'une carte joué', '#FF0000'),
    new Card(33, 'Sandwich', 'nope', 'Annule l\'effet d\'une carte joué', '#FF0000'),

    new Card(34, 'All-Seeing Goat', 'see_the_future', 'Permet de voir les 3 premières cartes de la pioche', '#FF0000'),
    new Card(35, 'Mantis Shrimp', 'see_the_future', 'Permet de voir les 3 premières cartes de la pioche', '#FF0000'),
    new Card(36, 'Pig-a-Corn', 'see_the_future', 'Permet de voir les 3 premières cartes de la pioche', '#FF0000'),
    new Card(37, 'Special-Ops Bunnies', 'see_the_future', 'Permet de voir les 3 premières cartes de la pioche', '#FF0000'),
    new Card(38, 'Unicorn Enchilada', 'see_the_future', 'Permet de voir les 3 premières cartes de la pioche', '#FF0000'),

    new Card(39, 'Abracrab', 'shuffle', 'Permet de mélanger la pioche', '#FF0000'),
    new Card(40, 'Bat Farts', 'shuffle', 'Permet de mélanger la pioche', '#FF0000'),
    new Card(41, 'Pomeranian Storm', 'shuffle', 'Permet de mélanger la pioche', '#FF0000'),
    new Card(42, 'Transdimensional Litter Box', 'shuffle', 'Permet de mélanger la pioche', '#FF0000'),

    new Card(43, 'Bunnyraptor', 'skip', 'Permet de passer son tour', '#FF0000'),
    new Card(44, 'Cheetah Butt', 'skip', 'Permet de passer son tour', '#FF0000'),
    new Card(45, 'Crab Walk', 'skip', 'Permet de passer son tour', '#FF0000'),
    new Card(46, 'Hypergoat', 'skip', 'Permet de passer son tour', '#FF0000'),
];

const bomb = [
    new Card(47, 'Earth', 'bomb', 'Une Bombe', '#FF0000'),
    new Card(48, 'Ship', 'bomb', 'Une Bombe', '#FF0000'),
    new Card(49, 'Boat', 'bomb', 'Une Bombe', '#FF0000'),
    new Card(50, 'House', 'bomb', 'Une Bombe', '#FF0000'),
];

const defuse = [
    new Card(51, 'Laser Pointer', 'defuse', 'Permet de désamorcer une bombe', '#FF0000'),
    new Card(52, 'Therapy', 'defuse', 'Permet de désamorcer une bombe', '#FF0000'),
    new Card(53, 'Belly Rub', 'defuse', 'Permet de désamorcer une bombe', '#FF0000'),
    new Card(54, 'Catnip Sandwich', 'defuse', 'Permet de désamorcer une bombe', '#FF0000'),
    new Card(55, 'Yoga', 'defuse', 'Permet de désamorcer une bombe', '#FF0000'),
    new Card(56, '3am Flatulence', 'defuse', 'Permet de désamorcer une bombe', '#FF0000'),
];

module.exports = {
    cards,
    bomb,
    defuse
};