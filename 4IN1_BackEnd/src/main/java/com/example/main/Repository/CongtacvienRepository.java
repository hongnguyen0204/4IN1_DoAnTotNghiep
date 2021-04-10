package com.example.main.Repository;

import com.example.main.Entity.Congtacvien;
import com.example.main.Entity.SuKien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CongtacvienRepository extends JpaRepository<Congtacvien, Integer> {
    @Query(value = "SELECT ac FROM account_information ac,collaborator col WHERE ac.id=col.id ", nativeQuery = true)
    List<SuKien> findbyCongtacvien();
}
