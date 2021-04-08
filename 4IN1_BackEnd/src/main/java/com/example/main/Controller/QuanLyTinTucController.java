package com.example.main.Controller;
import com.example.main.Entity.QuanLyTinTuc;
import com.example.main.Repository.QuanLyTInTucRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;


@RestController
@CrossOrigin (origins = "http://localhost:4200")
@RequestMapping(value = "/quanlytintuc")
public class QuanLyTinTucController {
    @Autowired
    private QuanLyTInTucRepository quanLyTInTucRepository;

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<QuanLyTinTuc>getAll(){
        return quanLyTInTucRepository.findAll();
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public void add(@RequestBody QuanLyTinTuc quanLyTinTuc){
        long millis=System.currentTimeMillis();
        java.sql.Date date=new java.sql.Date(millis);
        quanLyTinTuc.setPostday(date);
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
            quanLyTinTuc.setImg(st.getImg());
            quanLyTinTuc.setPostday(st.getPostday());
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
