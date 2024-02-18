import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HueModule } from './hue/hue.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PetModule } from './pet/pet.module';

export enum PetTypes {
  CAT = "cat",
  DOG = "dog"
}
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://192.168.50.28:27017/cats', {
      connectionName: 'cats',
    }),
    MongooseModule.forRoot('mongodb://192.168.50.28:27017/dogs', {
      connectionName: 'dogs',
    }),
    PetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
