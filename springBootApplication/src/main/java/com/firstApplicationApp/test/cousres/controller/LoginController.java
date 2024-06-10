package com.firstApplicationApp.test.cousres.controller;

import com.firstApplicationApp.test.cousres.repository.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    @Autowired
    private RegistrationRepository registrationRepository;

}
