package com.bezkoder.springjwt.controllers;
import com.bezkoder.springjwt.models.QuanLyTinTuc;
import com.bezkoder.springjwt.models.SuKien;
import com.bezkoder.springjwt.repository.QuanLyTInTucRepository;
import com.sun.mail.imap.protocol.ID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;


@RestController
//Kích hoạt CORS trên máy chủ
@CrossOrigin (origins = "http://localhost:4200")
@RequestMapping(value = "/quanlytintuc")


public class QuanLyTinTucController {

    @Autowired
    private QuanLyTInTucRepository quanLyTInTucRepository;

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<QuanLyTinTuc>getAll(){
        return quanLyTInTucRepository.findAll(Sort.by(Sort.Direction.DESC,"ID"));
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public void add(@RequestBody QuanLyTinTuc quanLyTinTuc){
        //currentTimeMillis lấy thời gian
        long millis=System.currentTimeMillis();
        java.sql.Date date=new java.sql.Date(millis);
        quanLyTinTuc.setPost_day(date);
        quanLyTInTucRepository.save(quanLyTinTuc);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Integer id) {
        quanLyTInTucRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody QuanLyTinTuc st, @PathVariable Integer id) {
        try {
            QuanLyTinTuc quanLyTinTuc = quanLyTInTucRepository.findById(id).get();
            quanLyTinTuc.setTitle(st.getTitle());
            quanLyTinTuc.setDescribe_of_news(st.getDescribe_of_news());
            quanLyTinTuc.setContent(st.getContent());
            if(quanLyTinTuc.getImg()!=null){
            quanLyTinTuc.setImg(st.getImg());
            }
            quanLyTinTuc.setPost_day(st.getPost_day());
            quanLyTinTuc.setID_admin(st.getID_admin());
            quanLyTinTuc.setID_admin(st.getID_admin());
            quanLyTInTucRepository.save(quanLyTinTuc);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuanLyTinTuc> get(@PathVariable Integer id) {
        try {
            QuanLyTinTuc st = quanLyTInTucRepository.findById(id).get();
            return new ResponseEntity<QuanLyTinTuc>(st, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<QuanLyTinTuc>(HttpStatus.NOT_FOUND);
        }
    }
}
