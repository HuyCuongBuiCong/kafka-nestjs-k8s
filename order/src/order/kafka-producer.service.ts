import { Injectable, Logger } from '@nestjs/common';
import { kafka } from '../config/kafka.config';

@Injectable()
export class KafkaProducerService {
    private readonly producer = kafka.producer();
    private readonly logger = new Logger(KafkaProducerService.name);

    async connect() {
        try {
            await this.producer.connect();
            this.logger.log('Kafka producer connected');
        } catch (error) {
            this.logger.error('Failed to connect Kafka producer', error);
            throw error;
        }
    }

    async sendMessage(topic: string, messages: any[]) {
        try {
            if (!this.producer) {
                throw new Error('Kafka producer is not initialized');
            }
            await this.producer.send({
                topic,
                messages: messages.map((message) => ({ value: JSON.stringify(message) })),
            });
            this.logger.log('Message sent successfully');
        } catch (error) {
            this.logger.error('Failed to send message', error);
            throw error;
        }
    }
}
