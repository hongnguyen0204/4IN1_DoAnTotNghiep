package com.bezkoder.springjwt.repository;


import com.bezkoder.springjwt.models.Congtacvien;
import com.bezkoder.springjwt.models.SuKien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;

public interface CongtacvienRepository extends JpaRepository<Congtacvien, Integer> {
    @Query(value = "SELECT ac.fullname,ac.email, col.strength, ac.phone_number, col.status_col, " +
            "col.ID, ac.img,ac.faculty " +
            "FROM quanlysukien.account_information ac,quanlysukien.collaborator col " +
            "WHERE ac.id=col.user_id " + " AND col.event_ID= ?1 ", nativeQuery = true)
    List<Object> findbyCongtacvien(Integer id);

    @Query(value = "SELECT ac.fullname,ac.email, ac.advantages,ac.phone_number, col.status_col, " +
            "col.ID   " +
            "FROM quanlysukien.account_information ac,quanlysukien.collaborator col " +
            "WHERE ac.id=col.user_id ", nativeQuery = true)
    List<Object> findbyCongtacvientest();
}
