import { Body, Controller, Get, Logger, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AppService } from "./app.service";
import { ENTER, EXIT, ERROR } from "./constants";

@ApiTags("Health Check")
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}
	private readonly logger = new Logger(AppController.name);
	@Get()
	getHello(): string {
		try {
			this.logger.log(ENTER, "getHello()");
			this.logger.log(EXIT, "getHello()");
			return this.appService.getHello();
		} catch (err) {
			this.logger.error(ERROR, err);
			throw err;
		}
	}
}
