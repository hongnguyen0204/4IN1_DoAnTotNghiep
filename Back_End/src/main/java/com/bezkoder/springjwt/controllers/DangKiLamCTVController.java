package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.Congtacvien;
import com.bezkoder.springjwt.models.DangKiLamCTV;
import com.bezkoder.springjwt.models.NguoiThamGia;
import com.bezkoder.springjwt.models.SuKien;
import com.bezkoder.springjwt.repository.DangKiLamCTVRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/{id}")
    public List<Object> findall(@PathVariable int id){
        return dangKiLamCTVRepository.SKDaDangKi(id);
    }

    @PostMapping("/kiemtra")
    public Integer KiemTra(@RequestBody DangKiLamCTV ctv){
        return dangKiLamCTVRepository.Check(ctv.getUser_ID(), ctv.getEvent_ID());
    }

    @PostMapping("/delete")
    public void delete(@RequestBody Congtacvien ctv) {
        dangKiLamCTVRepository.HuyDK(ctv.getUser_ID(),ctv.getEvent_ID());
    }

    @PostMapping("/checkSoLuong")
    public Integer KiemTraSoLuong(@RequestBody DangKiLamCTV ctv){
        return dangKiLamCTVRepository.CheckSoLuongCTV(ctv.getEvent_ID());
    }

    @PostMapping("/kiemtrathoigian")
    public List<Object> KiemTraThoiGian(@RequestBody DangKiLamCTV ctv){
        return dangKiLamCTVRepository.KiemTraThoiGian(ctv.getUser_ID());
    }

}