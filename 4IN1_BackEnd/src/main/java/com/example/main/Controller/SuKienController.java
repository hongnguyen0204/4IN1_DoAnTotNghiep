package com.example.main.Controller;
import com.example.main.Entity.SuKien;
import com.example.main.Repository.SuKienRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Random;

@RestController
@CrossOrigin (origins = "http://localhost:4200")
@RequestMapping(value = "/student")
public class SuKienController {
   @Autowired
   private SuKienRepository suKienRepository;

   @GetMapping("/all")
    public List<SuKien> getSuKiens() {
        return suKienRepository.findAll();
    }

    @PostMapping("/add")
    public SuKien addSuKien(SuKien suKien){
       return suKienRepository.save(suKien);
    }

    @PutMapping("/duyet")
    public SuKien duyetSuKien(SuKien suKien){
        suKien.setStatus_of_event("Đồng ý");
        return suKienRepository.save(suKien);
    }

    @PutMapping("/tuchoiduyet")
    public SuKien tuChoiDuyetSuKien(SuKien suKien){
        suKien.setStatus_of_event("Từ chối");
        return suKienRepository.save(suKien);
    }

   }
