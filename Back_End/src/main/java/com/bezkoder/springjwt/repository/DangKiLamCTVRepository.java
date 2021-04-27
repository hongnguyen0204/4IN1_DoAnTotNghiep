package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.DangKiLamCTV;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DangKiLamCTVRepository extends JpaRepository <DangKiLamCTV,Integer>{

    @Query(value = "SELECT ev.event_name, ev.time_of_event, ev.place, j.event_ID " +
            "FROM event_information ev,collaborator j " +
            "WHERE j.user_ID=?1 AND j.event_ID=ev.ID AND j.status_col=true", nativeQuery = true)
    List<Object> SKDaDangKi(int id);

    @Query(value = "SELECT COUNT(*) " +
            "FROM collaborator  " +
            "WHERE user_ID=?1 AND event_ID=?2 ", nativeQuery = true)
    Integer Check(int id,int event_id);

}
