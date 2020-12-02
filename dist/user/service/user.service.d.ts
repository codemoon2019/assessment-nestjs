import { UserEntity } from '../models/user.entity';
import { Repository } from 'typeorm';
import { User } from '../models/user.interface';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth/auth.service';
export declare class UserService {
    private readonly userRepository;
    private authService;
    constructor(userRepository: Repository<UserEntity>, authService: AuthService);
    create(user: User): Observable<User>;
    login(user: User): Observable<string>;
    validateUser(username: string, password: string): Observable<User>;
    findByUsername(username: string): Observable<User>;
}
