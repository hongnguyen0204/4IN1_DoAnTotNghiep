package com.example.main.Controller;
import com.example.main.Entity.DangKy;
import com.example.main.Repository.DangKyRepository;
import com.example.main.Service.DangkyService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@Controller
public class DangKyController {
    @Autowired
    private DangKyRepository dangKyRepository;
    @PostMapping("/dangky")
    public DangKy createEmployee(@RequestBody DangKy user) {
        return dangKyRepository.save(user);
    }
}
