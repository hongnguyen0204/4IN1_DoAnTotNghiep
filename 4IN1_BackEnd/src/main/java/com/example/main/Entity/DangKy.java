package com.example.main.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table (name = "account_information")
public class DangKy {

    @Id
    @Column(name = "ID")
    private int id;

    @Column(name = "username")
    private String userName;

    @Column(name = "pwd")
    private String pwd;

    @Column(name = "email")
    private String email;

    @Column(name = "fullname")
    private String fullName;

    @Column(name = "faculty")
    private String faculty;

    @Column(name = "day_of_birth")
    private Date dayOfBirth;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "role_acc")
    private boolean roleAcc;

    public DangKy() {
    }

    public DangKy(int id, String userName, String pwd, String email, String fullName, String faculty, Date dayOfBirth, String phoneNumber, boolean roleAcc) {
        this.id = id;
        this.userName = userName;
        this.pwd = pwd;
        this.email = email;
        this.fullName = fullName;
        this.faculty = faculty;
        this.dayOfBirth = dayOfBirth;
        this.phoneNumber = phoneNumber;
        this.roleAcc = roleAcc;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
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

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getFaculty() {
        return faculty;
    }

    public void setFaculty(String faculty) {
        this.faculty = faculty;
    }

    public Date getDayOfBirth() {
        return dayOfBirth;
    }

    public void setDayOfBirth(Date dayOfBirth) {
        this.dayOfBirth = dayOfBirth;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public boolean isRoleAcc() {
        return roleAcc;
    }

    public void setRoleAcc(boolean roleAcc) {
        this.roleAcc = roleAcc;
    }
}
