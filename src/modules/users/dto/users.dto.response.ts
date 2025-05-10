export class UserResponseDto {
  name: string;

  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

export interface Payload {
  name: string;
  sub: string;
}

export interface JwtDecoded {
  name: string;
  sub: string;
  iat?: number;
  exp?: number;
}
