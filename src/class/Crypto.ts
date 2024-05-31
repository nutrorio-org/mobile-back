// const bcrypt = require('bcrypt');
import bcrypt from 'bcrypt';
const saltRounds = 10; // Define o custo do processamento do salt
export class Crypto {
  static async generateHash(value: string) {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(value, salt);
      return hash;
    } catch (error) {
      return null;
    }
  }
  static async verifyHash(value: string, hashedValue: string) {
    try {
      const match = await bcrypt.compare(value, hashedValue);
      return match;
    } catch (error) {
      return null;
    }
  }
}
