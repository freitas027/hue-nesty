import { Model } from 'mongoose';
import { Pet } from '../schemas/cat.schema';
import { Injectable, Scope} from '@nestjs/common';

@Injectable()
export class PetService {
  constructor(private petModel: Model<Pet>) {}
  async getPetName() {
    return (await this.petModel.findOne({}).exec());
  }
}
