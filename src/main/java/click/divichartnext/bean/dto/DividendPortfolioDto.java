package click.divichartnext.bean.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

/**
 * 配当ポートフォリオ用DTO
 */
@Data
@AllArgsConstructor
public class DividendPortfolioDto implements Serializable {
    private List<Integer> recentYears;
    private int targetYear;
    private List<String> labels;
    private List<BigDecimal> chartData;
}
