import {
    Body, ClassSerializerInterceptor, Controller, Delete, Get, Param,
    Patch, Post, Query, UseInterceptors
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user-dto';
import { UpdateUserDto } from './dtos/update-user-dto';

@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        return this.usersService.create(body.email, body.password);
    }

    @Post('login')
    async login(@Body() body: { email: string, password: string }) {
        const success = await this.usersService.checkLogin(body.email, body.password);
        return { success: success };
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/:id')
    findUser(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(+id, body);
    }

    @Get()
    findUsers(@Query('email') email: string) {
        return this.usersService.find(email);
    }
}
