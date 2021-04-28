package com.bezkoder.springjwt.models;

public class Message {
    private String name;
    private String email;
    private String subject;
    private String sdt;
    private String loinhan;

    public Message() {
    }

    public Message(String name, String email, String subject, String sdt, String loinhan) {
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.sdt = sdt;
        this.loinhan = loinhan;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getSdt() {
        return sdt;
    }

    public void setSdt(String sdt) {
        this.sdt = sdt;
    }

    public String getLoinhan() {
        return loinhan;
    }

    public void setLoinhan(String loinhan) {
        this.loinhan = loinhan;
    }
}
