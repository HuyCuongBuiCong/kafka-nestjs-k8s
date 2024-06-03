import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import {KafkaProducerService} from "./kafka-producer.service";
import {KafkaConsumerService} from "./kafka-consumer.service";

@Module({
  providers: [OrderService, KafkaProducerService, KafkaConsumerService],
  controllers: [OrderController]
})
export class OrderModule {}
