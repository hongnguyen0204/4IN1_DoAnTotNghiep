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
       suKien.setStatus_of_event("Đang chờ");
       suKienRepository.save(suKien);
    }

    @PutMapping("/duyet/{id}")
    public void duyetSuKien(@PathVariable Integer id){
        SuKien sk =suKienRepository.findById(id).get();
        sk.setStatus_of_event("Đồng ý");
        suKienRepository.save(sk);
    }

    @PutMapping("/tuchoiduyet/{id}")
    public void tuChoiDuyetSuKien(@PathVariable Integer id){
        SuKien sk =suKienRepository.findById(id).get();
        sk.setStatus_of_event("Từ chối");
        suKienRepository.save(sk);
    }

    @GetMapping("/{id}")
    public SuKien get(@PathVariable Integer id) {
        SuKien sk = suKienRepository.findById(id).get();
        return sk;
    }
   }
