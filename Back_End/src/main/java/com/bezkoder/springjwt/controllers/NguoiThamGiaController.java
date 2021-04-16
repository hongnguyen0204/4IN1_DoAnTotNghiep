package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.NguoiThamGia;
import com.bezkoder.springjwt.repository.NguoiThamGiaRepository;
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
    public List<Object> findall(@PathVariable int id){
        return nguoiThamGiaRepository.SKDaThamGia(id);
    }

    @GetMapping("/infor/{id}")
    public NguoiThamGia findIF(@PathVariable Integer id){
        return nguoiThamGiaRepository.findById(id).get();
    }

    @PostMapping("/delete")
    public void delete(@RequestBody NguoiThamGia nguoiThamGia) {
        nguoiThamGiaRepository.HuySK(nguoiThamGia.getAcc_ID(),nguoiThamGia.getEvent_ID());
    }

    @PostMapping("/dangki")
    public void dangKi(@RequestBody NguoiThamGia nguoiThamGia){
         nguoiThamGiaRepository.save(nguoiThamGia);
    }
}
