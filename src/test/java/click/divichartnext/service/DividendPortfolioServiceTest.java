package click.divichartnext.service;

import click.divichartnext.repository.DividendHistoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;

class DividendPortfolioServiceTest {

    @Autowired
    private DividendHistoryRepository repository;

    private DividendPortfolioService dividendPortfolioService;

    @BeforeEach
    void setUp() {
        dividendPortfolioService = new DividendPortfolioService(repository);
    }

    @Test
    void testCreateLabelPart() {
        BigDecimal dividendSum = BigDecimal.valueOf(100);
        BigDecimal amountReceived = BigDecimal.valueOf(25.01);
        String tickerSymbol = "MAIN";

        String result = dividendPortfolioService.createLabelPart(tickerSymbol, amountReceived, dividendSum);

        assertNotNull(result);
        assertEquals("MAIN 25.01%", result);
    }

    @Test
    void testCreateLabelPartWithZeroDividendSum() {
        BigDecimal dividendSum = BigDecimal.ZERO;
        BigDecimal amountReceived = BigDecimal.valueOf(25);
        String tickerSymbol = "MAIN";

        String result = dividendPortfolioService.createLabelPart(tickerSymbol, amountReceived, dividendSum);

        assertNotNull(result);
        assertEquals("MAIN 0.00%", result);
    }

//    @Test
//    void testConsolidateSmallValuesWithMocks() {
//        List<DividendSumsByStockProjection> dividendSummaryList = new ArrayList<>();
//
//        for (int i = 1; i <= 20; i++) {
//            DividendSumsByStockProjection mock = mock(DividendSumsByStockProjection.class);
//            when(mock.getTickerSymbol()).thenReturn("STOCK" + i);
//            when(mock.getAmountReceived()).thenReturn(BigDecimal.valueOf(i * 10));
//            dividendSummaryList.add(mock);
//        }
//
//        List<DividendSummaryBean> result = dividendPortfolioService.consolidateSmallValues(dividendSummaryList);
//
//        assertNotNull(result);
//        assertEquals(16, result.size());
//
//        BigDecimal othersAmount = result.stream()
//                .filter(bean -> "その他".equals(bean.getTickerSymbol()))
//                .map(DividendSummaryBean::getAmountReceived)
//                .findFirst()
//                .orElse(BigDecimal.ZERO);
//
//        assertEquals(BigDecimal.valueOf(160 + 170 + 180 + 190 + 200), othersAmount); // 16〜20番目の合計
//    }

//    @Test
//    void testCreateChartDataWithValidData() {
//        List<DividendSummaryBean> dividendSummaryBeanList = new ArrayList<>();
//        dividendSummaryBeanList.add(new DividendSummaryBean("AAPL", BigDecimal.valueOf(100.01)));
//        dividendSummaryBeanList.add(new DividendSummaryBean("GOOG", BigDecimal.valueOf(50.01)));
//
//        DividendPortfolioDto chartData = dividendPortfolioService.convertChartData(dividendSummaryBeanList, BigDecimal.valueOf(150.02));
//
//        assertNotNull(chartData);
//
//        // 期待される結果を確認します
//        assertEquals("\"AAPL 66.66%\",\"GOOG 33.34%\"", chartData.createYearLabels());
//        assertEquals("100.01,50.01", chartData.getDividendPortfolioData());
//    }
//
//    @Test
//    void testCreateChartDataWithEmptyList() {
//        List<DividendSummaryBean> emptyList = new ArrayList<>();
//
//        DividendPortfolioDto chartData = dividendPortfolioService.convertChartData(emptyList, BigDecimal.valueOf(150.02));
//
//        assertNotNull(chartData);
//
//        // 空のリストが渡された場合、空の文字列が返されることを確認します
//        assertEquals("\"\"", chartData.createYearLabels());
//        assertEquals("", chartData.getDividendPortfolioData());
//    }

}
