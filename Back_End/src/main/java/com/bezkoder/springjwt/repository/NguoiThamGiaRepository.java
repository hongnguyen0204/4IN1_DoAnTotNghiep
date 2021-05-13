package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.Account;
import com.bezkoder.springjwt.models.NguoiThamGia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
@Transactional
public interface NguoiThamGiaRepository extends JpaRepository<NguoiThamGia,Integer> {
    @Query(value = "SELECT ev.event_name, ev.time_of_event, ev.place, j.event_ID " +
            "FROM event_information ev,join_register j " +
            "WHERE j.acc_ID=?1 AND j.event_ID=ev.ID ", nativeQuery = true)
    List<Object> SKDaThamGia(int id);

    @Modifying
    @Query(value = "DELETE FROM join_register WHERE acc_ID=?1 AND event_ID=?2 ", nativeQuery = true)
    void HuySK(int acc_ID,int event_ID);

    @Query(value = "SELECT Count(*) " +
            "FROM join_register " +
            "WHERE acc_ID=?1 " +
            "AND event_ID=?2", nativeQuery = true)
    Integer KiemTraThamGia(int acc_ID, int event_ID);

    @Query(value = "SELECT ev.time_of_event  " +
            "FROM join_register j,event_information ev " +
            "WHERE acc_ID=?1 " +
            "AND j.event_ID=ev.ID", nativeQuery = true)
    List<Object> KiemTraThoiGian(int acc_ID);

}
