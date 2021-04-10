package com.example.main.Controller;

import com.example.main.Entity.Congtacvien;
import com.example.main.Entity.SuKien;
import com.example.main.Repository.CongtacvienRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/quanlycongtacvien")
public class CongtacvienController {
    @Autowired
    private CongtacvienRepository congtacvienRepository;

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<Congtacvien> getAll() {
        return congtacvienRepository.findbyCongtacvien().get();
    }

    @PutMapping("/dongyduyet{id}")
    public void dongyduyet(@PathVariable Integer id){
        Congtacvien ctv = congtacvienRepository.findById(id).get();
        ctv.setStatus_col(true);
        congtacvienRepository.save(ctv);
    }

    @PutMapping("/tuchoiduyt{id}")
    public void tuchoiduyet(@PathVariable Integer id){
        Congtacvien ctv = congtacvienRepository.findById(id).get();
        ctv.setStatus_col(false);
        congtacvienRepository.save(ctv);
    }
}