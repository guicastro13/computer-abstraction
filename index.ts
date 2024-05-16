import { Clock } from "./src/clock";
import { CPU } from "./src/cpu";
import { RAM } from "./src/ram";
import { ROM } from "./src/rom";

// [0x01, 0x01, 0x01, 0x02, 0x04, 0x00] -> Incrementa três vezes, decrementa uma vez, e armazena o valor na RAM no endereço 0
const program = [
    0x01, 0x01, 
    0x01, 0x02, 
    0x04, 0x00
];

const program1 = [
    0x01, // Incrementar
    0x01, // Incrementar
    0x01, // Incrementar
    0x01, // Incrementar
    0x01, // Incrementar
    0x02, // Decrementar
    0x02, // Decrementar
    0x02, // Decrementar
    0x05, // Loop (salto para o início)
    0x00  // Endereço de início do loop
];

const program2 = [
    0x03, 0x00, // Carregar valor da RAM endereço 0
    0x01,       // Incrementar
    0x04, 0x00, // Armazenar valor na RAM endereço 0
    0x05, 0x00  // Loop (salto para o início)
];

const program3 = [
    0x06, 0x00, 0x01, // Inicializa endereço 0 com 0 e endereço 1 com 1
    0x03, 0x00,       // Carrega valor de endereço 0 (primeiro número)
    0x07, 0x01,       // Adiciona valor de endereço 1 (segundo número)
    0x04, 0x02,       // Armazena o resultado em endereço 2
    0x03, 0x01,       // Carrega valor de endereço 1
    0x04, 0x00,       // Armazena em endereço 0
    0x03, 0x02,       // Carrega valor de endereço 2
    0x04, 0x01,       // Armazena em endereço 1
    0x08, 0x05,       // Checa se completou 5 iterações (número de Fibonacci)
    0x05, 0x03        // Se não, loop (salto para o terceiro byte)
];

const program4 = [
    0x03, 0x00, // Carregar valor de RAM endereço 0 (multiplicando)
    0x09, 0x01, // Multiplicar pelo valor no endereço 1 (multiplicador)
    0x04, 0x02, // Armazenar o resultado no endereço 2
    0x05, 0x00  // Loop (salto para o início)
];

const ram = new RAM(256);
const rom = new ROM(program2);
const cpu = new CPU(ram, rom);
const clock = new Clock(cpu, 1); // Clock com 1 Hz

clock.start();