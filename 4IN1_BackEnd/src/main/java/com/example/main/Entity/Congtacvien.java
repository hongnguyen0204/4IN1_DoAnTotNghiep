package com.example.main.Entity;

import org.springframework.data.annotation.Id;

import javax.persistence.Entity;
<<<<<<< HEAD
import javax.persistence.Id;
=======
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
>>>>>>> d10e0ea90a5090a99efbb293616b8322a4abd790
import javax.persistence.Table;

@Entity
@Table(name="collaborator")
public class Congtacvien {
<<<<<<< HEAD
    @Id
    private int acc_ID;
    private int event_ID;
    private String event_name;

    public Congtacvien(int acc_ID, int event_ID, String event_name) {
        this.acc_ID = acc_ID;
=======
    @javax.persistence.Id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ID;
    private int user_ID;
    private int event_ID;
    private int status_col;

    public Congtacvien() {
    }

    public Congtacvien(int ID, int user_ID, int event_ID, int status_col) {
        this.ID = ID;
        this.user_ID = user_ID;
>>>>>>> d10e0ea90a5090a99efbb293616b8322a4abd790
        this.event_ID = event_ID;
        this.status_col = status_col;
    }

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public int getUser_ID() {
        return user_ID;
    }

    public void setUser_ID(int user_ID) {
        this.user_ID = user_ID;
    }

    public int getEvent_ID() {
        return event_ID;
    }

    public void setEvent_ID(int event_ID) {
        this.event_ID = event_ID;
    }

<<<<<<< HEAD
    public String getEvent_name() {
        return event_name;
    }

    public void setEvent_name(String event_name) {
        this.event_name = event_name;
=======
    public int getStatus_col() {
        return status_col;
    }

    public void setStatus_col(int status_col) {
        this.status_col = status_col;
>>>>>>> d10e0ea90a5090a99efbb293616b8322a4abd790
    }
}
