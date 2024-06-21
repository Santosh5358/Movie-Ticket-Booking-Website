package com.firstApplicationApp.test.cousres.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.bind.annotation.CrossOrigin;


@Configuration

public class SpringSecurityConfig {


    @Bean
    @CrossOrigin (origins = "http://localhost:4200")
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {

        http.csrf().disable().authorizeHttpRequests().requestMatchers("/courses/**").authenticated().requestMatchers("/public/**").permitAll()
                .and().formLogin().and().httpBasic();


        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
