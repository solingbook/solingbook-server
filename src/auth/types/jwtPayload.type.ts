import { EmailVerificationPurpose } from '../constant/emailVerificationPurpose.enum';

export type JwtPayload = {
  sub: string;
  iat?: number;
  exp?: number;
};

export type EmailVerificationPayload = {
  sub: string; // email
  purpose: EmailVerificationPurpose;
  iat?: number;
  exp?: number;
};
