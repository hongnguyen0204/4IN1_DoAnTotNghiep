package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.DangKiLamCTV;
import com.bezkoder.springjwt.repository.DangKiLamCTVRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/dangkilamctv")
public class DangKiLamCTVController {

    @Autowired
    private DangKiLamCTVRepository dangKiLamCTVRepository;

    @RequestMapping(value = "/dangki", method = RequestMethod.POST)
    public void add(@RequestBody DangKiLamCTV dangKiLamCTV){
        dangKiLamCTVRepository.save(dangKiLamCTV);
    }
}