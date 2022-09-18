import {  Post, Body, Controller, UsePipes, UseGuards } from '@nestjs/common';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiOkResponse, ApiResponse,  ApiBody } from '@nestjs/swagger';
import { MovieService } from './movie.service';
import { MovieData, MovieRO } from './movie.payload';
import { RolesGuard } from '../user/role.guard';
import { Roles } from '../user/role.decorator';
import { Role } from '../user/role.enum';
import { AuthGuard } from '../user/auth.guard';

@ApiBearerAuth()
@ApiTags('movies')
@Controller('movies')
@UseGuards(AuthGuard, RolesGuard)
export class MovieController {

  constructor(private readonly movieService: MovieService) {}

  @UsePipes(new ValidationPipe())
  @ApiOperation({description: "Add Movie Operation"})
  @ApiOkResponse({ status: 201, description: 'The movie has been successfully created.', type: MovieRO})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({type: MovieData })
  @Post()
  @Roles(Role.Manager)
  async create(@Body() movieData: MovieData): Promise<MovieRO> {
    return await this.movieService.addMovie(movieData);
  }
}
