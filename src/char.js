export default class Char {
  static getArray(char) {
    const index = Char.indexes.indexOf(char.toString());
    const pixels = Char.pixels[index];
    const height = 5;
    const width = pixels.length / height;
    let count = 0;
    let array = [];
    for (let y = 0; y < height; y++) {
      array[y] = [];
      for (let x = 0; x < width; x++) {
        array[y][x] = parseInt(pixels[count]);
        count++;
      }
    }
    return array;
  }
}

Char.indexes = "abcdefghijklmnopqrstuvwxyz0123456789 !_";
Char.pixels = [
  "111101111101101", // A
  "11101010111110011111", // B
  "111100100100111", // C
  "110101101101110", // D
  "111100110100111", // E
  "111100111100100", // F
  "11111000101110011111", // G
  "101101111101101", // H
  "11111", // I
  "111001001101111", // J
  "101101110101101", // K
  "100100100100111", // L
  "1000111011101011000110001", // M
  "10011101101110011001", // N
  "111101101101111", // 0
  "111101111100100", // P
  "11101010101010101111", // Q
  "111101110101101", // R
  "011100111001111", // S
  "111010010010010", // T
  "101101101101111", // U
  "101101101101010", // V
  "1000110001101011101110001", // W
  "101101010101101", // X
  "101101111010010", // Y
  "111001010100111", // Z
  "111101101101111", // 0
  "1101010101", // 1
  "111001111100111", // 2
  "111001011001111", // 3
  "101101111001001", // 4
  "111100111001111", // 5
  "100100111101111", // 6
  "111001001001001", // 7
  "111101111101111", // 8
  "111101111001001", // 9
  "00000", // space
  "11101", // exclamation mark
  "0000000000000000000011111", // underscore
];
