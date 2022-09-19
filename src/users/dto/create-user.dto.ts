import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto{
  @ApiProperty({example: 'example@example.com', description: 'Уникальный email'})
  @IsString({message:'Должно быть строкой'})
  @IsEmail({},{message:'Некорректный email'})
  readonly email: string;
  @ApiProperty({example: '1234567', description: 'пароль'})
  @IsString({message:'Должно быть строкой'})
  @Length(4,16, {message:'Длина должна быть от 4 до 16 символов'})
  readonly password: string
}