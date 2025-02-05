import { MessagesRepository } from "./messages.repository";

export class MessagesService {
    messagesRepository: MessagesRepository;

    constructor() {
        this.messagesRepository = new MessagesRepository();
    }

    async findOne(id: string) {
        return this.messagesRepository.findOne(id);
    }

    async findAll() {
        return this.messagesRepository.findAll();
    }

    async create(message: string) {
        return this.messagesRepository.create(message);
    }
}