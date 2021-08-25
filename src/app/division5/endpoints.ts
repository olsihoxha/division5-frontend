
const environment = {
  API_HOST: 'http://localhost:8000',
  PAGE_SIZE: 10,
  name: 'development',
  BASE_URL: 'http://localhost:4200'
};

export const LOGIN_URL = `${environment.API_HOST}/auth/knock-knock/`;

export const AUTH_ENDPOINTS = {
  LOGIN_URL
}



export class Token {
  constructor(
    public access: string,
    public refresh: string){}
}
