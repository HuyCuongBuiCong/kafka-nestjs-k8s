import { Injectable } from '@nestjs/common';
import { kafka } from '../config/kafka.config';

@Injectable()
export class KafkaProducerService {
    private readonly producer = kafka.producer();

    async connect() {
        await this.producer.connect();
    }

    async sendMessage(topic: string, messages: any[]) {
        await this.producer.send({
            topic,
            messages: messages.map((message) => ({ value: JSON.stringify(message) })),
        });
    }
}
