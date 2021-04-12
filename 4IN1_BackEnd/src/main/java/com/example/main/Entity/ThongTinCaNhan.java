package com.example.main.Entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "account_information")
public class ThongTinCaNhan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ID;

    private String username;
    private String pwd;
    private String email;
    private String fullname;
    private String faculty;
    private Date day_of_birth;
    private String phone_number;
    private boolean role_acc;
    private boolean status_acc;
    private boolean gender;
    private String img;

    public ThongTinCaNhan() {
    }

    public ThongTinCaNhan(int ID, String username, String pwd, String email, String fullname, String faculty, Date day_of_birth, String phone_number, Boolean role_acc, Boolean status_acc, Boolean gender, String img) {
        this.ID = ID;
        this.username = username;
        this.pwd = pwd;
        this.email = email;
        this.fullname = fullname;
        this.faculty = faculty;
        this.day_of_birth = day_of_birth;
        this.phone_number = phone_number;
        this.role_acc = role_acc;
        this.status_acc = status_acc;
        this.gender = gender;
        this.img = img;
    }

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getFaculty() {
        return faculty;
    }

    public void setFaculty(String faculty) {
        this.faculty = faculty;
    }

    public Date getDay_of_birth() {
        return day_of_birth;
    }

    public void setDay_of_birth(Date day_of_birth) {
        this.day_of_birth = day_of_birth;
    }

    public String getPhone_number() {
        return phone_number;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }

    public boolean isRole_acc() {
        return role_acc;
    }

    public void setRole_acc(boolean role_acc) {
        this.role_acc = role_acc;
    }

    public boolean isStatus_acc() {
        return status_acc;
    }

    public void setStatus_acc(boolean status_acc) {
        this.status_acc = status_acc;
    }

    public boolean isGender() {
        return gender;
    }

    public void setGender(boolean gender) {
        this.gender = gender;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }
}
