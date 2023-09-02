import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {


  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    
    private readonly http : AxiosAdapter
    
  ){}


  

  async execute_seed(){
    //Borrar la bd inicialmente
 // await this.pokemonModel.deleteMany({});

  const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')

  const pokemonToInsert: {name:string, no:number}[] = [];

  data.results.forEach( async ({name,url})=>{
    //Conseguir el no
    const segments = url.split('/');
    const no:number =  +segments[segments.length-2];

    pokemonToInsert.push({name,no});
   
    
    //Insertar elementos
    //console.log(createPokemonDto);
      // try {
      //  const pokemon = await this.pokemonModel.create({name, no});
      // } catch (error) {this.handleExceptions(error)}
   })

   try{
   await this.pokemonModel.insertMany(pokemonToInsert);
   }catch(error){this.handleExceptions(error)};
   

   return 'Seed executed'
  }


  private handleExceptions(error: any){
    if(error.code === 11000)
    throw new BadRequestException(`Pokemon exist in db ${JSON.stringify(error.keyValue)}`)

    console.log(error);
    throw new InternalServerErrorException(`Can't create pokemon, check server logs`);
  };
}
