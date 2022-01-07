import { CanActivate, ExecutionContext, Logger, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import admin from 'firebase-admin';

export class AuthGuard implements CanActivate, OnModuleInit {
  onModuleInit() {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.PROJECT_ID,
        privateKey: process.env.PROJECT_KEY,
        clientEmail: process.env.PROJECT_CLIENT_EMAIL,
      }),
    });
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const token = context.getArgs()[0]?.header?.authorization?.split(' ')[1];
    if (token?.length > 0) {
      const isValid = admin
        .auth()
        .verifyIdToken(token)
        .then((decodedToken) => {
          let req = context.switchToHttp().getRequest();
          req.userDetail = decodedToken;
          return true;
        })
        .catch((err)=>{
          Logger.error(err);
          throw new UnauthorizedException("Invalid/Expired Token!!!");
        })
        return isValid;
    }
    else{
      throw new UnauthorizedException("Token Not Found!!!")
    }
  }
}
