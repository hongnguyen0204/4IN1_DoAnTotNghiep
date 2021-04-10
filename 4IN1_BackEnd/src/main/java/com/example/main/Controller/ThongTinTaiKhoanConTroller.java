package com.example.main.Controller;

import com.example.main.Entity.QuanLyTinTuc;
import com.example.main.Entity.ThongTinTaiKhoan;
import com.example.main.Repository.ThongTinTaiKhoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@RequestMapping(value = "/thontincanhan")
public class ThongTinTaiKhoanConTroller {
    @Autowired
    private ThongTinTaiKhoanRepository thongTinTaiKhoanRepository;
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody ThongTinTaiKhoan st, @PathVariable Integer id) {
        try {
            ThongTinTaiKhoan thongTinTaiKhoan = thongTinTaiKhoanRepository.findById(id).get();
            thongTinTaiKhoan.setFullname(st.getFullname());
            thongTinTaiKhoan.setDay_of_birth(st.getDay_of_birth());
            thongTinTaiKhoan.;
            thongTinTaiKhoan.setPhone_number((st.getPhone_number()));
            thongTinTaiKhoan.setEmail(st.getEmail());
            thongTinTaiKhoan.setFaculty(st.getFaculty());
            if(thongTinTaiKhoan.get()!=null){
                quanLyTinTuc.setImg(st.getImg());
            }
            quanLyTinTuc.setPostday(st.getPostday());
            quanLyTInTucRepository.save(quanLyTinTuc);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
