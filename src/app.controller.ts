import { Controller, Get, Param, ParseEnumPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { PetTypes } from './app.enum';
import { Pet } from './schemas/cat.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':petType')
  async getHello(
    @Param('petType', new ParseEnumPipe(PetTypes)) petType: PetTypes,
  ): Promise<Pet> {
    return this.appService.getPetName(petType);
  }
}
