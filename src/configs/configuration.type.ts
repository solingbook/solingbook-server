export type EnvConfigType = {
  HOST: string;
  PORT: number;
  JWT_SECRET: string;

  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_SYNCHRONIZE: boolean;
};
