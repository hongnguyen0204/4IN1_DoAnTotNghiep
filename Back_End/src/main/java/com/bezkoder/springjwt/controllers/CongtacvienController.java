package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.Congtacvien;
import com.bezkoder.springjwt.repository.CongtacvienRepository;
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
    public List<Object> getAll() {
        return congtacvienRepository.findbyCongtacvien();
    }

    @PutMapping("/dongyduyet/{id}")
    public void dongyduyet(@PathVariable Integer id){
        Congtacvien ctv = congtacvienRepository.findById(id).get();
        ctv.setStatus_col(1);
        congtacvienRepository.save(ctv);
    }

    @PutMapping("/tuchoiduyet/{id}")
    public void tuchoiduyet(@PathVariable Integer id){
        Congtacvien ctv = congtacvienRepository.findById(id).get();
        ctv.setStatus_col(0);
        congtacvienRepository.save(ctv);
    }
}