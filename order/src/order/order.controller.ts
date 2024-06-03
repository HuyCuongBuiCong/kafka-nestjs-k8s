import { Controller, Get } from '@nestjs/common';
import { KafkaProducerService } from './kafka-producer.service';

@Controller('order')
export class OrderController {
    constructor(private readonly kafkaProducerService: KafkaProducerService) {}

    @Get('send')
    async sendTestMessage() {
        try {
            await this.kafkaProducerService.connect();
            await this.kafkaProducerService.sendMessage('test-topic', [{ key: 'test', value: 'Hello Kafka' }]);
            return 'Message sent';
        } catch (error) {
            return `Failed to send message: ${error.message}`;
        }
    }
}
