package com.example.main.Entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name ="account_information")
public class Thongtintaikhoan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String username;
    private String pwd;
    private String fullname;
    private String faculty;
    private Date date_of_birth;
    private String phone_number;
    private String advantages;
    private String img;
    private boolean gender;
    private boolean role_acc;
    private boolean status_acc;

    public Thongtintaikhoan() {
    }

    public Thongtintaikhoan(int id, String username, String pwd, String fullname, String faculty, Date date_of_birth, String phone_number, String advantages, String img, boolean gender, boolean role_acc, boolean status_acc) {
        this.id = id;
        this.username = username;
        this.pwd = pwd;
        this.fullname = fullname;
        this.faculty = faculty;
        this.date_of_birth = date_of_birth;
        this.phone_number = phone_number;
        this.advantages = advantages;
        this.img = img;
        this.gender = gender;
        this.role_acc = role_acc;
        this.status_acc = status_acc;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public Date getDate_of_birth() {
        return date_of_birth;
    }

    public void setDate_of_birth(Date date_of_birth) {
        this.date_of_birth = date_of_birth;
    }

    public String getPhone_number() {
        return phone_number;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }

    public String getAdvantages() {
        return advantages;
    }

    public void setAdvantages(String advantages) {
        this.advantages = advantages;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public boolean isGender() {
        return gender;
    }

    public void setGender(boolean gender) {
        this.gender = gender;
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
}
