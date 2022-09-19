import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { MovieModule } from '../movie/movie.module';
import { TicketEntity } from './ticket.entity';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';


@Module({
  imports: [UserModule, MovieModule, TypeOrmModule.forFeature([TicketEntity])],
  providers: [TicketService],
  controllers: [TicketController],
  exports: [TicketService]
})
export class TicketModule {}
