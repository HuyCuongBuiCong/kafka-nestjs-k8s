import { Kafka, logLevel, SASLOptions } from 'kafkajs';

const sasl: SASLOptions = {
    mechanism: 'plain',  // Choose the mechanism you have configured: 'plain', 'scram-sha-256', or 'scram-sha-512'
    username: 'user1',  // Hardcoded username for testing
    password: 'password',  // Empty password for testing
};

export const kafkaConfig = {
    clientId: 'order',  // Hardcoded client ID for testing
    brokers: ['kafka.default.svc.cluster.local:9092'],  // Hardcoded broker address
    logLevel: logLevel.INFO,
    sasl,
};

export const kafka = new Kafka(kafkaConfig);
