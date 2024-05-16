import { Instructions } from "./instructions";
import { RAM } from "./ram";
import { ROM } from "./rom";

export class CPU {
    public ram: RAM;
    public rom: ROM;
    public pc: number = 0;
    public register: number = 0;
    public iterationCounter: number = 0;
    private instructions: Instructions;
    private instructionSet: { [key: number]: () => void };

    constructor(ram: RAM, rom: ROM) {
        this.ram = ram;
        this.rom = rom;
        this.instructions = new Instructions(this);
        this.instructionSet = {
            0x01: this.instructions.increment.bind(this.instructions),
            0x02: this.instructions.decrement.bind(this.instructions),
            0x03: this.instructions.load.bind(this.instructions),
            0x04: this.instructions.store.bind(this.instructions),
            0x05: this.instructions.loop.bind(this.instructions),
            0x06: this.instructions.initialize.bind(this.instructions),
            0x07: this.instructions.add.bind(this.instructions),
            0x08: this.instructions.checkIterations.bind(this.instructions),
            0x09: this.instructions.multiply.bind(this.instructions),
        };
    }

    fetch(): number {
        console.log(`Fetching instruction at address ${this.pc}`);
        const instruction = this.rom.read(this.pc);
        this.pc++;
        return instruction;
    }

    execute(instruction: number): void {
        console.log(`Executing instruction: ${instruction}`);
        const func = this.instructionSet[instruction];
        if (func) {
            func();
        } else {
            console.error(`Unknown instruction: ${instruction}`);
        }
        
    }

    step(): void {
        console.log(`CPU stepping at address ${this.pc}`);
        const instruction = this.fetch();
        this.execute(instruction);
    }

    getRegister(): number {
        console.log(`Getting register value: ${this.register}`);
        return this.register;
    }
}