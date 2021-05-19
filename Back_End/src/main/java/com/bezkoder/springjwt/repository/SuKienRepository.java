package com.bezkoder.springjwt.repository;


import com.bezkoder.springjwt.models.SuKien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SuKienRepository extends JpaRepository<SuKien,Integer> {

    @Query(value = "SELECT ac.fullname, ac.email, ac.phone_number, j.checkticket " +
            "FROM account_information ac,join_register j " +
            "WHERE j.acc_ID=ac.ID AND j.event_ID=?1 ", nativeQuery = true)
    List<Object> NguoiThamGia(int id);

    @Query(value = "SELECT * FROM event_information WHERE MONTH(time_of_event) = ?1 AND time_of_event>DATE(NOW()) AND status_of_event='Đồng ý' ORDER BY time_of_event ASC", nativeQuery = true)
    List<SuKien> findByMonth(Integer thang);

    @Query(value = "SELECT * FROM event_information WHERE status_of_event='Đồng ý' ", nativeQuery = true)
    List<SuKien> findAll();

    @Query(value = "SELECT * FROM event_information WHERE time_of_event BETWEEN ?1 AND ?2 AND event_name LIKE ?3 limit ?4 ", nativeQuery = true)
    List<SuKien> findByDayandtext(String ngay1, String ngay2, String search, Integer record);

    @Query(value = "SELECT * FROM event_information WHERE time_of_event BETWEEN ?1 AND ?2 AND event_name LIKE ?3 limit 5 offset ?4", nativeQuery = true)
    List<SuKien> findByDayandtextpage(String ngay1, String ngay2, String search,Integer page);

    @Query(value = "SELECT * FROM event_information WHERE time_of_event BETWEEN ?1 AND ?2", nativeQuery = true)
    List<SuKien> findByDay(String ngay1, String ngay2);

    @Query(value = "SELECT * FROM event_information WHERE time_of_event BETWEEN ?1 AND ?2 limit ?3 ", nativeQuery = true)
    List<SuKien> findBydayofrecord(String ngay1, String ngay, Integer record);

    @Query(value = "SELECT * FROM event_information WHERE time_of_event BETWEEN ?1 AND ?2 limit 5 offset ?3", nativeQuery = true)
    List<SuKien> findBydaypage(String ngay1, String ngay, Integer page);

    @Query(value = "SELECT COUNT(ID) FROM event_information", nativeQuery = true)
    int findrecord();

    @Query(value = "SELECT COUNT(ID) FROM event_information WHERE event_name LIKE ?1 ", nativeQuery = true)
    int findrecordoftext(String search);

    @Query(value = "SELECT COUNT(ID) FROM event_information WHERE time_of_event BETWEEN ?1 AND ?2 ", nativeQuery = true)
    int findrecordofday(String ngay1, String ngay2);

    @Query(value = "SELECT COUNT(ID) FROM event_information WHERE time_of_event BETWEEN ?1 AND ?2 AND event_name LIKE ?3 ", nativeQuery = true)
    int findrecordofdayandtext(String ngay1, String ngay2, String search);

    @Query(value = "SELECT * FROM event_information WHERE event_name LIKE ?1 limit ?2 ", nativeQuery = true)
    List<SuKien> findBytext(String search,Integer record);

    @Query(value = "SELECT * FROM event_information WHERE event_name LIKE ?1 limit 5 offset ?2", nativeQuery = true)
    List<SuKien> findBytextofrecord(String searchText,Integer record);

    @Query(value = "SELECT * FROM event_information WHERE event_name LIKE ?1 limit ?2", nativeQuery = true)
    List<SuKien> findBytextoverfive(String searchText,String record);

    @Query(value = "SELECT * FROM event_information limit ?1", nativeQuery = true)
    List<SuKien> findtop(int record);

    @Query(value = "SELECT * FROM event_information limit 5 offset ?1", nativeQuery = true)
    List<SuKien> findpage(int record);

    @Query(value = "SELECT * FROM event_information WHERE owner_event_id = ?1" , nativeQuery = true)
    List<SuKien> findByID(Integer id);

    @Query(value = "SELECT time_of_event FROM event_information WHERE ID = ?1" , nativeQuery = true)
    LocalDateTime findByIDjointime(Integer id);

    @Query(value = "SELECT place FROM event_information WHERE ID = ?1" , nativeQuery = true)
    String findByIDjoinplace(Integer id);

    @Query(value = "SELECT event_name FROM event_information WHERE ID = ?1" , nativeQuery = true)
    String findByIDjoinname(Integer id);

    @Query(value = "SELECT * FROM event_information WHERE status_of_event='Đang chờ' ", nativeQuery = true)
    List<SuKien> SKDangCho();

    @Query(value = "SELECT COUNT(*) FROM event_information WHERE time_upload=DATE(NOW()) && status_of_event='Đang chờ' ", nativeQuery = true)
    Integer SKDangKiTrongNgay();

    @Query(value = "SELECT * FROM event_information WHERE time_of_event>DATE(NOW()) and status_of_event='Đồng ý' ORDER BY time_of_event ASC ", nativeQuery = true)
    List<SuKien> SKDaDuyet();

    @Query(value = "SELECT * FROM event_information WHERE status_of_event='Đồng ý' ORDER BY time_of_event ASC ", nativeQuery = true)
    List<SuKien> SKDaDuyetFull();

    @Query(value = "SELECT * FROM event_information WHERE status_of_event='Từ chối' ", nativeQuery = true)
    List<SuKien> SKDaHuy();

    @Query(value = "SELECT * FROM event_information WHERE hot= 1 ", nativeQuery = true)
    SuKien sukienhot();

    @Query(value = "SELECT * FROM event_information WHERE time_of_event>DATE(NOW()) AND status_of_event='Đồng ý' ORDER BY time_of_event ASC limit 1", nativeQuery = true)
    SuKien sukienthuong();

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
            "AND date(time_of_event)=date(?1) " +
            "AND time(time_of_event)=time(?1) " +
            "AND place=?2", nativeQuery = true)
    Integer KiemTra(LocalDateTime ngayToChuc, String diaDiem);

    @Query(value = "SELECT ev.event_name, ac.fullname " +
            "FROM account_information ac,event_information ev " +
            "WHERE ac.ID=ev.owner_event_id and month(ev.time_of_event)=month(DATE(NOW())) ", nativeQuery = true)
    List<Object> ThongKeNguoiDangKi();

    @Query(value = "SELECT ev.event_name, ac.fullname " +
            "FROM account_information ac,event_information ev " +
            "WHERE ac.ID=ev.id_cencor and month(ev.time_of_event)=month(DATE(NOW())) ", nativeQuery = true)
    List<Object> ThongKeNguoiDuyet();

<<<<<<< HEAD

=======
>>>>>>> 8b05be8d79d110eaa098ad8de61a7351abefcdf5
    @Query(value = "SELECT account_information.fullname,account_information.email from account_information,join_register where join_register.acc_ID = account_information.ID and join_register.event_ID =?1",nativeQuery = true)
    List<Object> getaccountByeventID1(int id);

    @Query(value = "SELECT account_information.email from account_information,join_register where join_register.acc_ID = account_information.ID and join_register.event_ID =?1",nativeQuery = true)
    String[] getemailbyidevent(int id);

<<<<<<< HEAD
    @Query(value = "SELECT Date(time_of_event) FROM event_information WHERE ID = ?1", nativeQuery = true)
    Date findByDayEvent(int id);

    @Query(value = "SELECT time_of_event FROM event_information WHERE ID = ?1", nativeQuery = true)
    String findByDayEvent1(int id);
=======
    @Query(value = "SELECT * from account_information,join_register where join_register.acc_ID = account_information.ID and join_register.event_ID = ?1 ",nativeQuery = true)
    List<Object> getaccountByeventID(int event_id);
>>>>>>> 8b05be8d79d110eaa098ad8de61a7351abefcdf5
}
