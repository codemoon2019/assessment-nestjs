import { Body, Controller, Post } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.interface';
import { UserService } from '../service/user.service';
import {map, switchMap, catchError} from 'rxjs/operators';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}
    
    @Post()
    create(@Body() user: User): Observable<User | Object>{
        return this.userService.create(user).pipe(
            map((user:User) => {
                return {
                    success: true,
                    user
                }
            }),
            catchError(err => of({ error: err.message }))
        );
    }

    @Post('login')
    login(@Body() user: User): Observable<Object>{
        return this.userService.login(user).pipe(
            map((jwt: string) => {
                return { 
                    success: true,
                    username: user.username,
                    access_token: jwt,
                }; 
            }),
            catchError(message => of({ 
                success: false,
                message: 'Wrong credentials' }))
        )
    }

}
