import { IsNumber, IsString } from "class-validator";

export class AddRoleDto {
  @IsString({message:"Must be string!"})
  readonly value:string;
  @IsNumber({},{message:"Must be numeric!"})
  readonly userId:number;
}