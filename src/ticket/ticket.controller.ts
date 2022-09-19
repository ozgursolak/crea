import {  Post, Body, Controller, UsePipes, UseGuards, HttpCode, Get, Param, Delete, Put } from '@nestjs/common';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiOkResponse, ApiResponse,  ApiBody } from '@nestjs/swagger';
import { RolesGuard } from '../user/role.guard';
import { Roles } from '../user/role.decorator';
import { Role } from '../user/role.enum';
import { AuthGuard } from '../user/auth.guard';
import { TicketService } from './ticket.service';
import { BuyTickeDto } from './dto';
import { TicketRO } from './ticket.payload';


@ApiBearerAuth()
@ApiTags('ticket')
@Controller('ticket')
@UseGuards(AuthGuard, RolesGuard)
export class TicketController {

  constructor(private readonly ticketService: TicketService) {}

  @UsePipes(new ValidationPipe())
  @ApiOperation({description: "Buy Ticket Operation"})
  @ApiOkResponse({ status: 201, description: 'The ticket has been successfully sold.', type: TicketRO})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({type: BuyTickeDto })
  @Post()
  @Roles(Role.Manager, Role.Customer)
  async buyTicket(@Body() buy_ticket: BuyTickeDto): Promise<TicketRO> {
    return await this.ticketService.buyTicket(buy_ticket);
  }
}
