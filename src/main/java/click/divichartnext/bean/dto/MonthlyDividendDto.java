package click.divichartnext.bean.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

/**
 * 月別配当グラフ画面用DTO
 */
@Getter
@Setter
@NoArgsConstructor
public class MonthlyDividendDto implements Serializable {
    private List<Integer> recentYears;
    private int targetYear;
    private List<BigDecimal> chartData;

    public MonthlyDividendDto(List<Integer> recentYears, int targetYear, List<BigDecimal> chartData) {
        this.recentYears = recentYears;
        this.targetYear = targetYear;
        this.chartData = chartData;
    }
}
