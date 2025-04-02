package click.divichartnext.bean.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

/**
 * 配当増加率グラフ画面用DTO
 */
@Data
@AllArgsConstructor
public class DividendIncreaseRateDto implements Serializable {
    private String labels;
    private String chartData;
}
