import {Logger, Module} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import {KafkaProducerService} from "./kafka-producer.service";
import {KafkaConsumerService} from "./kafka-consumer.service";

@Module({
  providers: [ProductService, KafkaProducerService, KafkaConsumerService],
  controllers: [ProductController]
})

export class ProductModule {
  private readonly logger = new Logger(ProductModule.name);

  constructor(private readonly kafkaConsumerService: KafkaConsumerService) {
    this.kafkaConsumerService.connect().then(() => {
      this.logger.log('Kafka consumer connected');
    });
  }
}
