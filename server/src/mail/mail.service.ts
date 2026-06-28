import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST') || 'smtp.ethereal.email',
      port: parseInt(this.configService.get('SMTP_PORT') || '587', 10),
      secure: false,
      auth: {
        user: this.configService.get('SMTP_USER') || 'test@ethereal.email',
        pass: this.configService.get('SMTP_PASS') || 'testpass',
      },
    });
  }

 async sendContactNotification(dto: { name: string; email: string; message: string }) {
  await this.transporter.sendMail({
    from: `"${dto.name}" <${dto.email}>`,
    to: this.configService.get('ADMIN_EMAIL'), // sends to your email
    subject: `📩 New message from ${dto.name}`,
    text: `Name: ${dto.name}\nEmail: ${dto.email}\n\nMessage:\n${dto.message}`,
    html: `<h3>📩 New Contact Message</h3>
           <p><strong>Name:</strong> ${dto.name}</p>
           <p><strong>Email:</strong> <a href="mailto:${dto.email}">${dto.email}</a></p>
           <p><strong>Message:</strong></p>
           <p>${dto.message}</p>`,
  });
}
}