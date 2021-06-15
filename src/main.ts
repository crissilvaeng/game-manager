import * as compression from 'compression';
import * as helmet from 'helmet';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      url: 'nats://localhost:4222',
    },
  });

  app.use(compression());
  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle(process.env.npm_package_name)
    .setDescription(
      `${process.env.npm_package_description} (rev: ${process.env.GIT_REV})`,
    )
    .setVersion(process.env.npm_package_version)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.startAllMicroservicesAsync();
  await app.listen(process.env.PORT);
}
bootstrap();
