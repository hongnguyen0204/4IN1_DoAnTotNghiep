package com.bezkoder.springjwt.models;

import javax.persistence.*;

@Entity
@Table(name = "join_register")
public class NguoiThamGia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ID;
    private int acc_ID;
    private int event_ID;


    public NguoiThamGia() {
    }

    public NguoiThamGia(int ID, int acc_ID, int event_ID) {
        this.ID = ID;
        this.acc_ID = acc_ID;
        this.event_ID = event_ID;

    }


    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
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
}
