import { CPU } from "./cpu";

export class Instructions {
    private cpu: CPU;

    constructor(cpu: CPU) {
        this.cpu = cpu;
    }

    increment() {
        console.log(`Incrementing register from ${this.cpu.register} to ${this.cpu.register + 1}`);
        this.cpu.register++;
    }

    decrement() {
        console.log(`Decrementing register from ${this.cpu.register} to ${this.cpu.register - 1}`);
        this.cpu.register--;
    }

    load() {
        console.log(`Loading register with value from RAM`);
        const address = this.cpu.rom.read(this.cpu.pc);
        this.cpu.register = this.cpu.ram.read(address);
        this.cpu.pc++;
    }

    store() {
        console.log(`Storing register value into RAM`);
        const storeAddress = this.cpu.rom.read(this.cpu.pc);
        this.cpu.ram.write(storeAddress, this.cpu.register);
        this.cpu.pc++;
    }

    loop() {
        console.log(`Looping`);
        const jumpAddress = this.cpu.rom.read(this.cpu.pc);
        this.cpu.pc = jumpAddress;
    }

    initialize() {
        console.log(`Initializing RAM addresses with values`);
        const initAddress1 = this.cpu.rom.read(this.cpu.pc);
        const initValue1 = this.cpu.rom.read(this.cpu.pc + 1);
        this.cpu.ram.write(initAddress1, initValue1);
        this.cpu.pc += 2;
    }

    add() {
        console.log(`Adding values in RAM`);
        const addAddress = this.cpu.rom.read(this.cpu.pc);
        this.cpu.register += this.cpu.ram.read(addAddress);
        this.cpu.pc++;
    }

    checkIterations() {
        console.log(`Checking iterations for loops`);
        const maxIterations = this.cpu.rom.read(this.cpu.pc);
        if (this.cpu.iterationCounter < maxIterations) {
            this.cpu.pc -= 2 * (this.cpu.register + 1); // volta no inicio do loop
            this.cpu.iterationCounter++;
        } else {
            this.cpu.iterationCounter = 0;
        }
        this.cpu.pc++;
    }

    multiply() {
        console.log(`Multiplying values in RAM`);
        const multiplyAddress = this.cpu.rom.read(this.cpu.pc);
        this.cpu.register *= this.cpu.ram.read(multiplyAddress);
        this.cpu.pc++;
    }
}