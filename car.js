const Driver = {
    PLAYER: "player",
    NPC: "npc",
    FINISH: "finish",
};

class Car {
    constructor(x, y, width, height, color = "black", driver = Driver.PLAYER, maxSpeed = 3) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.color = color;
        this.driver = driver;

        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = maxSpeed;
        this.maxReverseSpeed = -this.maxSpeed / 2;
        this.friction = 0.05;
        this.angle = 0;

        this.damaged = false;

        if (this.driver === Driver.PLAYER) {
            this.sensor = new Sensor(this);
        }
        this.controls = new Controls(driver);
    }

    update(roadBorders, traffic) {
        if (!this.damaged) {
            this.#move();
            this.polygon = this.#createPolygon();
            this.damaged = this.#assessDamage(roadBorders, traffic);
        }
        if (this.sensor) {
            this.sensor.update(roadBorders, traffic);
        }
    }

    draw(ctx) {
        if (this.damaged) {
            ctx.fillStyle = "red";
        } else {
            ctx.fillStyle = this.color;
        }

        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
        for (let i = 0; i < this.polygon.length; i++) {
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
        }
        ctx.fill();

        if (this.sensor) {
            this.sensor.draw(ctx);
        }
    }

    #createPolygon() {
        const points = [];
        const rad = Math.hypot(this.width, this.height) / 2;
        const alpha = Math.atan2(this.width, this.height);
        points.push({
            x: this.x - Math.sin(this.angle - alpha) * rad,
            y: this.y - Math.cos(this.angle - alpha) * rad,
        });
        points.push({
            x: this.x - Math.sin(this.angle + alpha) * rad,
            y: this.y - Math.cos(this.angle + alpha) * rad,
        });
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad,
        });
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad,
        });
        return points;
    }

    #assessDamage(roadBorders, traffic) {
        for (const border of roadBorders) {
            if (polysIntersect(this.polygon, border)) {
                return true;
            }
        }
        for (const npc of traffic) {
            if (polysIntersect(this.polygon, npc.polygon)) {
                return true;
            }
        }
        return false;
    }

    #move() {
        if (this.controls.forward) {
            this.speed += this.acceleration;
        }
        if (this.controls.reverse) {
            this.speed -= this.acceleration;
        }

        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        if (this.speed < this.maxReverseSpeed) {
            this.speed = this.maxReverseSpeed;
        }

        if (this.speed > 0) {
            this.speed -= this.friction;
        }
        if (this.speed < 0) {
            this.speed += this.friction;
        }
        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }

        if (this.speed != 0) {
            const flip = this.speed > 0
                ? 1
                : -1;

            if (this.controls.left) {
                this.angle += 0.01 * flip;
            }
            if (this.controls.right) {
                this.angle -= 0.01 * flip;
            }
        }

        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;
    }
}