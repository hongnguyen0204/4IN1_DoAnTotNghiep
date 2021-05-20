package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.Congtacvien;
import com.bezkoder.springjwt.models.Notification;
import com.bezkoder.springjwt.repository.CongtacvienRepository;
import com.bezkoder.springjwt.repository.NotificationRepository;
import com.bezkoder.springjwt.repository.SuKienRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "https://sukiendtu.edu.vn")
@RequestMapping(value = "/quanlycongtacvien")
public class CongtacvienController {
    @Autowired
    private CongtacvienRepository congtacvienRepository;

    @Autowired
    private SuKienRepository suKienRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<Object> getAll() {
        return congtacvienRepository.findbyCongtacvientest();
    }

    @PutMapping("/dongyduyet/{id}")
    public void dongyduyet(@PathVariable Integer id){
        Congtacvien ctv = congtacvienRepository.findById(id).get();
        ctv.setStatus_col(1);
        congtacvienRepository.save(ctv);
        Notification notification = new Notification();
        notification.setAccount_id(ctv.getUser_ID());
        String name = suKienRepository.findByIDjoinname(ctv.getEvent_ID());
        notification.setContent("Bạn đã trở thành cộng tác viên sự kiện: "+ name);
        notification.setStatus(false);
        Date date=java.util.Calendar.getInstance().getTime();
        notification.setTime_notification(date);
        notification.setHref("https://sukiendtu.edu.vn/quanlysukien");
        notificationRepository.save(notification);
    }

    @GetMapping("/theoid/{id}")
    public List<Object> getSKbyid(@PathVariable Integer id){
        return congtacvienRepository.findbyCongtacvien(id);
    }

    @PutMapping("/tuchoiduyet/{id}")
    public void tuchoiduyet(@PathVariable Integer id){
        Congtacvien ctv = congtacvienRepository.findById(id).get();
        ctv.setStatus_col(0);
        congtacvienRepository.save(ctv);
        Notification notification = new Notification();
        notification.setAccount_id(ctv.getUser_ID());
        String name = suKienRepository.findByIDjoinname(ctv.getEvent_ID());
        notification.setContent("Bạn đã bị từ chối làm cộng tác viên sự kiện: "+ name);
        notification.setStatus(false);
        Date date=java.util.Calendar.getInstance().getTime();
        notification.setTime_notification(date);
        notification.setHref("https://sukiendtu.edu.vn/quanlysukien");
        notificationRepository.save(notification);
    }
}