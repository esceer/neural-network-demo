class Controls {
    constructor(driver) {
        this.forward = false;
        this.left = false;
        this.right = false;
        this.reverse = false;

        switch (driver) {
            case Driver.PLAYER:
                this.#addKeyboardListeners();
                break;
            case Driver.NPC:
                this.forward = true;
                break;
            case Driver.FINISH:
                break;
        }
    }

    #addKeyboardListeners() {
        document.onkeydown = (event) => {
            switch (event.key) {
                case "ArrowUp":
                    this.forward = true;
                    break;
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
                case "ArrowDown":
                    this.reverse = true;
                    break;
            }
            // console.table(this);
        }

        document.onkeyup = (event) => {
            switch (event.key) {
                case "ArrowUp":
                    this.forward = false;
                    break;
                case "ArrowLeft":
                    this.left = false;
                    break;
                case "ArrowRight":
                    this.right = false;
                    break;
                case "ArrowDown":
                    this.reverse = false;
                    break;
            }
            // console.table(this);
        }
    }
}