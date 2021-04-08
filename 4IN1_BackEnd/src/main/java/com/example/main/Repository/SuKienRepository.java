package com.example.main.Repository;

import com.example.main.Entity.SuKien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SuKienRepository extends JpaRepository<SuKien,Integer> {
    @Query(value = "SELECT * FROM event_information WHERE MONTH(time_of_event) = ?1 ", nativeQuery = true)
    List<SuKien> findByMonth(Integer thang);
}
