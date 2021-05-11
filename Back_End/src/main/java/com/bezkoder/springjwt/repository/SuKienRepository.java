package com.bezkoder.springjwt.repository;


import com.bezkoder.springjwt.models.SuKien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface SuKienRepository extends JpaRepository<SuKien,Integer> {

    @Query(value = "SELECT ac.fullname, ac.email, ac.phone_number " +
            "FROM account_information ac,join_register j " +
            "WHERE j.acc_ID=ac.ID AND j.event_ID=?1 ", nativeQuery = true)
    List<Object> NguoiThamGia(int id);

    @Query(value = "SELECT * FROM event_information WHERE MONTH(time_of_event) = ?1 AND status_of_event='Đồng ý' ORDER BY ID DESC ", nativeQuery = true)
    List<SuKien> findByMonth(Integer thang);

    @Query(value = "SELECT * FROM event_information WHERE status_of_event='Đồng ý' ", nativeQuery = true)
    List<SuKien> findAll();

    @Query(value = "SELECT * FROM event_information WHERE DAY(time_of_event) BETWEEN ?1 AND ?2 AND event_name LIKE ?3 ", nativeQuery = true)
    List<SuKien> findByDay(String ngay1, String ngay2, String search);

    @Query(value = "SELECT * FROM event_information WHERE event_name LIKE ?1 ", nativeQuery = true)
    List<SuKien> findBytext(String searchText);

    @Query(value = "SELECT * FROM event_information WHERE owner_event_id = ?1" , nativeQuery = true)
    List<SuKien> findByID(Integer id);

    @Query(value = "SELECT * FROM event_information WHERE status_of_event='Đang chờ' ", nativeQuery = true)
    List<SuKien> SKDangCho();

    @Query(value = "SELECT COUNT(*) FROM event_information WHERE time_upload=DATE(NOW()) && status_of_event='Đang chờ' ", nativeQuery = true)
    Integer SKDangKiTrongNgay();

    @Query(value = "SELECT * FROM event_information WHERE time_of_event>DATE(NOW()) and status_of_event='Đồng ý' ", nativeQuery = true)
    List<SuKien> SKDaDuyet();

    @Query(value = "SELECT * FROM event_information WHERE status_of_event='Từ chối' ", nativeQuery = true)
    List<SuKien> SKDaHuy();

    @Query(value = "SELECT * FROM event_information WHERE hot= 1 ", nativeQuery = true)
    SuKien sukienhot();

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

    @Query(value = "SELECT ev.event_name, ac.fullname " +
            "FROM account_information ac,event_information ev " +
            "WHERE ac.ID=ev.owner_event_id and month(ev.time_of_event)=month(DATE(NOW())) ", nativeQuery = true)
    List<Object> ThongKeNguoiDangKi();

    @Query(value = "SELECT ev.event_name, ac.fullname " +
            "FROM account_information ac,event_information ev " +
            "WHERE ac.ID=ev.id_cencor and month(ev.time_of_event)=month(DATE(NOW())) ", nativeQuery = true)
    List<Object> ThongKeNguoiDuyet();
}
