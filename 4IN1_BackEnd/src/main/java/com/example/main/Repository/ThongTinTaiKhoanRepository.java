package com.example.main.Repository;

import com.example.main.Entity.ThongTinTaiKhoan;
import com.sun.xml.bind.v2.model.core.ID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThongTinTaiKhoanRepository extends JpaRepository<ThongTinTaiKhoan,Integer> {
}
