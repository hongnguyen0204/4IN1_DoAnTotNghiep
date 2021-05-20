package com.bezkoder.springjwt.models;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "notification")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ID;
    private int Account_id;
    private String Content;
    private boolean status;
    private Date time_notification;

    public Notification() {
    }

    public Notification(int ID, int account_id, String content, boolean status, Date time_notification) {
        this.ID = ID;
        Account_id = account_id;
        Content = content;
        this.status = status;
        this.time_notification = time_notification;
    }

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public int getAccount_id() {
        return Account_id;
    }

    public void setAccount_id(int account_id) {
        Account_id = account_id;
    }

    public String getContent() {
        return Content;
    }

    public void setContent(String content) {
        Content = content;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public Date getTime_Notification() {
        return time_notification;
    }

    public void setTime_Notification(Date time_notification) {
        this.time_notification = time_notification;
    }


}
