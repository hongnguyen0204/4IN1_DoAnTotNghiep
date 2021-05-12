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
<<<<<<< HEAD
    private String tiket;
=======
    private String ticket;
    private String checkticket;
>>>>>>> a1b85d70a69f244c9bf787180e67d0e225597140


    public NguoiThamGia() {
    }

<<<<<<< HEAD
    public NguoiThamGia(int ID, int acc_ID, int event_ID, String tiket) {
        this.ID = ID;
        this.acc_ID = acc_ID;
        this.event_ID = event_ID;
        this.tiket = tiket;
=======
    public NguoiThamGia(int ID, int acc_ID, int event_ID, String ticket, String checkticket) {
        this.ID = ID;
        this.acc_ID = acc_ID;
        this.event_ID = event_ID;
        this.ticket = ticket;
        this.checkticket = checkticket;
>>>>>>> a1b85d70a69f244c9bf787180e67d0e225597140
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

<<<<<<< HEAD
    public String getTiket() {
        return tiket;
    }

    public void setTiket(String tiket) {
        this.tiket = tiket;
=======
    public String getTicket() {
        return ticket;
    }

    public void setTicket(String ticket) {
        this.ticket = ticket;
    }

    public String getCheckticket() {
        return checkticket;
    }

    public void setCheckticket(String checkticket) {
        this.checkticket = checkticket;
>>>>>>> a1b85d70a69f244c9bf787180e67d0e225597140
    }
}
