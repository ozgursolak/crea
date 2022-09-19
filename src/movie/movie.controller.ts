import {  Post, Body, Controller, UsePipes, UseGuards, HttpCode, Get, Param, Delete, Put } from '@nestjs/common';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiOkResponse, ApiResponse,  ApiBody } from '@nestjs/swagger';
import { MovieService } from './movie.service';
import { MovieData, MovieRO } from './movie.payload';
import { RolesGuard } from '../user/role.guard';
import { Roles } from '../user/role.decorator';
import { Role } from '../user/role.enum';
import { AuthGuard } from '../user/auth.guard';
import { MovieEntity } from './movie.entity';
import { UpdateMovieDto } from './dto';

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
  async addMovie(@Body() movie_data: MovieData): Promise<MovieRO> {
    return await this.movieService.addMovie(movie_data);
  }

  @ApiOperation({description: "List Movie Operation"})
  @ApiOkResponse({ status: 200, description: 'The movies has been listed', type: [MovieData] })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Get()
  @HttpCode(200)
  @Roles(Role.Manager, Role.Customer)
  async list(): Promise<MovieData[]> {
    return await this.movieService.listMovies();
  }

  @ApiOperation({description: "Delete Movie Operation"})
  @ApiOkResponse({ status: 200, description: 'The movie has been deleted', type: MovieEntity })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Delete('/:movieId')
  @HttpCode(200)
  @Roles(Role.Manager)
  async delete(@Param() params): Promise<MovieEntity> {
    return await this.movieService.deleteMovie(params.movieId);
  }

  @ApiOperation({description: "Update Movie Operation"})
  @ApiOkResponse({ status: 200, description: 'The movie has been updated', type: MovieEntity })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({type: UpdateMovieDto })
  @Put()
  @HttpCode(200)
  @Roles(Role.Manager)
  async update(@Body() update_movie_dto: UpdateMovieDto): Promise<MovieEntity> {
    return await this.movieService.updateMovie(update_movie_dto);
  }
}
