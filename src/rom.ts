export class ROM {
    private memory: Uint8Array;

    constructor(data: number[]) {
        this.memory = new Uint8Array(data);
    }

    read(address: number): number {
        console.log(`Reading from ROM at address ${address}`);
        return this.memory[address];
    }
}