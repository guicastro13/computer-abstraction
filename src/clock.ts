import { CPU } from "./cpu";

export class Clock {
    private intervalId: NodeJS.Timeout | null = null;

    constructor(private cpu: CPU, private frequency: number) {}

    start(): void {
        console.log(`Starting clock at ${this.frequency} Hz`);
        if (this.intervalId === null) {
            this.intervalId = setInterval(() => {
                this.cpu.step();
            }, 1000 / this.frequency);
        }
    }

    stop(): void {
        console.log("Stopping clock \n\n");
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}