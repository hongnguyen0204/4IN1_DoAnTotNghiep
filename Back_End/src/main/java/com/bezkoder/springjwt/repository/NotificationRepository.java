package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NotificationRepository extends JpaRepository <Notification,Integer> {
    @Query(value = "SELECT * FROM notification WHERE Account_id = ?1 ORDER BY ID DESC;", nativeQuery = true)
    List<Notification> GetNotification(int id);
}
