package com.canteen.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableCaching
@EntityScan("com.canteen.backend.model")
@EnableJpaRepositories("com.canteen.backend.repository")
@ComponentScan("com.canteen.backend")
public class CanteenBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(CanteenBackendApplication.class, args);
    }

}
