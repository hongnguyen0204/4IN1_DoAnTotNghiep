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

    @Query(value = "SELECT * FROM event_information WHERE MONTH(time_of_event) = ?1 AND status_of_event='Đồng ý' ", nativeQuery = true)
    List<SuKien> findByMonth(Integer thang);

    @Query(value = "SELECT * FROM event_information WHERE status_of_event='Đồng ý' ", nativeQuery = true)
    List<SuKien> findAll();

    @Query(value = "SELECT * FROM event_information WHERE time_of_event BETWEEN ?1 AND ?2 AND event_name LIKE ?3 ", nativeQuery = true)
    List<SuKien> findByDayandtext(String ngay1, String ngay2, String search);

    @Query(value = "SELECT * FROM event_information WHERE time_of_event BETWEEN ?1 AND ?2", nativeQuery = true)
    List<SuKien> findByDay(String ngay1, String ngay2);

    @Query(value = "SELECT COUNT(ID) FROM event_information", nativeQuery = true)
    int findrecord();

    @Query(value = "SELECT COUNT(ID) FROM event_information WHERE event_name LIKE ?1 ", nativeQuery = true)
    int findrecordoftext(String searchText);

    @Query(value = "SELECT * FROM event_information WHERE event_name LIKE ?1 limit ?2", nativeQuery = true)
    List<SuKien> findBytext(String searchText,String record);

    @Query(value = "SELECT * FROM event_information WHERE event_name LIKE ?1 limit ?2", nativeQuery = true)
    List<SuKien> findBytextoverfive(String searchText,String record);

    @Query(value = "SELECT * FROM event_information limit ?1", nativeQuery = true)
    List<SuKien> findtop(int record);

    @Query(value = "SELECT * FROM event_information limit 5 offset ?1", nativeQuery = true)
    List<SuKien> findpage(int record);

    @Query(value = "SELECT * FROM event_information WHERE owner_event_id = ?1" , nativeQuery = true)
    List<SuKien> findByID(Integer id);


    @Query(value = "SELECT * FROM event_information WHERE status_of_event='Đang chờ' ", nativeQuery = true)
    List<SuKien> SKDangCho();

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

}
