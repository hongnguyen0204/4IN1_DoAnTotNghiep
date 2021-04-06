package com.example.main.Repository;

import com.example.main.Entity.DangNhap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DangNhapRepository extends JpaRepository<DangNhap, Integer> {

}
