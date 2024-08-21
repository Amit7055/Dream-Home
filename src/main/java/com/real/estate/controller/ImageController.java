package com.real.estate.controller;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
//import org.springframework.http.HttpResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.real.estate.customException.ErrorResponse;
import com.real.estate.dto.ImageDTO;
import com.real.estate.entity.Images;
import com.real.estate.service.ImagesService;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    @Autowired
    private ImagesService imagesService;

    // Upload images for a user
    @PostMapping("/upload/user/{userId}")
    public ResponseEntity<List<Images>> uploadImagesForUser(
            @PathVariable Integer userId,
            @RequestParam("files") MultipartFile[] files) {
        try {
            List<Images> savedImages = imagesService.saveImage(files, userId);
            return new ResponseEntity<>(savedImages, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/all")
    public ResponseEntity<?> getAllProperties() {
        try {
            List<ImageDTO> images = imagesService.getAll();
            return new ResponseEntity<>(images, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse("Unable to load data", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    // Upload images for a property
    @PostMapping("/upload/property/{propertyId}")
    public ResponseEntity<List<Images>> uploadImagesForProperty(@RequestParam("files") MultipartFile[] files, @PathVariable Integer propertyId) throws IOException {
        List<Images> savedImages = imagesService.saveImageForPg(files, propertyId);
        return new ResponseEntity<>(savedImages, HttpStatus.CREATED);
    }

    // Get images by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Images>> getImagesByUserId(@PathVariable Integer userId) {
        List<Images> images = imagesService.getImagesDataByUserId(userId);
        return new ResponseEntity<>(images, HttpStatus.OK);
    }

    // Get images by property ID
    @GetMapping("/property/{propertyId}")
    public ResponseEntity<List<Images>> getImagesByPropertyId(@PathVariable Integer propertyId) {
        List<Images> images = imagesService.getImagesDataByPropertyId(propertyId);
        return new ResponseEntity<>(images, HttpStatus.OK);
    }

    // Get image by ID
    @GetMapping("/{imageId}")
    public ResponseEntity<Images> getImageById(@PathVariable Integer imageId) {
        Images image = imagesService.getImageById(imageId);
        return new ResponseEntity<>(image, HttpStatus.OK);
    }

    // Delete image by ID
    @DeleteMapping("/{imageId}")
    public ResponseEntity<String> deleteImage(@PathVariable Integer imageId) {
        return imagesService.delete(imageId);
    }
}