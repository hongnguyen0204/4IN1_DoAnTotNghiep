package com.example.main.Entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="join_register")
public class Congtacvien {
    @Id
    private int acc_ID;
    private int event_ID;
    private String event_name;

    public Congtacvien(int acc_ID, int event_ID, String event_name) {
        this.acc_ID = acc_ID;
        this.event_ID = event_ID;
        this.event_name = event_name;
    }

    public Congtacvien() {
    }

    public int getAcc_ID() {
        return acc_ID;
    }

    public void setAcc_ID(int acc_ID) {
        this.acc_ID = acc_ID;
    }

    public int getEvent_ID() {
        return event_ID;
    }

    public void setEvent_ID(int event_ID) {
        this.event_ID = event_ID;
    }

    public String getEvent_name() {
        return event_name;
    }

    public void setEvent_name(String event_name) {
        this.event_name = event_name;
    }
}
