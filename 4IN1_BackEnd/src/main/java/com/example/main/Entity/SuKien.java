package com.example.main.Entity;
import org.hibernate.annotations.GeneratorType;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "event_information")
public class SuKien {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ID;

    private String event_name;

    private String organizer;

    private Date time_of_event;

    private String place;

    private String describe_of_event;

    private String img;

    private String plan_file;

    private int number_of_collaborators;

    private String criteria;

    private Date end_day;

    private String status_of_event;

    private int owner_event_id;

    private boolean hot;

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public String getEvent_name() {
        return event_name;
    }

    public void setEvent_name(String event_name) {
        this.event_name = event_name;
    }

    public String getOrganizer() {
        return organizer;
    }

    public void setOrganizer(String organizer) {
        this.organizer = organizer;
    }

    public Date getTime_of_event() {
        return time_of_event;
    }

    public void setTime_of_event(Date time_of_event) {
        this.time_of_event = time_of_event;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getDescribe_of_event() {
        return describe_of_event;
    }

    public void setDescribe_of_event(String describe_of_event) {
        this.describe_of_event = describe_of_event;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getPlan_file() {
        return plan_file;
    }

    public void setPlan_file(String plan_file) {
        this.plan_file = plan_file;
    }

    public int getNumber_of_collaborators() {
        return number_of_collaborators;
    }

    public void setNumber_of_collaborators(int number_of_collaborators) {
        this.number_of_collaborators = number_of_collaborators;
    }

    public String getCriteria() {
        return criteria;
    }

    public void setCriteria(String criteria) {
        this.criteria = criteria;
    }

    public Date getEnd_day() {
        return end_day;
    }

    public void setEnd_day(Date end_day) {
        this.end_day = end_day;
    }

    public String getStatus_of_event() {
        return status_of_event;
    }

    public void setStatus_of_event(String status_of_event) {
        this.status_of_event = status_of_event;
    }

    public int getOwner_event_id() {
        return owner_event_id;
    }

    public void setOwner_event_id(int owner_event_id) {
        this.owner_event_id = owner_event_id;
    }

    public boolean isHot() {
        return hot;
    }

    public void setHot(boolean hot) {
        this.hot = hot;
    }

    public SuKien() {
    }

    public SuKien(int ID, String event_name, String organizer, Date time_of_event, String place, String describe_of_event, String img, String plan_file, int number_of_collaborators, String criteria, Date end_day, String status_of_event, int owner_event_id, boolean hot) {
        this.ID = ID;
        this.event_name = event_name;
        this.organizer = organizer;
        this.time_of_event = time_of_event;
        this.place = place;
        this.describe_of_event = describe_of_event;
        this.img = img;
        this.plan_file = plan_file;
        this.number_of_collaborators = number_of_collaborators;
        this.criteria = criteria;
        this.end_day = end_day;
        this.status_of_event = status_of_event;
        this.owner_event_id = owner_event_id;
        this.hot = hot;
    }
}
