import { Controller, Post, Body } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  // Still injecting the same MessagesService
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() dto: CreateMessageDto) {
    // Still calling the same .create() method
    return this.messagesService.create(dto);
  }
}
