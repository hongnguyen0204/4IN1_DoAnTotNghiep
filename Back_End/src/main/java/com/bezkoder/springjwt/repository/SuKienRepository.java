package com.bezkoder.springjwt.repository;


import com.bezkoder.springjwt.models.SuKien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SuKienRepository extends JpaRepository<SuKien,Integer> {
    @Query(value = "SELECT * FROM event_information WHERE MONTH(time_of_event) = ?1 ", nativeQuery = true)
    List<SuKien> findByMonth(Integer thang);

    @Query(value = "SELECT * FROM event_information WHERE status_of_event='Đang chờ' ", nativeQuery = true)
    List<SuKien> SKDangCho();

    @Query(value = "SELECT * FROM event_information WHERE status_of_event='Đồng ý' ", nativeQuery = true)
    List<SuKien> SKDaDuyet();

    @Query(value = "SELECT * FROM event_information WHERE status_of_event='Từ chối' ", nativeQuery = true)
    List<SuKien> SKDaHuy();
}
