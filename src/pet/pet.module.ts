import { FactoryProvider, Module, Scope } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Pet, PetSchema } from '../schemas/cat.schema';
import { PetService } from './pet.service';
import { Model } from 'mongoose';

const CatsModule = MongooseModule.forFeature(
  [{ name: Pet.name, schema: PetSchema }],
  'cats',
);
const DogsModule = MongooseModule.forFeature(
  [{ name: Pet.name, schema: PetSchema }],
  'dogs',
);

function createDatabaseService(
  SchemaClass: typeof Pet,
  connectionName: string,
): [string, FactoryProvider] {
  const serviceToken = `${SchemaClass.name}Service/${connectionName}`;
  const serviceProvider: FactoryProvider = {
    provide: serviceToken,
    useFactory: async (petModel: Model<Pet>) => {
      return new PetService(petModel);
    },
    inject: [getModelToken(SchemaClass.name, connectionName)],
  };
  return [serviceToken, serviceProvider];
}
const [catToken, catProvider] = createDatabaseService(Pet, 'cats');
const [dogToken, dogProvider] = createDatabaseService(Pet, 'dogs');

export {catToken, dogToken}
console.log(catToken, dogToken);
@Module({
  imports: [CatsModule, DogsModule],
  exports: [CatsModule, DogsModule, catToken, dogToken],
  providers: [catProvider, dogProvider],
})
export class PetModule {}
