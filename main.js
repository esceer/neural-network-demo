const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 500;
const carCtx = carCanvas.getContext("2d");

const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 700;
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9, 5);
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "black", Driver.AI);
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

function animate(time) {
    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    for (const npc of traffic) {
        npc.update(road.borders, []);
    }
    car.update(road.borders, traffic);


    // to move the road instead of the car
    carCtx.save();
    carCtx.translate(0, -car.y + carCanvas.height * 0.7);

    road.draw(carCtx);
    for (const npc of traffic) {
        npc.draw(carCtx);
    }
    car.draw(carCtx);

    carCtx.restore();

    networkCtx.lineDashOffset = -time / 50;
    Visualizer.drawNetwork(networkCtx, car.brain);
    requestAnimationFrame(animate);
}