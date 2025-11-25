import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource, InsertResult, Repository } from 'typeorm';
import { GoogleClaims } from './types/GoogleClaims';

@Injectable()
export class AppService {

  constructor(
    private datasource:DataSource,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async createGoogleUser(userDataGoogle: GoogleClaims) {
    await this.datasource.transaction(async transactionalEntityManager => {
      // TODO 
      // Check if user exists
      // If not, create user

      // Add auth_providers with the user PK 

      // Create session and send the token back to the caller ( to send it as cookie )


    });

  }

  async isTokenSignatureValid(jwksUrl: string, jwtToken: string):Promise<boolean> {
    let jwtHeader = JSON.parse(Buffer.from(jwtToken.split('.')[0], 'base64').toString('utf8'));
    let resp = await fetch(jwksUrl);
    let jwks = await resp.json();
    let key = jwks.keys.find((key: any) => key.kid === jwtHeader.kid);
    return key !== undefined;
  }
}
