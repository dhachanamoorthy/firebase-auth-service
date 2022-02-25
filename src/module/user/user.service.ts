import { Injectable, Logger } from "@nestjs/common";
import { ENTER, ERROR, EXIT } from "src/constants";
import { CreateUserRequestDto } from "./dto/create.user.request.dto";
import admin from "firebase-admin";
import {
	CustomUserDetailsDto,
	UpdateUserRequestDto,
} from "./dto/update.user.request.dto";
@Injectable()
export class UserService {
	private readonly logger = new Logger(UserService.name);
	async createUser(user: CreateUserRequestDto) {
		try {
			this.logger.log(ENTER, "createUser()");
			let result = await admin.auth().createUser(user);
			this.logger.log(EXIT, "createUser()");
			return result;
		} catch (err) {
			this.logger.error(ERROR, err);
			throw err;
		}
	}

	async updateUser(uid: string, user: UpdateUserRequestDto) {
		try {
			this.logger.log(ENTER, "updateUser()");
			let result = await admin.auth().updateUser(uid, user);
			this.logger.log(EXIT, "updateUser()");
			return result;
		} catch (err) {
			this.logger.error(ERROR, err);
			throw err;
		}
	}

	async getUserInfo(uid: string) {
		try {
			this.logger.log(ENTER, "getUserInfo()");
			let result = await admin.auth().getUser(uid);
			this.logger.log(EXIT, "getUserInfo()");
			return result;
		} catch (err) {
			this.logger.error(ERROR, "getUserInfo()");
			throw err;
		}
	}

	async setCustomClaims(uid: string, userInfo: CustomUserDetailsDto) {
		try {
			this.logger.log(ENTER, "setCustomClaims()");
			let result = await admin.auth().setCustomUserClaims(uid, userInfo);
			this.revokeRefreshToken(uid);
			this.logger.log(EXIT, "setCustomClaims()");
			return { msg: "custom-claims updated successfully" };
		} catch (err) {
			this.logger.error(ERROR, err);
			throw err;
		}
	}

	async deleteUser(uid: string) {
		try {
			this.logger.log(ENTER, "deleteUser()");
			admin.auth().deleteUser(uid);
			this.logger.log(EXIT, "deleteUser()");
			return { msg: "user deleted successfully" };
		} catch (err) {
			this.logger.error(ERROR, err);
			throw err;
		}
	}

	async revokeRefreshToken(uid: string) {
		try {
			this.logger.log(ENTER, "revokeRefreshToken()");
			let result = admin.auth().revokeRefreshTokens(uid);
			this.logger.log(EXIT, "revokeRefreshToken()");
			return { msg: "token revoked successfully" };
		} catch (err) {
			this.logger.error(ERROR, err);
			throw err;
		}
	}
}
