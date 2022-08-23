import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/auth/auth.service';
import { ROLES_KEY } from 'src/decorators/role';
import { Role } from 'src/enums/role';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const auth = req.headers['authorization']?.split(' ')[1];
    const { valid, user } = this.authService.validateToken(auth);
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
