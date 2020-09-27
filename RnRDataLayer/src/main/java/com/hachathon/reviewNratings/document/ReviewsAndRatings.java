package com.hachathon.reviewNratings.document;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReviewsAndRatings {
    private String id;
    private String entityId;
    private float rating;
    private String title;
    private String description;
    private String imageLink;
    private String author;
    private String create_date;
    private String modified_date;
    private String reviewStatus;
    private boolean verifiedPurchase;
    private long helpful_count;
    private float review_score;
    private int sentiment;
}
