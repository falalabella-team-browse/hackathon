package com.hachathon.reviewNratings.controller;

import com.hachathon.reviewNratings.service.ReviewRatingsService;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpResponseFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpResponse;

@RestController
@RequiredArgsConstructor
public class WriteController {

    @Autowired
    public ReviewRatingsService reviewRatingsService;

    @RequestMapping(method= RequestMethod.GET, value="/bulkingest")
    public ResponseEntity<?> bulkIngest(){
        try{
            reviewRatingsService.bulkIngest();
            return ResponseEntity.ok().build();
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).build();
        }
    }

}
