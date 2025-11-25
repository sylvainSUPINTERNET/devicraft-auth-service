import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { InsertResult, Repository } from 'typeorm';

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

    async isTokenSignatureValid(jwksUrl: string, jwtToken: string):Promise<boolean> {
      let jwtHeader = JSON.parse(Buffer.from(jwtToken.split('.')[0], 'base64').toString('utf8'));
      let resp = await fetch(jwksUrl);
      let jwks = await resp.json();
      let key = jwks.keys.find((key: any) => key.kid === jwtHeader.kid);
      return key !== undefined;
    }
}
