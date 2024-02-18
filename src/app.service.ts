import { Inject, Injectable } from '@nestjs/common';
import { PetService } from './pet/pet.service';
import { dogToken, catToken } from './pet/pet.module';
import { PetTypes } from './app.enum';
console.log(dogToken, catToken)
@Injectable()
export class AppService {
  private petMapping: {[key in PetTypes]: PetService} = {
    [PetTypes.CAT]: this.catService,
    [PetTypes.DOG]: this.dogService
  };
  constructor(
    @Inject(catToken) private catService: PetService,
    @Inject(dogToken) private dogService: PetService,
  ) {
  }
  async getHello(): Promise<string> {
    return `${await this.catService.getPetName()} & ${await this.dogService.getPetName()}`;
  }

  async getPetName(petType: PetTypes){
    if (petType in this.petMapping){
      return this.petMapping[petType].getPetName();
    }
  }
}
