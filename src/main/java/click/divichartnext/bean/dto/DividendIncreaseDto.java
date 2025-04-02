package click.divichartnext.bean.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

/**
 * 配当増加額グラフ画面用DTO
 */
@Data
@AllArgsConstructor
public class DividendIncreaseDto implements Serializable {
    private String labels;
    private String chartData;
}
