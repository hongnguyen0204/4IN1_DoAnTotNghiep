package com.example.main.Controller;

import com.example.main.Entity.QuanLyTinTuc;
import com.example.main.Entity.ThongTinCaNhan;
import com.example.main.Repository.ThongTinCaNhanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@CrossOrigin (origins = "http://localhost:4200")
@RequestMapping(value = "/thongtincanhan")
public class ThongTinCaNhanConTroller {
    @Autowired
    private ThongTinCaNhanRepository thongTinCaNhanRepository;

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody ThongTinCaNhan st, @PathVariable Integer id) {
        try {
            ThongTinCaNhan thongTinCaNhan = thongTinCaNhanRepository.findById(id).get();
            thongTinCaNhan.setFullname(st.getFullname());
            thongTinCaNhan.setDay_of_birth(st.getDay_of_birth());
            thongTinCaNhan.setPhone_number((st.getPhone_number()));
            thongTinCaNhan.setEmail(st.getEmail());
            thongTinCaNhan.setFaculty(st.getFaculty());
            thongTinCaNhan.setImg(st.getImg());

            thongTinCaNhanRepository.save(thongTinCaNhan);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<ThongTinCaNhan> get(@PathVariable Integer id) {
        try {
            ThongTinCaNhan st = thongTinCaNhanRepository.findById(id).get();
            return new ResponseEntity<ThongTinCaNhan>(st, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<ThongTinCaNhan>(HttpStatus.NOT_FOUND);
        }
    }
}
