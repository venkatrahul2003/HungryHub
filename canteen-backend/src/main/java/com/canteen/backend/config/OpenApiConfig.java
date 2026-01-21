package com.canteen.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI canteenOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Canteen Management API")
                        .description("API documentation for the Canteen Modern Web App (Zomato/Swiggy Clone)")
                        .version("v1.0")
                        .contact(new Contact()
                                .name("Canteen Support")
                                .email("support@canteen.com")));
    }
}
