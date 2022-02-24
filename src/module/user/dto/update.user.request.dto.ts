import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, ValidateIf } from "class-validator";
export class UpdateUserRequestDto {
	@ApiProperty({
		type: String,
		example: "Sample",
	})
	@IsOptional()
	displayName: string;
	@ApiProperty({
		type: String,
		example: "example@gmail.com",
	})
	@IsOptional()
	email: string;
	@ApiProperty({
		type: String,
		example: "+91 90191 92920",
	})
	@IsOptional()
	phoneNumber: string;
	@ApiProperty({
		type: String,
		example: "exampl@123",
	})
	@IsOptional()
	password: string;
}
