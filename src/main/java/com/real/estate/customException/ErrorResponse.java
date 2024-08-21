package com.real.estate.customException;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class ErrorResponse {
    private String message;
    private String errDetails;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss a")
    private LocalDateTime timeStamp;
    
    public ErrorResponse() {
        // Default constructor
    }

    public ErrorResponse(String message, String errDetails) {
        this.message = message;
        this.errDetails = errDetails;
        this.timeStamp = LocalDateTime.now();
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getErrDetails() {
        return errDetails;
    }

    public void setErrDetails(String errDetails) {
        this.errDetails = errDetails;
    }

    public LocalDateTime getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(LocalDateTime timeStamp) {
        this.timeStamp = timeStamp;
    }

    @Override
    public String toString() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return "ErrorResponse [message=" + message + ", errDetails=" + errDetails + ", timeStamp=" + timeStamp.format(formatter) + "]";
    }
}
