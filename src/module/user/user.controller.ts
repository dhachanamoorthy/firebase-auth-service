import {
	Body,
	Controller,
	Delete,
	Get,
	Logger,
	Patch,
	Post,
	Req,
	Res,
	UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { ENTER, EXIT, ERROR } from "../../constants";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateUserRequestDto } from "./dto/create.user.request.dto";
import { AuthGuard } from "src/gaurd/auth.guard";
import {
	CustomUserDetailsDto,
	UpdateUserRequestDto,
} from "./dto/update.user.request.dto";
import { Auth } from "firebase-admin/lib/auth/auth";

@ApiTags("User")
@Controller("/user")
export class UserController {
	constructor(private readonly userService: UserService) {}
	private readonly logger = new Logger(UserController.name);
	/**
	 * get user information from auth token
	 * @param uid from user request;
	 * @returns
	 */
	@ApiBearerAuth("JWT-auth")
	@UseGuards(AuthGuard)
	@Get()
	async getUser(@Req() req) {
		try {
			this.logger.log(ENTER, "getUser()");
			const userDetail = req.userDetail;
			let result = await this.userService.getUserInfo(userDetail.uid);
			this.logger.log(EXIT, "getUser()");
			return result;
		} catch (err) {
			this.logger.error(ERROR, "getUser()");
			throw err;
		}
	}

	/**
	 * create new user
	 * @param users
	 * @returns
	 */

	@Post("/create")
	async createUser(@Req() req, @Body() user: CreateUserRequestDto) {
		try {
			this.logger.log(ENTER, "createUser()");
			let result = await this.userService.createUser(user);
			this.logger.log(EXIT, "createUser()");
			return result;
		} catch (err) {
			this.logger.error(ERROR, err);
			throw err;
		}
	}
	/**
	 * create new user
	 * @param users
	 * @param uid from user request;
	 * @returns
	 */
	@ApiBearerAuth("JWT-auth")
	@UseGuards(AuthGuard)
	@Patch("/update")
	async updateUser(@Req() req, @Body() user: UpdateUserRequestDto) {
		try {
			this.logger.log(ENTER, "updateUser()");
			const userDetail = req.userDetail;
			let result = await this.userService.updateUser(userDetail.uid, user);
			this.logger.log(EXIT, "updateUser()");
			return result;
		} catch (err) {
			this.logger.error(ERROR, err);
			throw err;
		}
	}

	/**
	 * set custom user information in firebase(setCustomClaims - https://firebase.google.com/docs/auth/admin/custom-claims)
	 * @param uid from user request;
	 * @returns
	 */
	@ApiBearerAuth("JWT-auth")
	@UseGuards(AuthGuard)
	@Patch("/customerInfo")
	async setCustomUserDetails(
		@Req() req,
		@Body() userInfo: CustomUserDetailsDto
	) {
		try {
			this.logger.log(ENTER, "setCustomUserDetails()");
			const userDetail = req.userDetail;
			let result = await this.userService.setCustomClaims(
				userDetail.uid,
				userInfo
			);
			this.logger.log(EXIT, "setCustomUserDetails()");
            return result;
		} catch (err) {
			this.logger.error(ERROR, "setCustomUserDetails()");
			throw err;
		}
	}

    @ApiBearerAuth("JWT-auth")
    @UseGuards(AuthGuard)
    @Delete()
    async deleteUser(@Req() req){
        try{
            this.logger.log(ENTER, "deleteUser()");
            const userDetail = req.userDetail;
            let result = await this.userService.deleteUser(userDetail.uid);
            this.logger.log(EXIT, "deleteUser()");
            return result;
        } catch(err){
            this.logger.log(ERROR, "deleteUser()");
            throw err;
        }   
    }

	/**
	 * revoke firebase user token
	 * @param uid from user request;
	 * @returns
	 */

	@ApiBearerAuth("JWT-auth")
	@UseGuards(AuthGuard)
	@Get("revokeToken")
	async revokeToken(@Req() req, @Res() res) {
		try {
			this.logger.log(ENTER, "revokeToken()");
			const userDetail = req.userDetail;
			let result =await this.userService.revokeRefreshToken(userDetail.uid);
            this.logger.log(EXIT, "revokeToken()");
            return result;
		} catch (err) {
            this.logger.log(ERROR, err);
            throw err;
        }
	}
}
