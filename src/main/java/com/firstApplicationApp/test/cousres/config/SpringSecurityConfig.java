package com.firstApplicationApp.test.cousres.config;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.boot.actuate.autoconfigure.observation.ObservationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.CorsConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Collections;

@Configuration

public class SpringSecurityConfig {

//    @Bean
//    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http.cors(new Customizer<CorsConfigurer<HttpSecurity>>() {
//            @Override
//            public void customize(CorsConfigurer<HttpSecurity> httpSecurityCorsConfigurer) {
//                httpSecurityCorsConfigurer.configurationSource(new CorsConfigurationSource() {
//                    @Override
//                    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
//                        CorsConfiguration configuration  = new CorsConfiguration();
//                        configuration.setAllowedOrigins(Collections.singletonList("http://localhost:4200"));
//                        configuration.setAllowedHeaders(Collections.singletonList("*"));
//                        configuration.setAllowedMethods(Collections.singletonList("*"));
//                        configuration.setAllowCredentials(true);
//                        return configuration;
//                    }
//                });
//
//
//            }
//        });
////        http.authorizeHttpRequests(conf -> conf.anyRequest().authenticated());
//        http.httpBasic(conf -> conf.authenticationDetailsSource(HttpServletRequest::getServletPath));
//        return http.build();
//    }


    @Bean
    @CrossOrigin (origins = "http://localhost:4200")
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests().requestMatchers( "/courses/**").authenticated().requestMatchers("/public/**").permitAll()
                .and().formLogin().and().httpBasic();
        http.csrf().disable();


        return http.build();
    }
}
