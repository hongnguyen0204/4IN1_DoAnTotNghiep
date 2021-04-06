package com.example.main;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

<<<<<<< HEAD
@SpringBootApplication(exclude = {org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class})
=======
@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
>>>>>>> 1278a6e19784658c4f877825dffe7f1b651175ca
public class MainApplication {

    public static void main(String[] args) {
        SpringApplication.run(MainApplication.class, args);
    }

}
