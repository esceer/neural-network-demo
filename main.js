const canvas = document.getElementById("myCanvas");
canvas.width = 500;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width / 2, canvas.width * 0.9, 5);
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "black");
const traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50, "green", Driver.NPC, 2),
    new Car(road.getLaneCenter(2), -500, 30, 50, "green", Driver.NPC, 2),
    new Car(road.getLaneCenter(3), -500, 30, 50, "green", Driver.NPC, 2),
    new Car(road.getLaneCenter(5), -1000, 30, 50, "green", Driver.NPC, 2),
    new Car(road.getLaneCenter(0), -1500, 30, 50, "green", Driver.NPC, 2),
    new Car(road.getLaneCenter(1), -1500, 30, 50, "green", Driver.NPC, 2),
    new Car(road.getLaneCenter(3), -2000, 30, 50, "green", Driver.NPC, 2),
    new Car(road.getLaneCenter(0), -2500, 30, 50, "green", Driver.NPC, 2),
    new Car(road.getLaneCenter(2), -2500, 30, 50, "green", Driver.NPC, 2),
    new Car(road.getLaneCenter(4), -2500, 30, 50, "green", Driver.NPC, 2),

    new Car(road.getLaneCenter(2), -3000, 50, 50, "orange", Driver.NPC, 1),
    new Car(road.getLaneCenter(4), -4000, 50, 50, "orange", Driver.NPC, 1),
    new Car(road.getLaneCenter(3), -6000, 50, 50, "orange", Driver.NPC, 1),
    new Car(road.getLaneCenter(1), -5500, 50, 50, "orange", Driver.NPC, 1),
    new Car(road.getLaneCenter(3), -6000, 50, 50, "orange", Driver.NPC, 1),

    new Car(road.getLaneCenter(2), -10000, 400, 50, "white", Driver.FINISH)
];

animate();

function animate() {
    canvas.height = window.innerHeight;
    for (const npc of traffic) {
        npc.update(road.borders, []);
    }
    car.update(road.borders, traffic);


    // to move the road instead of the car
    ctx.save();
    ctx.translate(0, -car.y + canvas.height * 0.7);

    road.draw(ctx);
    for (const npc of traffic) {
        npc.draw(ctx);
    }
    car.draw(ctx);

    ctx.restore();
    requestAnimationFrame(animate);
}