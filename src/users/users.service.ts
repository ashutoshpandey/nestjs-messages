import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";

import { User } from "./user.entity";
import { EncryptionService } from "./services/encryption.service";

@Injectable()
export class UsersService {
    constructor(
        private encryptionService: EncryptionService,
        @InjectRepository(User) private repo: Repository<User>) {
    }

    async checkLogin(email: string, password: string) {
        const hashedPassword = await this.encryptionService.hashPassword(password);
        return this.encryptionService.verifyPassword(password, hashedPassword);
    }

    async create(email: string, password: string) {
        const hashedPassword = await this.encryptionService.hashPassword(password);

        const user = this.repo.create({ email, password: hashedPassword });
        return this.repo.save(user);
    }

    findOne(id: number) {
        return this.repo.findOne({ where: { id } });
    }

    find(email: string) {
        return this.repo.find({ where: { email } });
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException('User not found with this id');
        }

        Object.assign(user, attrs);

        return this.repo.save(user);
    }

    async remove(id: number) {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException('User not found with this id');
        }

        return this.repo.remove(user);
    }
}