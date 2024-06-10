package com.firstApplicationApp.test.cousres.config;

import com.firstApplicationApp.test.cousres.bean.Registration;
import com.firstApplicationApp.test.cousres.repository.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class MovieBookUserDetails implements UserDetailsService {

    @Autowired
    private  RegistrationRepository registrationRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        String userName,password=null;
        List<GrantedAuthority> authorites=null;
        List<Registration> customer=registrationRepository.findByEmail((username));
        if(customer.isEmpty()){
            throw new UsernameNotFoundException("User details not found for the user:"+username);
        }else {
            userName=customer.get(0).getEmail();
            password=customer.get(0).getPassword();
            authorites=new ArrayList<>();
            authorites.add(new SimpleGrantedAuthority(customer.get(0).getRole()));
        }
        return new User(username,password,authorites);
    }
}
