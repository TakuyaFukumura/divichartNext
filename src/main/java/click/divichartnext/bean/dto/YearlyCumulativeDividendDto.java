package click.divichartnext.bean.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

/**
 * 年間累計配当グラフ画面用DTO
 */
@Data
@AllArgsConstructor
public class YearlyCumulativeDividendDto implements Serializable {
    private List<Integer> recentYears;
    private int targetYear;
    private List<BigDecimal> chartData;
}
