import { ApiProperty } from "@nestjs/swagger";
import { ValidateIf } from "class-validator";
export class CreateUserRequestDto {
	@ApiProperty({
		type: String,
		example: "Sample",
	})
	displayName: string;

	@ApiProperty({ type: String, example: "example@gmail.com" })
	@ValidateIf((o) => o.phoneNumber === undefined, {
		// here, $constraint1 will be replaced with "10", and $value with actual supplied value
		message: "Provide email or mobile.",
	})
	email: string;

	@ValidateIf((o) => o.email === undefined, {
		// here, $constraint1 will be replaced with "10", and $value with actual supplied value
		message: "Provide email or mobile.",
	})
	@ApiProperty({
		type: String,
		example: "+91 90191 92920",
	})
	phoneNumber: string;
	@ApiProperty({
		type: String,
		example: "exampl@123",
	})
	password: string;
}
