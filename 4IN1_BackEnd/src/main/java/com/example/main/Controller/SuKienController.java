package com.example.main.Controller;


import com.example.main.Entity.SuKien;
import com.example.main.Repository.SuKienRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin (origins = "http://localhost:4200")
public class SuKienController {
   @Autowired
    private SuKienRepository suKienRepository;

   @GetMapping("/sukien")
    public List<SuKien> getSuKiens() {
    return suKienRepository.findAll();
   }
}
