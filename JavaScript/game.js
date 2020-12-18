// creating a basic structure of Phaser

let prize = {
    count: 11,
    name: ["CB BOOK","CB TSHIRT","2 EXTRA SPIN","AMAZON VOUCHER", "50% OFF","NETFLIX SUBS", "100% OFF", "CB SWAGSPACK", "70% OFF","HARD LUCK","35% OFF","3000 CB CREDITS"]
}

let config = {
    type: Phaser.CANVAS,
    width: 1000,
    height: 600,

    scene: {
        preload: preload,
        create: create,
        update: update,
    },
}

let game = new Phaser.Game(config);

function preload() {
    console.log("Preload");

    this.load.image('background', '../Assets/back.jpg');
    this.load.image('wheel', '../Assets/wheel.png');
    this.load.image('pin', '../Assets/pin.png');
    this.load.image('stand', '../Assets/stand.png');
}

function create() {
    console.log("Create");

    let W = game.config.width;
    let H = game.config.height;

    let back = this.add.sprite(0, 0, 'background');
    back.setPosition(W / 2, H / 2);
    back.setScale(0.2);


    let stand = this.add.sprite(W / 2, H / 2 + 244, 'stand');
    stand.setScale(0.3);

    // by using this.wheel,we make wheel as the object of scene
    this.wheel = this.add.sprite(0, 0, 'wheel');
    this.wheel.setPosition(W / 2, H / 2);
    this.wheel.setScale(0.25);

    let pin = this.add.sprite(W / 2, H / 2 - 250, 'pin');
    pin.setScale(0.3);

    // adding eventlistner
    this.input.on("pointerdown", spinWheel, this);

    // adding text to our game
    font_style = {
        font: "bold 30px Roboto",
        color: "red",
        align: "center",
    }
    this.game_text = this.add.text(10, 10, "Welcome to Spin & Win game", font_style);


}

function update() {
    console.log("Update");
}

function spinWheel() {
    console.log("Spinning wheel");
    // this.game_text.setText("Spinning Wheel");

    let rounds = Phaser.Math.Between(2, 4) ;
    let extra = Phaser.Math.Between(1, 11) ;

    let total = rounds*360 + extra*30;
    console.log(total);
    
    let result=(total-rounds*360)/30;
    console.log(prize.name[result]);

    tween = this.tweens.add({
        targets: this.wheel,
        duration: 2000,
        angle: total,
        ease: "Cubic.easeOut",
        callbackScope:this,
        onComplete:function(){
            this.game_text.setText("You won "+prize.name[result]);
        }
    });
}
