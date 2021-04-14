package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.NguoiThamGia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NguoiThamGiaRepository extends JpaRepository<NguoiThamGia,Integer> {
    @Query(value = "SELECT * FROM join_register WHERE acc_ID=?1 ", nativeQuery = true)
    List<NguoiThamGia> SKDaThamGia(int id);
}
