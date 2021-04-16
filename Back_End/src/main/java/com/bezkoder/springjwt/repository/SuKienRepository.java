package com.bezkoder.springjwt.repository;


import com.bezkoder.springjwt.models.SuKien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface SuKienRepository extends JpaRepository<SuKien,Integer> {
    @Query(value = "SELECT * FROM event_information WHERE MONTH(time_of_event) = ?1 AND status_of_event='Đồng ý' ", nativeQuery = true)
    List<SuKien> findByMonth(Integer thang);

    @Query(value = "SELECT * FROM event_information WHERE status_of_event='Đang chờ' ", nativeQuery = true)
    List<SuKien> SKDangCho();

    @Query(value = "SELECT * FROM event_information WHERE status_of_event='Đồng ý' ", nativeQuery = true)
    List<SuKien> SKDaDuyet();

    @Query(value = "SELECT * FROM event_information WHERE status_of_event='Từ chối' ", nativeQuery = true)
    List<SuKien> SKDaHuy();

    @Query(value = "SELECT Count(*) FROM event_information WHERE time_of_event<DATE(NOW()) AND status_of_event='Đồng ý' ", nativeQuery = true)
    Integer SKDaToChuc();

    @Query(value = "SELECT Count(*) FROM event_information WHERE MONTH(time_of_event)=MONTH(NOW()) AND status_of_event='Đồng ý' ", nativeQuery = true)
    Integer SuKienDaDuyet();

    @Query(value = "SELECT COUNT(*) FROM event_information WHERE MONTH(time_of_event)=MONTH(NOW()) AND status_of_event='Từ chối' ", nativeQuery = true)
    Integer TongSKDaHuy();

    @Query(value = "SELECT Count(*) FROM event_information WHERE time_of_event>DATE(NOW()) AND status_of_event='Đồng ý' ", nativeQuery = true)
    Integer SuKienSapToChuc();

    @Query(value = "SELECT SUM(number_of_peoples) FROM event_information WHERE time_of_event<DATE(NOW()) AND status_of_event='Đồng ý' ", nativeQuery = true)
    Integer TongNguoiThamGia();

    @Query(value = "SELECT Count(*) " +
            "FROM event_information " +
            "WHERE time_of_event>DATE(NOW()) " +
            "AND status_of_event='Đồng ý' " +
            "AND DATE(time_of_event)=DATE(?1) " +
            "AND place=?2", nativeQuery = true)
    Integer KiemTra(Date ngayToChuc,String diaDiem);

}
