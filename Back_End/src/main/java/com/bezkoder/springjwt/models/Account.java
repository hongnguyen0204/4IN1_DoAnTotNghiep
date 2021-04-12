package com.bezkoder.springjwt.models;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "account_information")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ID;
    private String username;
    private String email;
    private String fullname;
    private String faculty;
    private Date day_of_birth;
    private String phone_number;
    private String img;
    private boolean gender;
    private boolean status_acc;
    private String password;
    private String advantages;

    public Account() {
    }

    public Account(int ID, String username, String email, String fullname, String faculty, Date day_of_birth, String phone_number, String img, boolean gender, boolean status_acc, String password, String advantages) {
        this.ID = ID;
        this.username = username;
        this.email = email;
        this.fullname = fullname;
        this.faculty = faculty;
        this.day_of_birth = day_of_birth;
        this.phone_number = phone_number;
        this.img = img;
        this.gender = gender;
        this.status_acc = status_acc;
        this.password = password;
        this.advantages = advantages;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAdvantages() {
        return advantages;
    }

    public void setAdvantages(String advantages) {
        this.advantages = advantages;
    }
}
