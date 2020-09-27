package com.hachathon.reviewNratings.util;

import com.hachathon.reviewNratings.constants.Constant;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import static com.hachathon.reviewNratings.constants.Constant.RNR_SCORE;

@Service
public class UtilService {

    @SneakyThrows
    public float overallScore(long helpfull, boolean verifiedPurchase,int wordCount, float rating, int sentimentScore, int imageCount  ){
        return confidenceScore(rating, sentimentScore) +
                imageScore(imageCount, verifiedPurchase) +
                (helpfulCount(helpfull, verifiedPurchase) + wordsScore(wordCount, verifiedPurchase)) / 2;
    }

    private float imageScore(int imageCount, boolean verifiedPurchase){
        float score = verifiedPurchase ? (float) imageCount*1: (float) (imageCount * 0.75);
        return score;
    }

    private float confidenceScore(float rating, int sentiment){
             return sentiment > 0 && Math.abs(rating - sentiment) < 2  ? rating / 10 : 0;

    }
    private float wordsScore(int count, boolean verifiedPurchase){
        return verifiedPurchase
                ? (count / 100) * RNR_SCORE.get("WS_V")
                : (count / 100) * RNR_SCORE.get("WS_NV");
    }

    private float helpfulCount(long helpful, boolean verifiedPurchase){
        return verifiedPurchase ? (helpful / 100) * RNR_SCORE.get("HFS_V"): (helpful / 100) * RNR_SCORE.get("HFS_NV");
    }
}
