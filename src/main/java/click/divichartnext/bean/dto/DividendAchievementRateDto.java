package click.divichartnext.bean.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

/**
 * 配当達成率グラフ画面用DTO
 */
@Data
@AllArgsConstructor
public class DividendAchievementRateDto implements Serializable {
    private String labels;
    private String chartData;
    private String targetDividend;
    private String targetDividendYen;
}
