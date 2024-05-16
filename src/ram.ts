export class RAM {
    private memory: Uint8Array;

    constructor(size: number) {
        this.memory = new Uint8Array(size);
    }

    read(address: number): number {
        console.log(`Reading from RAM at address ${address}`);
        return this.memory[address];
    }

    write(address: number, value: number): void {
        console.log(`Writing to RAM at address ${address} with value ${value}`);
        this.memory[address] = value;
    }
}