import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import type {Request, Response} from 'express';


@Controller('/auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  readonly AUTH_GOOGLE_COOKIE_NAME = 'devicraft_google_tok';

  @Get('/google/callback')
  async googleAuthCallback(@Req() req:Request, @Res() res: Response) {
    try {

      const code = req.query.code;
      const resp = await fetch(`https://oauth2.googleapis.com/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          code: code as string,
          client_id: process.env.AUTH_GOOGLE_CLIENT_ID as string,
          client_secret: process.env.AUTH_GOOGLE_CLIENT_SECRET as string,
          redirect_uri: process.env.AUTH_GOOGLE_REDIRECT_URI as string,
          grant_type: 'authorization_code'
        }),
      });

      const {
        access_token,
        expires_in,
        refresh_token,
        id_token,
        token_type,
        scope
      } = await resp.json();

      // TODO : save refresh token to this user in DB
      // TODO : add a service to validate the token for each request ( if no cookie = user is disconnected OR token expired, check in DB refresh ? yes => get new access token with refresh token, no => redirect to login )
      // TODO : create a logout endpoint to delete refresh token from DB
      // TODO : faire le endpoint qui check ( ici ) chaque requête
      // TODO : faire la table "user" et foutre le .sql ici


      res.cookie('devicraft_google_user_info', access_token, {
        httpOnly: true,
        secure: process.env.APP_ENV === 'dev' ? false : true,
        maxAge: expires_in * 1000,
        sameSite: process.env.APP_ENV === 'dev' ? 'lax' : 'none', // 'none' for cross-site cookies MUST be secure set to true
        path: '/'
      });

      res.status(HttpStatus.PERMANENT_REDIRECT).redirect(process.env.AUTH_GOOGLE_REDIRECT_URI_AFTER_LOGIN as string);
    } catch ( error ) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).sendFile('error.html', { root: 'public' });
    }
  }

}


