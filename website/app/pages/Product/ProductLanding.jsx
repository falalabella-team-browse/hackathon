import React, { useEffect } from 'react';
import styled from "styled-components";

const PdpBody = styled.div`
    background-color: #eee;
    padding-bottom: 20px;
`;

const Container = styled.div`
    margin: 0 auto;
    max-width: 1280px;
    width: 100%;
`;

const ProductContainer = styled.div`
    background-color: #fff;
`;

const PdpContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: flex-start;
    padding-top: 40px;
    padding-bottom: 20px;
`;

const ProductImageWrapper = styled.div`
    width: 42%;
    padding: 8px 12px 0 32px;
`;

const ProductDetailsWrapper = styled.div`
    display: flex;
    width: 58%;
    flex-direction: column;
    padding: 0 44px 0 49px;
    border-left: 1px solid #f8f8f8;
`;

const Img = styled.img`
    width: 100%;
    height: auto;
`

const BrandName =  styled.div`
    height: 16px;
    font-size: 1.3rem;
    font-weight: bold;
    letter-spacing: 1.08px;
    line-height: 16px;
    margin: 0 0 5px 0;
    text-transform: uppercase;
`

const ProductName = styled.div`
    color: #333;
    font-size: 28px;
    font-weight: 300;
    letter-spacing: -0.07px;
    line-height: 34px;
    margin: 0 15px 3px 0;
`

const Divider = styled.hr`
    margin: 0;
    box-sizing: border-box;
    height: 1px;
    width: 100%;
    border: 1px solid #f8f8f8;
    -webkit-transform: scaleY(-1);
    -ms-transform: scaleY(-1);
    transform: scaleY(-1);
`;


const ProductSpecifications = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 13px;
`


const AdditionInformationContainer = styled.div`
    background-color: #fff;
    margin-top: 30px;
    padding: 20px;
`;

const ProductSpecificationsColumn = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    min-height: 500px;
`

const SpecificationsContainer = styled.div`
    max-width: 305px;
    margin-top: 100px;
    padding: 18px 27px;
    background-color: #fafafa;
    padding: 20px 32px;
    margin-bottom: 20px;
`

const SpecsTitle = styled.span`
    font-size: 14px;
    color: #333;
    font-weight: bold;
    font-size: 16px;
`

const SpecsListWrapper = styled.div`
    font-size: 12px;
    margin: 10px 0 17px;
    line-height: 1.5;
`

const SpecsList = styled.li`
    position: relative;
    padding-left: 17px;

    ::before {
        position: absolute;
        content: '◇';
        left: 0;
        color: #333;
        font-size: 11px;
    }
`

const Price = styled.div`
    margin-top: 50px;
    border-color: #f8f8f8;
    margin-bottom: 29px;
`

const PriceList = styled.li`
    line-height: 24px;
    padding-bottom: 2px;
    display: flex;
    flex-direction: column;
`

const OfferPrice = styled.div`
    font-size: 20px;
    color: #e4022d;
    font-weight: 400;
`

const NormalPrice = styled.div`
    font-size: 16px;
    color: #333;
    font-weight: 300;
`

const AddToCartButton = styled.button`
    height: 55px;
    font-size: 14px;
    letter-spacing: 1px;
    font-weight: 700;
    background-color: #8fca00;
    color: #fff;
    border-radius: 3px;
    text-align: center;
    width: 100%;
    cursor: pointer;
    text-transform: uppercase;
    padding: 0;
    margin: 0;
    border: none;
`

const ProductLanding = () => {


    useEffect(()=>{
        const element = document.getElementById("reviews");
        RNR.load(element);
    })

    return (
        <PdpBody>
            <Container>
                <ProductContainer>
                    <PdpContainer>
                        <ProductImageWrapper>
                                <Img src="https://falabella.scene7.com/is/image/Falabella/8479643_1?wid=800&hei=800&qlt=70" />
                        </ProductImageWrapper>
                        <ProductDetailsWrapper>
                            <div className="basic-details">
                              <BrandName>Hisense</BrandName>
                              <ProductName>ULED-55-55H8GCL-4K-HDR-Smart-TV</ProductName>
                            </div>
                            <Divider />
                            <ProductSpecifications>
                                <ProductSpecificationsColumn>
                                    <SpecificationsContainer>
                                        <SpecsTitle>Outstanding features</SpecsTitle>
                                        <SpecsListWrapper>
                                            <ul style={{listStyle: 'none', padding:'0px'}}>
                                                <SpecsList><strong>Screen size:</strong>  55 inches</SpecsList>
                                                <SpecsList><strong>Resolution:</strong>  4K HDR</SpecsList>
                                                <SpecsList><strong>Technology:</strong>  ULED</SpecsList>
                                                <SpecsList><strong>Bluetooth connection:</strong>  Yes</SpecsList>
                                                <SpecsList><strong>USB inputs:</strong>  2</SpecsList>  
                                            </ul>
                                        </SpecsListWrapper>
                                    </SpecificationsContainer>
                                </ProductSpecificationsColumn>
                                <ProductSpecificationsColumn>
                                    <Price>
                                      <ol style={{listStyle: 'none', padding:'0px'}}>
                                        <PriceList>
                                            <OfferPrice>$  379.990 (Oferta)</OfferPrice>
                                        </PriceList>
                                        <PriceList>
                                            <NormalPrice>$ 279.890</NormalPrice>
                                        </PriceList>
                                      </ol>
                                    </Price>

                                    <AddToCartButton>
                                        Add To Cart
                                    </AddToCartButton>
                                </ProductSpecificationsColumn>
                            </ProductSpecifications>
                        </ProductDetailsWrapper>
                    </PdpContainer>
                </ProductContainer>
                <AdditionInformationContainer>
                   <div id="reviews"></div>
                </AdditionInformationContainer>
            </Container>
        </PdpBody>
    )
}

export default ProductLanding;