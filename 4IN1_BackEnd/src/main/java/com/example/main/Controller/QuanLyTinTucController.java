package com.example.main.Controller;
import com.example.main.Entity.QuanLyTinTuc;
import com.example.main.Repository.QuanLyTInTucRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/quanlytintuc")
public class QuanLyTinTucController {
    @Autowired
    private QuanLyTInTucRepository quanLyTInTucRepository;

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<QuanLyTinTuc>getAll(){
        return quanLyTInTucRepository.findAll();
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public QuanLyTinTuc add(@RequestBody QuanLyTinTuc quanLyTinTuc){
        return quanLyTInTucRepository.save(quanLyTinTuc);
    }
}
