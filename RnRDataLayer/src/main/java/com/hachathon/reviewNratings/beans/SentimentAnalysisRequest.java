package com.hachathon.reviewNratings.beans;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SentimentAnalysisRequest {
    private String phrase;
    private String language="en";
}
