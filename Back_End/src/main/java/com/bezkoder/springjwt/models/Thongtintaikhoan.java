package com.bezkoder.springjwt.models;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name ="account_information")
public class Thongtintaikhoan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ID;
    private String username;
    private String password;
    private String fullname;
    private String faculty;
    private Date day_of_birth;
    private String phone_number;
    private String advantages;
    private String img;
    private boolean gender;
    private boolean status_acc;

    public Thongtintaikhoan() {
    }

    public Thongtintaikhoan(int ID, String username, String password, String fullname, String faculty, Date day_of_birth, String phone_number, String advantages, String img, boolean gender, boolean status_acc) {
        this.ID = ID;
        this.username = username;
        this.password = password;
        this.fullname = fullname;
        this.faculty = faculty;
        this.day_of_birth = day_of_birth;
        this.phone_number = phone_number;
        this.advantages = advantages;
        this.img = img;
        this.gender = gender;
        this.status_acc = status_acc;
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

    public String getpassword() {
        return password;
    }

    public void setpassword(String password) {
        this.password = password;
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

    public void setDay_of_birth(Date date_of_birth) {
        this.day_of_birth = date_of_birth;
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
    
    public boolean isStatus_acc() {
        return status_acc;
    }

    public void setStatus_acc(boolean status_acc) {
        this.status_acc = status_acc;
    }
}
