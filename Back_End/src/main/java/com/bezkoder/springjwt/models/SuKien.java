package com.bezkoder.springjwt.models;

import javax.persistence.*;
import java.sql.Date;
import java.time.LocalDateTime;

@Entity
@Table(name = "event_information")
public class SuKien {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ID;

    private String event_name;

    private String organizer;

    private LocalDateTime time_of_event;

    private Date time_upload;

    private String place;

    private String faculty;

    private String describe_of_event;

    private String content;

    private String img;

    private String plan_file;

    private int number_of_collaborators;

    private int number_of_peoples;

    private String criteria;

    private LocalDateTime end_day;

    private String status_of_event;

    private int owner_event_id;

    private int id_cencor;

    private boolean hot;

    private boolean checksendmail;

    public SuKien() {
    }

    public SuKien(int ID, String event_name, String organizer, LocalDateTime time_of_event, Date time_upload, String place, String faculty, String describe_of_event, String content, String img, String plan_file, int number_of_collaborators, int number_of_peoples, String criteria, LocalDateTime end_day, String status_of_event, int owner_event_id, int id_cencor, boolean hot, boolean checksendmail) {
        this.ID = ID;
        this.event_name = event_name;
        this.organizer = organizer;
        this.time_of_event = time_of_event;
        this.time_upload = time_upload;
        this.place = place;
        this.faculty = faculty;
        this.describe_of_event = describe_of_event;
        this.content = content;
        this.img = img;
        this.plan_file = plan_file;
        this.number_of_collaborators = number_of_collaborators;
        this.number_of_peoples = number_of_peoples;
        this.criteria = criteria;
        this.end_day = end_day;
        this.status_of_event = status_of_event;
        this.owner_event_id = owner_event_id;
        this.id_cencor = id_cencor;
        this.hot = hot;
        this.checksendmail = checksendmail;
    }

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

    public LocalDateTime getTime_of_event() {
        return time_of_event;
    }

    public void setTime_of_event(LocalDateTime time_of_event) {
        this.time_of_event = time_of_event;
    }

    public Date getTime_upload() {
        return time_upload;
    }

    public void setTime_upload(Date time_upload) {
        this.time_upload = time_upload;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getFaculty() {
        return faculty;
    }

    public void setFaculty(String faculty) {
        this.faculty = faculty;
    }

    public String getDescribe_of_event() {
        return describe_of_event;
    }

    public void setDescribe_of_event(String describe_of_event) {
        this.describe_of_event = describe_of_event;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
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

    public int getNumber_of_peoples() {
        return number_of_peoples;
    }

    public void setNumber_of_peoples(int number_of_peoples) {
        this.number_of_peoples = number_of_peoples;
    }

    public String getCriteria() {
        return criteria;
    }

    public void setCriteria(String criteria) {
        this.criteria = criteria;
    }

    public LocalDateTime getEnd_day() {
        return end_day;
    }

    public void setEnd_day(LocalDateTime end_day) {
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

    public int getId_cencor() {
        return id_cencor;
    }

    public void setId_cencor(int id_cencor) {
        this.id_cencor = id_cencor;
    }

    public boolean isHot() {
        return hot;
    }

    public void setHot(boolean hot) {
        this.hot = hot;
    }

    public boolean isChecksendmail() {
        return checksendmail;
    }

    public void setChecksendmail(boolean checksendmail) {
        this.checksendmail = checksendmail;
    }
}
