import {
	CanActivate,
	ExecutionContext,
	Logger,
	OnModuleInit,
	UnauthorizedException,
} from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import admin from "firebase-admin";
import { ERROR } from "src/constants";

export class AuthGuard implements CanActivate {
	private readonly logger = new Logger(AuthGuard.name);
	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		const token = context.getArgs()[0]?.headers?.authorization?.split(" ")[1];
		if (token?.length > 0) {
			const checkRevoked = true;
			const isValid = admin
				.auth()
				.verifyIdToken(token, checkRevoked)
				.then((decodedToken) => {
					let req = context.switchToHttp().getRequest();
					req.userDetail = decodedToken;
					return true;
				})
				.catch((err) => {
					this.logger.error(ERROR, err);
					if (err.code == "auth/id-token-revoked") {
						throw new UnauthorizedException(
							"Token Revoked!!!",
							"Get a new Token!!!"
						);
					} else {
						throw new UnauthorizedException("Invalid/Expired Token!!!");
					}
				});
			return isValid;
		} else {
			throw new UnauthorizedException("Token Not Found!!!");
		}
	}
}
