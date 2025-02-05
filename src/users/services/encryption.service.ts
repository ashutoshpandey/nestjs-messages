import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EncryptionService {
    // Hash password
    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);      // salt rounds hardcoded for now
        return bcrypt.hash(password, salt);
    }

    // Compare password with hash
    async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
}