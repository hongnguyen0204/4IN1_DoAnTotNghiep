package com.example.main.Controller;

import com.example.main.Entity.NguoiThamGia;
import com.example.main.Repository.NguoiThamGiaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/nguoithamgia")
public class NguoiThamGiaController {

    @Autowired
    private NguoiThamGiaRepository nguoiThamGiaRepository;

    @GetMapping("/{id}")
    public List<NguoiThamGia> findall(@PathVariable int id){
        return nguoiThamGiaRepository.SKDaThamGia(id);
    }

    @PostMapping("/dangki")
    public void dangKi(@RequestBody NguoiThamGia nguoiThamGia){
         nguoiThamGiaRepository.save(nguoiThamGia);
    }
}
