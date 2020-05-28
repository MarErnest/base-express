
import { IsString, IsNotEmpty } from 'class-validator';

export class ILoginParams {

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

}

