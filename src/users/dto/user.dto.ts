import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsString()
  @IsOptional()
  displayname?: string;
}
//download class validator to use validation
