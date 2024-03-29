import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PetDocument = HydratedDocument<Pet>;

@Schema({ collection: 'pet_info' })
export class Pet {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;
}
export const PetSchema = SchemaFactory.createForClass(Pet);
