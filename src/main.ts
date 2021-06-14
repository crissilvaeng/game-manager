import { NestFactory } from '@nestjs/core';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import * as compression from 'compression';
// import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        url: 'nats://localhost:4222',
      },
    },
  );
  app.listen(() => console.log('Microservice is listening'));
}

//   app.use(compression());
//   app.use(helmet());

//   const config = new DocumentBuilder()
//     .setTitle(process.env.npm_package_name)
//     .setDescription(process.env.npm_package_description)
//     .setVersion(process.env.GIT_SHA)
//     .build();

//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('api', app, document);

//   await app.startAllMicroservicesAsync();
//   await app.listen(process.env.PORT || 3000);
// }
bootstrap();
