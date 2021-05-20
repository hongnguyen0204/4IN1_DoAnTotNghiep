package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.Congtacvien;
import com.bezkoder.springjwt.models.DangKiLamCTV;
import com.bezkoder.springjwt.models.Notification;
import com.bezkoder.springjwt.repository.DangKiLamCTVRepository;
import com.bezkoder.springjwt.repository.NotificationRepository;
import com.bezkoder.springjwt.repository.SuKienRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "https://sukiendtu.edu.vn")
@RequestMapping(value = "/dangkilamctv")
public class DangKiLamCTVController {

    @Autowired
    private DangKiLamCTVRepository dangKiLamCTVRepository;

    @Autowired
    NotificationRepository notificationRepository;

    @Autowired
    SuKienRepository suKienRepository;

    @RequestMapping(value = "/dangki", method = RequestMethod.POST)
    public void add(@RequestBody DangKiLamCTV dangKiLamCTV){
        Notification notification = new Notification();
        notification.setAccount_id(dangKiLamCTV.getUser_ID());
        String name = suKienRepository.findByIDjoinname(dangKiLamCTV.getEvent_ID());
        notification.setContent("Bạn đã đăng kí làm cộng tác viên cho sự kiên: "+ name +" thành công");
        notification.setStatus(false);
        Date date=java.util.Calendar.getInstance().getTime();
        notification.setTime_notification(date);
        notification.setHref("https://sukiendtu.edu.vn/quanlysukien");
        notificationRepository.save(notification);
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