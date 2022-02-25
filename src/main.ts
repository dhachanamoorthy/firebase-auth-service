import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import admin from "firebase-admin";
import * as dotenv from "dotenv";
async function bootstrap() {
	const app = await NestFactory.create(AppModule);
  app.enableCors();
	dotenv.config();
	const config = new DocumentBuilder()
		.setTitle("Firebase Auth Docummentation")
		.setDescription("Microservice for firebase authendication")
		.setVersion("1.0")
		.addTag("Auth Service")
		.addBearerAuth(
		  {
		    type: 'http',
		    scheme: 'bearer',
		    bearerFormat: 'JWT',
		    name: 'JWT',
		    description: 'Enter bearer token',
		    in: 'header',
		  },
		  'JWT-auth',
		)
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, document);
	const port = process.env.PORT;
	console.log("server running at " + port);
	await app.listen(port);
	admin.initializeApp({
		credential: admin.credential.cert({
			projectId: process.env.PROJECT_ID,
			privateKey: process.env.PROJECT_KEY?.replace(/\\n/g, "\n"),
			clientEmail: process.env.PROJECT_CLIENT_EMAIL,
		}),
	});
}
bootstrap();
