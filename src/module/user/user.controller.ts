import {
	Body,
	Controller,
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
import { UpdateUserRequestDto } from "./dto/update.user.request.dto";

@ApiTags("User")
@Controller()
export class UserController {
	constructor(private readonly userService: UserService) {}
	private readonly logger = new Logger(UserController.name);
	/**
	 * create new user
	 * @param users
	 * @returns
	 */

	@Post("/user/create")
	async createUser(@Req() req, @Res() res, @Body() user: CreateUserRequestDto) {
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
    @ApiBearerAuth('JWT-auth')
	@UseGuards(AuthGuard)
	@Patch("user/update")
	async updateUser(@Res() res, @Req() req, @Body() user: UpdateUserRequestDto) {
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
}
