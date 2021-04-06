package com.example.main.Service.impl;

import com.example.main.Entity.DangKy;
import com.example.main.Repository.DangKyRepository;
import com.example.main.Service.DangkyService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

public class DangkyImpl implements DangkyService {
    @Autowired private DangKyRepository dangKyRepository;
    @Override
    public void saveUser(DangKy user) {
        dangKyRepository.save(user);
    }

}
