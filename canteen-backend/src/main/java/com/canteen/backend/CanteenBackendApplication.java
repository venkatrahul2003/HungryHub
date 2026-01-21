package main.java.com.canteen.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class CanteenBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(CanteenBackendApplication.class, args);
    }

}
