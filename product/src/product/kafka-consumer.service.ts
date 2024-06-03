import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { kafka } from '../config/kafka.config';

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
    private readonly consumer = kafka.consumer({ groupId: 'product-group-id' });
    private readonly logger = new Logger(KafkaConsumerService.name);

    async onModuleInit() {
        await this.connect();
    }

    async connect() {
        await this.consumer.connect();
        await this.consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                this.logger.log(`Received message: ${message.value.toString()}`);
                // Process the message here
            },
        });
    }
}
