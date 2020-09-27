package com.hachathon.reviewNratings.beans;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Words
{
    private String totalScanned;

    private String[] negative;

    private String[] tokens;

    private String[] positive;

}
