import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required_roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!required_roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log("user", user)
    if(!user) {
      return false;
    }
    
    const user_role = user.role;
    if(!user_role || !required_roles.some(role => role == user_role)) {
      return false;
    }

    return true;
  }
}