import { Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { UserService } from '../service/user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(user: User): Observable<User | Object>;
    login(user: User): Observable<Object>;
}
