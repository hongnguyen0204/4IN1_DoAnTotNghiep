package com.bezkoder.springjwt.controllers;


import com.bezkoder.springjwt.models.Account;
import com.bezkoder.springjwt.repository.AccRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/account")
public class AccController {

    @Autowired
    private AccRepository accRepository;

    @GetMapping("/getAcc/{username}")
    public Account GetAcc(@PathVariable String username){
        return accRepository.GetIF(username);
    }
}
