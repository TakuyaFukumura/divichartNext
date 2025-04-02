package click.divichartnext.bean.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

/**
 * 年別配当グラフ画面用DTO
 */
@Data
@AllArgsConstructor
public class YearlyDividendDto implements Serializable {
    private List<Integer> labels;
    private List<BigDecimal> chartData;
}
