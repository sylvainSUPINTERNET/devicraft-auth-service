export type GoogleClaims = {
    iss: string;
    azp: string;
    aud: string;
    at_hash: string;
    sub: string;
    email: string;
    name: string;
    picture: string;
    given_name: string;
    family_name: string;
    email_verified: boolean;
    iat: number;
    exp: number;
}