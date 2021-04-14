package com.bezkoder.springjwt.models;

import javax.persistence.*;

@Entity
@Table(name="collaborator")
public class Congtacvien {
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

    public int getStatus_col() {
        return status_col;
    }

    public void setStatus_col(int status_col) {
        this.status_col = status_col;
    }
}
