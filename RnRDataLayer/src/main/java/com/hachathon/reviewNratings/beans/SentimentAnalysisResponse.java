package com.hachathon.reviewNratings.beans;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SentimentAnalysisResponse {
        private String sentimentScore;

        private String sentimentFactor;

        private String hasAbusiveContent;

        private String review_score;

        private Words words;
    }

