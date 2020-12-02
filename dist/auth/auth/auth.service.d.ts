import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { User } from '../../user/models/user.interface';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    generateJWT(user: User): Observable<string>;
    hashPassword(password: string): Observable<string>;
    comparePassword(newPassword: string, passwordHash: string): Observable<any | boolean>;
}
