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
    new Card(1, 'Back Hair', 'Attaque', 'Vous pouvez jouer cette carte sur n\'importe quel joueur. Le joueur ciblé doit se raser la tête.', '#FF0000'),
    new Card(2, 'Bear-o-Dactyl', 'Attaque', 'Vous pouvez jouer cette carte sur n\'importe quel joueur. Le joueur ciblé doit se raser la tête.', '#FF0000'),
    new Card(3, 'Catterwocky', 'Attaque', 'Vous pouvez jouer cette carte sur n\'importe quel joueur. Le joueur ciblé doit se raser la tête.', '#FF0000'),
    new Card(4, 'Crab-a-Pult', 'Attaque', 'Vous pouvez jouer cette carte sur n\'importe quel joueur. Le joueur ciblé doit se raser la tête.', '#FF0000'),
    
    new Card(5, 'Bearded', 'Cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),
    new Card(6, 'Bearded', 'Cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),
    new Card(7, 'Bearded', 'Cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),
    new Card(8, 'Bearded', 'Cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),

    new Card(9, 'Catermelon', 'Cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),
    new Card(10, 'Catermelon', 'Cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),
    new Card(11, 'Catermelon', 'Cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),
    new Card(12, 'Catermelon', 'Cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),

    new Card(13, 'Hairy Potato', 'Cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),
    new Card(14, 'Hairy Potato', 'Cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),
    new Card(15, 'Hairy Potato', 'Cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),
    new Card(16, 'Hairy Potato', 'Cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),

    new Card(17, 'Rainbow-Ralphing', 'Cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),
    new Card(18, 'Rainbow-Ralphing', 'Cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),
    new Card(19, 'Rainbow-Ralphing', 'Cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),
    new Card(20, 'Rainbow-Ralphing', 'Cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),

    new Card(21, 'Tacocat', 'Cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),
    new Card(22, 'Tacocat', 'Cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),
    new Card(23, 'Tacocat', 'Cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),
    new Card(24, 'Tacocat', 'Cat', 'Vous ne pouvez pas vraiment jouer cette carte', '#FF0000'),

    new Card(25, 'Back Hair Shampoo', 'Favor', 'Permet de faire une faveur', '#FF0000'),
    new Card(26, 'Beard-Sailing', 'Favor', 'Permet de faire une faveur', '#FF0000'),
    new Card(27, 'Party Squirrels', 'Favor', 'Permet de faire une faveur', '#FF0000'),
    new Card(28, 'Peanut Butter Belly Button', 'Favor', 'Permet de faire une faveur', '#FF0000'),

    new Card(29, 'Jackanope', 'Nope', 'Annule l\'effet d\'une carte joué', '#FF0000'),
    new Card(30, 'Ninja', 'Nope', 'Annule l\'effet d\'une carte joué', '#FF0000'),
    new Card(31, 'Nopebell', 'Nope', 'Annule l\'effet d\'une carte joué', '#FF0000'),
    new Card(32, 'Nopestradamus', 'Nope', 'Annule l\'effet d\'une carte joué', '#FF0000'),
    new Card(33, 'Sandwich', 'Nope', 'Annule l\'effet d\'une carte joué', '#FF0000'),

    new Card(34, 'All-Seeing Goat', 'See the Future', 'Permet de voir les 3 premières cartes de la pioche', '#FF0000'),
    new Card(35, 'Mantis Shrimp', 'See the Future', 'Permet de voir les 3 premières cartes de la pioche', '#FF0000'),
    new Card(36, 'Pig-a-Corn', 'See the Future', 'Permet de voir les 3 premières cartes de la pioche', '#FF0000'),
    new Card(37, 'Special-Ops Bunnies', 'See the Future', 'Permet de voir les 3 premières cartes de la pioche', '#FF0000'),
    new Card(38, 'Unicorn Enchilada', 'See the Future', 'Permet de voir les 3 premières cartes de la pioche', '#FF0000'),

    new Card(39, 'Abracrab', 'Shuffle', 'Permet de mélanger la pioche', '#FF0000'),
    new Card(40, 'Bat Farts', 'Shuffle', 'Permet de mélanger la pioche', '#FF0000'),
    new Card(41, 'Pomeranian Storm', 'Shuffle', 'Permet de mélanger la pioche', '#FF0000'),
    new Card(42, 'Transdimensional Litter Box', 'Shuffle', 'Permet de mélanger la pioche', '#FF0000'),

    new Card(43, 'Bunnyraptor', 'Skip', 'Permet de passer son tour', '#FF0000'),
    new Card(44, 'Cheetah Butt', 'Skip', 'Permet de passer son tour', '#FF0000'),
    new Card(45, 'Crab Walk', 'Skip', 'Permet de passer son tour', '#FF0000'),
    new Card(46, 'Hypergoat', 'Skip', 'Permet de passer son tour', '#FF0000'),
];

const bomb = [
    new Card(47, 'Earth', 'Exploding', 'Une Bombe', '#FF0000'),
    new Card(48, 'Ship', 'Exploding', 'Une Bombe', '#FF0000'),
    new Card(49, 'Boat', 'Exploding', 'Une Bombe', '#FF0000'),
    new Card(50, 'House', 'Exploding', 'Une Bombe', '#FF0000'),
];

const defuse = [
    new Card(51, 'Laser Pointer', 'Defuse', 'Permet de désamorcer une bombe', '#FF0000'),
    new Card(52, 'Therapy', 'Defuse', 'Permet de désamorcer une bombe', '#FF0000'),
    new Card(53, 'Belly Rub', 'Defuse', 'Permet de désamorcer une bombe', '#FF0000'),
    new Card(54, 'Catnip Sandwich', 'Defuse', 'Permet de désamorcer une bombe', '#FF0000'),
    new Card(55, 'Yoga', 'Defuse', 'Permet de désamorcer une bombe', '#FF0000'),
    new Card(56, '3am Flatulence', 'Defuse', 'Permet de désamorcer une bombe', '#FF0000'),
];

module.exports = {
    cards,
    bomb,
    defuse
};