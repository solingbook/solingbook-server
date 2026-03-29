import { Injectable } from '@nestjs/common';
import { TypedConfigService } from 'src/configs/typedConfig.service';
import * as nodemailer from 'nodemailer';
import { SendEmailOption } from '../types/nodeMailer.type';

@Injectable()
export class NodeMailer {
  constructor(private readonly configService: TypedConfigService) {}

  async sendEmail(options: SendEmailOption) {
    const { to, subject, link } = options;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get('NODE_MAILER_USER'),
        pass: this.configService.get('NODE_MAILER_PASS'),
      },
    });

    await transporter.sendMail({
      to,
      from: `"No Reply" <${this.configService.get('EMAIL')}>`,
      subject,
      html: this.createEmailTemplate(link),
    });
  }

  private createEmailTemplate(link: string) {
    return `
    <!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>이메일 인증</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f6f8; padding: 40px 0;">
      <tr>
        <td align="center">
          <table width="560" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

            <!-- Header -->
            <tr>
              <td style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 40px 48px; text-align: center;">
                <p style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">Solingbook</p>
                <p style="margin: 8px 0 0; font-size: 14px; color: rgba(255,255,255,0.75); letter-spacing: 0.5px;">이메일 인증</p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 48px 48px 40px;">
                <p style="margin: 0 0 8px; font-size: 22px; font-weight: 700; color: #111827;">이메일 주소를 인증해 주세요</p>
                <p style="margin: 0 0 32px; font-size: 15px; color: #6b7280; line-height: 1.6;">
                  아래 버튼을 클릭하면 이메일 인증이 완료됩니다.<br />
                  링크는 <strong style="color: #374151;">5분</strong> 동안 유효합니다.
                </p>

                <!-- CTA Button -->
                <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <a
                    href="${link}"
                    target="_blank"
                    style="
                      display: inline-block;
                      padding: 16px 48px;
                      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
                      color: #ffffff;
                      font-size: 16px;
                      font-weight: 600;
                      text-decoration: none;
                      border-radius: 8px;
                      letter-spacing: 0.3px;
                      cursor: pointer;
                    "
                  >
                      <div align="center">이메일 인증하기</div>
                  </a>
                  </tr>
                </table>
  <a href="">naver</a>

                <!-- Divider -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin: 40px 0 32px;">
                  <tr>
                    <td style="border-top: 1px solid #e5e7eb;"></td>
                  </tr>
                </table>

                <!-- Fallback URL -->
                <p style="margin: 0 0 8px; font-size: 13px; color: #6b7280;">버튼이 작동하지 않는 경우 아래 링크를 브라우저에 직접 붙여넣어 주세요.</p>
                <p style="margin: 0; font-size: 12px; color: #9ca3af; word-break: break-all; background-color: #f9fafb; padding: 12px 16px; border-radius: 6px; border: 1px solid #e5e7eb;">
                  ${link}
                </p>
              </td>
            </tr>

            <!-- Notice -->
            <tr>
              <td style="padding: 0 48px 40px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
                  <tr>
                    <td style="padding: 14px 16px;">
                      <p style="margin: 0; font-size: 13px; color: #92400e; line-height: 1.5;">
                        본인이 요청하지 않은 경우 이 이메일을 무시하셔도 됩니다. 계정은 안전하게 유지됩니다.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color: #f9fafb; padding: 24px 48px; text-align: center; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0 0 4px; font-size: 13px; color: #9ca3af;">이 이메일은 Solingbook에서 발송되었습니다.</p>
                <p style="margin: 0; font-size: 12px; color: #d1d5db;">&copy; 2026 Solingbook. All rights reserved.</p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
  }
}
