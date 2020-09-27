package com.hachathon.reviewNratings.service;

import com.hachathon.reviewNratings.beans.SentimentAnalysisRequest;
import com.hachathon.reviewNratings.beans.SentimentAnalysisResponse;
import com.hachathon.reviewNratings.constants.Constant;
import com.hachathon.reviewNratings.document.ReviewsAndRatings;
import com.hachathon.reviewNratings.elasticsearch.service.ElasticsearchWrite;
import com.hachathon.reviewNratings.util.UtilService;
import lombok.SneakyThrows;
import org.apache.commons.collections4.ListUtils;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.elasticsearch.action.bulk.BulkResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

import static com.hachathon.reviewNratings.constants.Constant.*;

@Service
public class ReviewRatingsService {

    @Autowired
    public ElasticsearchWrite elasticsearchWrite;

    @Autowired
    public HttpService httpService;

    @Autowired
    public UtilService utilService;

    @Value("${fileName}")
    private String fileName;


    public void bulkIngest() throws IOException, InvalidFormatException {
        Long startTime = Instant.now().getEpochSecond();
        try{
            Map<Boolean, List<CompletableFuture<BulkResponse>>> response = parseXL(fileName);
            Long endTimeInSec = Instant.now().getEpochSecond();
            Long elapsedTime = endTimeInSec - startTime;
            System.out.println("Elapsed time in seconds: "+elapsedTime);;
        } catch (IOException | InvalidFormatException e) {
                throw e;
        }
    }

    private Map<Boolean, List<CompletableFuture<BulkResponse>>> parseXL(String inputFilePath) throws IOException, InvalidFormatException {
        List<ReviewsAndRatings> reviewsAndRatings = new ArrayList<>();
        Workbook workbook = WorkbookFactory.create(new File(inputFilePath));
        List<CompletableFuture<BulkResponse>> futures = new ArrayList();
        Sheet sheet = workbook.getSheetAt(0);
        Iterator<Row> rowIterator = sheet.rowIterator();
        int rowcount = sheet.getPhysicalNumberOfRows();
        int loopCount = 1;
        for(int rowCnt=1; rowCnt < rowcount;rowCnt++){
            Row row = sheet.getRow(rowCnt);
            reviewsAndRatings.add(mapToBean(row));
            loopCount++;
            if(loopCount == rowCount){
                loopCount = 1;
                List<ReviewsAndRatings> finalReviewsAndRatings = reviewsAndRatings;
                futures.add(CompletableFuture.supplyAsync(() -> elasticsearchWrite.writeBulkDocs(finalReviewsAndRatings)));
                reviewsAndRatings = new ArrayList<>();
            }
        }
        CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
                .exceptionally(ex -> null)
                .join();
        Map<Boolean, List<CompletableFuture<BulkResponse>>> result =
                futures.stream()
                        .collect(Collectors.partitioningBy(CompletableFuture::isCompletedExceptionally));
        workbook.close();
        return result;
    }

    @SneakyThrows
    private ReviewsAndRatings mapToBean(Row row){
        if(null != row && row.getLastCellNum() > 4){
            Random rd = new Random();
            int help = getRandomNumber(helpful_min,helpful_max);
            boolean verifiedPurchase = rd.nextBoolean();
            String author = null != row.getCell(0) ? String.valueOf(row.getCell(0).getNumericCellValue()).replace(".0",""):null;
            float rating = null != row.getCell(4) ? Float.valueOf(String.valueOf(row.getCell(4).getNumericCellValue())):null;
            String entityId = null != row.getCell(1)?String.valueOf(row.getCell(1).getNumericCellValue()).replace(".0",""):null;
            String title = null != row.getCell(2)?row.getCell(2).getStringCellValue():null;
            String description =null != row.getCell(3) ? row.getCell(3).getStringCellValue():null;
            SentimentAnalysisRequest analysisRequest = SentimentAnalysisRequest.builder()
                    .phrase(description)
                    .build();
            int sentimentScore = 0;
            String reviewStatus = "Published";
            int wordsCount = 0;
            if(null != description){
                SentimentAnalysisResponse sentiment = httpService.getSentimentAnalysis(analysisRequest);
                sentimentScore = SENTIMENT_FACTOR.get(sentiment.getSentimentFactor());
                reviewStatus = sentiment.getHasAbusiveContent().equals("true") ? "Abusive":"Published";
                wordsCount = description.split(" ").length;
            }
            float overall = utilService.overallScore(help,verifiedPurchase,wordsCount,rating,sentimentScore,0);
            return ReviewsAndRatings.builder()
                    .author(author)
                    .rating(rating)
                    .entityId(entityId)
                    .title(title)
                    .description(description)
                    .create_date(ZonedDateTime.now().format(DateTimeFormatter.ISO_INSTANT))
                    .modified_date(ZonedDateTime.now().format(DateTimeFormatter.ISO_INSTANT))
                    .helpful_count(Long.valueOf(String.valueOf(help)))
                    .sentiment(sentimentScore)
                    .review_score(Float.valueOf(String.valueOf(overall)))
                    .reviewStatus(reviewStatus)
                    .imageLink("")
                    .build();
        }else{
            return null;
        }
    }

    public int getRandomNumber(int min, int max) {
        return (int) ((Math.random() * (max - min)) + min);
    }


}
