package com.example.main.Controller;
import com.example.main.Entity.SuKien;
import com.example.main.Repository.SuKienRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin (origins = "http://localhost:4200")
@RequestMapping(value = "/sukien")
public class SuKienController {
   @Autowired
   private SuKienRepository suKienRepository;

   @GetMapping("/all")
    public List<SuKien> getSuKiens() {
        return suKienRepository.findAll();
    }

    @PostMapping("/add")
    public void addSuKien(@RequestBody SuKien suKien){
       suKien.setOwner_event_id(1);
       suKienRepository.save(suKien);
    }

    @PutMapping("/duyet/{id}")
    public SuKien duyetSuKien(SuKien suKien){
        suKien.setStatus_of_event("Đồng ý");
        return suKienRepository.save(suKien);
    }

    @PutMapping("/tuchoiduyet/{id}")
    public SuKien tuChoiDuyetSuKien(SuKien suKien){
        suKien.setStatus_of_event("Từ chối");
        return suKienRepository.save(suKien);
    }
   }
