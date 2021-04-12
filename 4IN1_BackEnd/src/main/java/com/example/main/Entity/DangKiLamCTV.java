package com.example.main.Entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "collaborator")
public class DangKiLamCTV {
    @Id
    private  int ID;
    private  int user_ID;
    private  int event_ID;

    public DangKiLamCTV() {
    }
    public DangKiLamCTV( int ID, int user_ID, int event_ID) {
        this.ID = ID;
        this.user_ID = user_ID;
        this.event_ID = event_ID;
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
}
