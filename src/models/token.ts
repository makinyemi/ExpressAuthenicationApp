export interface RefreshToken {
  token: string;
  username: string;
  expiry: Date;
}

export let refreshTokens: RefreshToken[] = [];
