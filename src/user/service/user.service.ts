import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { Repository } from 'typeorm';
import { User } from '../models/user.interface';
import { from, Observable, throwError } from 'rxjs';
import { AuthService } from 'src/auth/auth/auth.service'; 
import {map, switchMap, catchError} from 'rxjs/operators';

@Injectable()
export class UserService {

    constructor (@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private authService: AuthService){}
    
    create(user: User): Observable<User>{
        
        return this.authService.hashPassword(user.password).pipe(
            switchMap((passwordHash: string) => {

                const newUser = new UserEntity();
                newUser.username = user.username;
                newUser.firstName = user.firstName;
                newUser.lastName = user.lastName;
                newUser.password = passwordHash;

                return from(this.userRepository.save(newUser)).pipe(
                    map((user: User) => {
                        const {password, ...result} = user;
                        return result;
                    }),
                    catchError(err => throwError(err))
                )

            })
        )
    
    }

    login(user: User): Observable<string>{
        return this.validateUser(user.username, user.password).pipe(
            switchMap((user: User) => {
                if(user){
                    return this.authService.generateJWT(user).pipe(map((jwt: string) => jwt))
                }else{
                    return 'Wrong credentials!';
                }
            })
        )
    }

    validateUser(username: string, password:string): Observable<User>{
        return this.findByUsername(username).pipe(
            switchMap((user: User) => this.authService.comparePassword(password, user.password).pipe(
                map((match: boolean) => {
                    if(match){
                        const { password, ...result} = user;
                        return result;
                    }else{
                        throw Error;
                    }
                })
            )) 
        );
    }

    findByUsername(username: string): Observable<User>{
        return from(this.userRepository.findOne({username}))
    }

}
