import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMessageDto } from './dto/create-message.dto';
import { MailService } from '../mail/mail.service';
import { Message } from './message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    private mailService: MailService,
  ) {}

  async create(dto: CreateMessageDto) {
    const newMessage = this.messageRepository.create(dto);
    const saved = await this.messageRepository.save(newMessage);
    
    // Send email (fire and forget)
    this.mailService.sendContactNotification(dto).catch(console.error);
    
    return saved;
  }
}
