package com.example.main.Repository;

import com.example.main.Entity.Congtacvien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CongtacvienRepository extends JpaRepository<Congtacvien, Integer> {
    @Query(value = "SELECT ac.fullname,ac.email, ac.advantages,ac.phone_number, col.status_col, col.ID   " +
            "FROM quanlysukien.account_information ac,quanlysukien.collaborator col " +
            "WHERE ac.id=col.user_id ", nativeQuery = true)
    List<Object> findbyCongtacvien();
}
