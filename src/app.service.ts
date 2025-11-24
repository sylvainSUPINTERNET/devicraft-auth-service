import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

    async isTokenSignatureValid(jwksUrl: string, jwtToken: string):Promise<boolean> {
      let jwtHeader = JSON.parse(Buffer.from(jwtToken.split('.')[0], 'base64').toString('utf8'));
      let resp = await fetch(jwksUrl);
      let jwks = await resp.json();
      let key = jwks.keys.find((key: any) => key.kid === jwtHeader.kid);
      return key !== undefined;
    }
}
