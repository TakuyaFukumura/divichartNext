package click.divichartnext.bean.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

/**
 * 月別配当グラフ画面用DTO
 */
@Data
@AllArgsConstructor
public class MonthlyDividendDto implements Serializable {
    private List<Integer> recentYears;
    private int targetYear;
    private List<BigDecimal> chartData;
}
