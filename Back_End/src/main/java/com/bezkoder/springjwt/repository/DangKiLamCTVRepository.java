package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.DangKiLamCTV;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface DangKiLamCTVRepository extends JpaRepository <DangKiLamCTV,Integer>{

    @Query(value = "SELECT ev.event_name, ev.time_of_event, ev.place, j.event_ID " +
            "FROM event_information ev,collaborator j " +
            "WHERE j.user_ID=?1 AND j.event_ID=ev.ID AND j.status_col=true", nativeQuery = true)
    List<Object> SKDaDangKi(int id);

    @Query(value = "SELECT COUNT(*) " +
            "FROM collaborator  " +
            "WHERE user_ID=?1 AND event_ID=?2 ", nativeQuery = true)
    Integer Check(int id,int event_id);

    @Query(value = "SELECT ev.time_of_event  " +
            "FROM collaborator j,event_information ev " +
            "WHERE j.user_ID=?1 " +
            "AND j.event_ID=ev.ID", nativeQuery = true)
    List<Object> KiemTraThoiGian(int acc_ID);

    @Modifying
    @Query(value = "DELETE FROM collaborator WHERE user_ID=?1 AND event_ID=?2 ", nativeQuery = true)
    void HuyDK(int acc_ID,int event_ID);

    @Query(value = "SELECT COUNT(*) FROM collaborator where event_ID=?1", nativeQuery = true)
    Integer CheckSoLuongCTV(int event_id);
}
