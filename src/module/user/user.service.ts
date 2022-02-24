import { Injectable, Logger } from "@nestjs/common";
import { ENTER, ERROR, EXIT } from "src/constants";
import { CreateUserRequestDto } from "./dto/create.user.request.dto";
import admin from "firebase-admin";
import { UpdateUserRequestDto } from "./dto/update.user.request.dto";
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
}
